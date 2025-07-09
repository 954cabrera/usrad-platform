// scripts/migrate-json-to-supabase.js (ES Module version)
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Your Supabase credentials (check multiple sources)
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || 
                   process.env.SUPABASE_SERVICE_ROLE_KEY || 
                   process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  console.log('Add these to your .env:');
  console.log('PUBLIC_SUPABASE_URL=your_url');
  console.log('SUPABASE_SERVICE_KEY=your_key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateFloridaData() {
  console.log('🚀 Starting Florida JSON → Supabase migration...');
  
  try {
    // Step 1: Read your Florida JSON file
    const projectRoot = path.join(__dirname, '..');
    const filePath = path.join(projectRoot, 'public/data/processed/florida-medicare-pricing-complete.json');
    
    if (!fs.existsSync(filePath)) {
      console.error('❌ Florida JSON file not found at:', filePath);
      console.log('📁 Current working directory:', process.cwd());
      console.log('📁 Looking for file at:', filePath);
      return;
    }
    
    console.log('📖 Reading Florida JSON file...');
    const rawData = fs.readFileSync(filePath, 'utf8');
    const floridaData = JSON.parse(rawData);
    
    // Step 2: Extract procedures
    let procedures;
    if (floridaData.pricing_data) {
      procedures = floridaData.pricing_data;
    } else if (Array.isArray(floridaData)) {
      procedures = floridaData;
    } else {
      console.error('❌ Unexpected JSON structure');
      console.log('Keys found:', Object.keys(floridaData));
      return;
    }
    
    console.log(`📊 Found ${procedures.length} Florida procedures`);
    
    // Step 3: Clear existing Florida data
    console.log('🗑️ Clearing existing Florida data...');
    const { error: deleteError } = await supabase
      .from('medicare_pricing')
      .delete()
      .eq('state', 'FL');
    
    if (deleteError && !deleteError.message.includes('No rows')) {
      console.log('Note:', deleteError.message);
    }
    
    // Step 4: Transform data
    console.log('🔄 Transforming data for database...');
    const dbRecords = [];
    let errorCount = 0;
    
    // Create county mapping from locality names
    const localityToCounty = {
      'FORT LAUDERDALE': 'Broward',
      'MIAMI': 'Miami-Dade', 
      'REST OF FLORIDA': 'Other'
    };
    
    for (let i = 0; i < procedures.length; i++) {
      const proc = procedures[i];
      try {
        // Map locality to county
        const county = localityToCounty[proc.locality_name] || proc.locality_name;
        
        const record = {
          state: 'FL',
          county: county,  // Use mapped county name
          locality_code: proc.locality_code,
          locality_name: proc.locality_name,
          locality_description: proc.locality_description || null,
          cpt_code: proc.cpt_code,
          description: proc.description,
          modality: proc.modality,
          medicare_rate: parseFloat(proc.medicare_rate),
          usrad_price: parseFloat(proc.usrad_price),
          usrad_markup: parseFloat(proc.usrad_markup),
          hospital_estimate: parseFloat(proc.hospital_estimate),
          patient_savings: parseFloat(proc.patient_savings),
          savings_percentage: parseInt(proc.savings_percentage),
          work_rvu: parseFloat(proc.work_rvu),
          pe_rvu_facility: parseFloat(proc.pe_rvu_facility),
          mp_rvu: parseFloat(proc.mp_rvu),
          conversion_factor: parseFloat(proc.conversion_factor || 32.3465),
          work_gpci: parseFloat(proc.work_gpci),
          pe_gpci: parseFloat(proc.pe_gpci),
          mp_gpci: parseFloat(proc.mp_gpci)
        };
        
        // Validate required fields
        if (!record.county || !record.cpt_code || isNaN(record.medicare_rate)) {
          throw new Error(`Invalid data: county=${record.county}, cpt=${record.cpt_code}, rate=${record.medicare_rate}`);
        }
        
        dbRecords.push(record);
      } catch (error) {
        errorCount++;
        if (errorCount <= 5) { // Show first 5 errors
          console.error(`❌ Error processing record ${i}:`, error.message);
          console.log('Record:', proc);
        }
      }
    }
    
    if (errorCount > 5) {
      console.log(`❌ ... and ${errorCount - 5} more errors`);
    }
    
    console.log(`✅ Transformed ${dbRecords.length} valid records (${errorCount} errors)`);
    
    if (dbRecords.length === 0) {
      console.error('❌ No valid records to insert');
      return;
    }
    
    // Step 5: Insert data in batches
    const batchSize = 1000;
    let totalInserted = 0;
    
    for (let i = 0; i < dbRecords.length; i += batchSize) {
      const batch = dbRecords.slice(i, i + batchSize);
      const batchNumber = Math.floor(i / batchSize) + 1;
      const totalBatches = Math.ceil(dbRecords.length / batchSize);
      
      console.log(`📥 Inserting batch ${batchNumber}/${totalBatches} (${batch.length} records)...`);
      
      const { data, error } = await supabase
        .from('medicare_pricing')
        .insert(batch);
      
      if (error) {
        console.error('❌ Batch insert failed:', error);
        console.log('Error details:', error.details);
        console.log('Error hint:', error.hint);
        console.log('Sample record from failed batch:', batch[0]);
        return;
      }
      
      totalInserted += batch.length;
      console.log(`✅ Progress: ${totalInserted}/${dbRecords.length} records inserted`);
    }
    
    console.log('🎉 Florida migration completed successfully!');
    
    // Step 6: Validate the migration
    await validateMigration();
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    console.error('Stack trace:', error.stack);
  }
}

async function validateMigration() {
  console.log('\n🔍 Validating migration...');
  
  try {
    // Count total records
    const { count: totalRecords, error: countError } = await supabase
      .from('medicare_pricing')
      .select('*', { count: 'exact', head: true })
      .eq('state', 'FL');
    
    if (countError) {
      console.error('❌ Count query failed:', countError);
      return;
    }
    
    console.log(`📊 Total Florida records in database: ${totalRecords}`);
    
    // Test performance of county-based query
    console.log('⚡ Testing query performance...');
    const start = Date.now();
    
    const { data: sampleRecord, error: queryError } = await supabase
      .from('medicare_pricing')
      .select('*')
      .eq('state', 'FL')
      .eq('county', 'Miami-Dade')
      .eq('cpt_code', '72148')
      .single();
    
    const queryTime = Date.now() - start;
    
    if (queryError) {
      console.error('❌ Sample query failed:', queryError);
      console.log('Trying different sample...');
      
      // Try any record
      const { data: anyRecord, error: anyError } = await supabase
        .from('medicare_pricing')
        .select('*')
        .eq('state', 'FL')
        .limit(1)
        .single();
        
      if (anyRecord) {
        console.log('✅ Found sample record:', {
          county: anyRecord.county,
          cpt_code: anyRecord.cpt_code,
          medicare_rate: anyRecord.medicare_rate
        });
      }
      return;
    }
    
    if (sampleRecord) {
      console.log('✅ Sample validation successful:');
      console.log(`   Query time: ${queryTime}ms`);
      console.log(`   CPT 72148 in Miami-Dade: $${sampleRecord.medicare_rate}`);
      console.log(`   USRad Price: $${sampleRecord.usrad_price}`);
      console.log(`   Patient Savings: $${sampleRecord.patient_savings}`);
      
      if (queryTime < 100) {
        console.log('🚀 Performance: EXCELLENT');
      } else if (queryTime < 500) {
        console.log('⚠️ Performance: Good');
      } else {
        console.log('❌ Performance: Slow - check indexes');
      }
    }
    
    // Show county distribution
    const { data: allRecords, error: allError } = await supabase
      .from('medicare_pricing')
      .select('county')
      .eq('state', 'FL');
      
    if (!allError && allRecords) {
      const countyGroups = allRecords.reduce((acc, row) => {
        acc[row.county] = (acc[row.county] || 0) + 1;
        return acc;
      }, {});
      
      console.log('📍 Records per Florida county:');
      Object.entries(countyGroups).forEach(([county, count]) => {
        console.log(`   ${county}: ${count} procedures`);
      });
    }
    
    console.log('\n🎯 Migration validation complete!');
    
  } catch (error) {
    console.error('❌ Validation failed:', error);
  }
}

// Main execution
async function main() {
  console.log('🏥 USRad Medicare Pricing: JSON → Supabase Migration\n');
  
  const args = process.argv.slice(2);
  const command = args[0] || 'florida';
  
  switch (command) {
    case 'florida':
      await migrateFloridaData();
      break;
    case 'validate':
      await validateMigration();
      break;
    default:
      console.log('Usage: node migrate-json-to-supabase.js [florida|validate]');
  }
}

// Run the migration
main().catch(console.error);