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
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    console.error('Stack trace:', error.stack);
  }
}

async function migrateGeorgiaData() {
  console.log('🍑 Starting Georgia JSON → Supabase migration...');
  
  try {
    const projectRoot = path.join(__dirname, '..');
    const filePath = path.join(projectRoot, 'public/data/processed/georgia-pricing.json');
    
    if (!fs.existsSync(filePath)) {
      console.error('❌ Georgia JSON file not found at:', filePath);
      console.log('📁 Current working directory:', process.cwd());
      console.log('📁 Looking for file at:', filePath);
      return;
    }
    
    console.log('📖 Reading Georgia JSON file...');
    const rawData = fs.readFileSync(filePath, 'utf8');
    const georgiaFileData = JSON.parse(rawData);
    
    // Handle both formats (direct array vs wrapped object)
    let georgiaData;
    if (georgiaFileData.pricing_data) {
      georgiaData = georgiaFileData.pricing_data;
      console.log(`📊 Found ${georgiaData.length} Georgia procedures (wrapped format)`);
    } else if (Array.isArray(georgiaFileData)) {
      georgiaData = georgiaFileData;
      console.log(`📊 Found ${georgiaData.length} Georgia procedures (array format)`);
    } else {
      console.error('❌ Unexpected Georgia JSON structure');
      console.log('Keys found:', Object.keys(georgiaFileData));
      return;
    }
    
    // Clear existing Georgia data
    console.log('🗑️ Clearing existing Georgia data...');
    const { error: deleteError } = await supabase
      .from('medicare_pricing')
      .delete()
      .eq('state', 'GA');
    
    if (deleteError && !deleteError.message.includes('No rows')) {
      console.log('Note:', deleteError.message);
    }
    
    // Step 3: Validate and filter Georgia data
    console.log('🔄 Validating Georgia data...');
    const validRecords = [];
    let skippedCount = 0;
    
    for (const proc of georgiaData) {
      // Skip procedures with invalid Medicare rates or negative savings
      if (parseFloat(proc.medicare_rate) <= 0 || parseFloat(proc.patient_savings) < 0) {
        skippedCount++;
        continue;
      }
      
      // Recalculate savings percentage if missing or invalid
      let savingsPercentage = parseInt(proc.savings_percentage);
      if (isNaN(savingsPercentage) || savingsPercentage < 0) {
        const hospitalEst = parseFloat(proc.hospital_estimate);
        const patientSavings = parseFloat(proc.patient_savings);
        if (hospitalEst > 0) {
          savingsPercentage = Math.round((patientSavings / hospitalEst) * 100);
        } else {
          skippedCount++;
          continue;
        }
      }
      
      const record = {
        state: 'GA',
        county: proc.county,
        locality_code: proc.locality_code,
        locality_name: proc.locality_name,
        locality_description: proc.locality_description || null,
        cpt_code: proc.cpt_code,
        description: proc.description,
        modality: proc.modality,
        medicare_rate: parseFloat(proc.medicare_rate),
        usrad_price: parseFloat(proc.usrad_price),
        usrad_markup: parseFloat(proc.usrad_markup || 75),
        hospital_estimate: parseFloat(proc.hospital_estimate),
        patient_savings: parseFloat(proc.patient_savings),
        savings_percentage: savingsPercentage,
        work_rvu: parseFloat(proc.work_rvu || 0),
        pe_rvu_facility: parseFloat(proc.pe_rvu_facility || 0),
        mp_rvu: parseFloat(proc.mp_rvu || 0),
        conversion_factor: parseFloat(proc.conversion_factor || 32.3465),
        work_gpci: parseFloat(proc.work_gpci || 1),
        pe_gpci: parseFloat(proc.pe_gpci || 1),
        mp_gpci: parseFloat(proc.mp_gpci || 1)
      };
      
      validRecords.push(record);
    }
    
    console.log(`✅ Valid records: ${validRecords.length}`);
    console.log(`⚠️ Skipped invalid: ${skippedCount}`);
    
    if (validRecords.length === 0) {
      console.error('❌ No valid records to insert');
      return;
    }
    
    // Step 4: Insert data in batches
    const batchSize = 1000;
    let totalInserted = 0;
    const totalBatches = Math.ceil(validRecords.length / batchSize);
    
    for (let i = 0; i < validRecords.length; i += batchSize) {
      const batch = validRecords.slice(i, i + batchSize);
      const batchNumber = Math.floor(i / batchSize) + 1;
      
      console.log(`📥 Inserting batch ${batchNumber}/${totalBatches}...`);
      
      const { error } = await supabase
        .from('medicare_pricing')
        .insert(batch);
      
      if (error) {
        console.error('❌ Georgia batch insert failed:', error);
        console.log('Sample record from failed batch:', batch[0]);
        return;
      }
      
      totalInserted += batch.length;
      console.log(`✅ Progress: ${totalInserted}/${validRecords.length}`);
    }
    
    console.log('🎉 Georgia migration completed!');
    
    // Validate the Georgia migration
    await validateGeorgiaMigration();
    
  } catch (error) {
    console.error('❌ Georgia migration failed:', error);
    console.error('Stack trace:', error.stack);
  }
}

async function validateGeorgiaMigration() {
  console.log('\n🔍 Validating Georgia migration...');
  
  try {
    // Count Georgia records
    const { count } = await supabase
      .from('medicare_pricing')
      .select('*', { count: 'exact', head: true })
      .eq('state', 'GA');
    
    console.log(`📊 Total Georgia records: ${count}`);
    
    // Test sample query
    const { data: sample } = await supabase
      .from('medicare_pricing')
      .select('*')
      .eq('state', 'GA')
      .limit(1)
      .single();
    
    if (sample) {
      console.log(`✅ Sample: CPT ${sample.cpt_code} in ${sample.county}: $${sample.medicare_rate}`);
    }
    
    console.log('🎯 Georgia validation complete!');
    
  } catch (error) {
    console.error('❌ Georgia validation failed:', error);
  }
}

async function validateMigration() {
  console.log('\n🔍 Validating migration...');
  
  try {
    // Count total records by state
    const { data: allRecords } = await supabase
      .from('medicare_pricing')
      .select('state, county, cpt_code');
    
    if (!allRecords) {
      console.log('No records found');
      return;
    }
    
    // Group by state
    const stateCounts = allRecords.reduce((acc, row) => {
      if (!acc[row.state]) {
        acc[row.state] = { total: 0, counties: new Set(), cpts: new Set() };
      }
      acc[row.state].total++;
      acc[row.state].counties.add(row.county);
      acc[row.state].cpts.add(row.cpt_code);
      return acc;
    }, {});
    
    console.log('📊 Total records by state:');
    Object.entries(stateCounts).forEach(([state, data]) => {
      console.log(`   ${state}: ${data.total} procedures`);
      console.log(`      ${data.cpts.size} unique CPT codes`);
      console.log(`      ${data.counties.size} counties`);
    });
    
    // Test Florida sample
    if (stateCounts.FL) {
      console.log('\n⚡ Testing Florida query performance...');
      const flStart = Date.now();
      
      const { data: flSample } = await supabase
        .from('medicare_pricing')
        .select('*')
        .eq('state', 'FL')
        .eq('county', 'Miami-Dade')
        .eq('cpt_code', '72148')
        .limit(1)
        .single();
      
      const flQueryTime = Date.now() - flStart;
      
      if (flSample) {
        console.log('✅ Florida sample validation successful:');
        console.log(`   Query time: ${flQueryTime}ms`);
        console.log(`   CPT 72148 in Miami-Dade: ${flSample.medicare_rate}`);
        console.log(`   USRad Price: ${flSample.usrad_price}`);
        console.log(`   Patient Savings: ${flSample.patient_savings}`);
      }
      
      // Florida county breakdown
      console.log('\n📍 Records per Florida county:');
      const flCounties = allRecords.filter(r => r.state === 'FL').reduce((acc, row) => {
        acc[row.county] = (acc[row.county] || 0) + 1;
        return acc;
      }, {});
      Object.entries(flCounties).forEach(([county, count]) => {
        console.log(`   ${county}: ${count} procedures`);
      });
    }
    
    // Test Georgia sample if it exists
    if (stateCounts.GA) {
      console.log('\n⚡ Testing Georgia query performance...');
      const gaStart = Date.now();
      
      const { data: gaSample } = await supabase
        .from('medicare_pricing')
        .select('*')
        .eq('state', 'GA')
        .limit(1)
        .single();
      
      const gaQueryTime = Date.now() - gaStart;
      
      if (gaSample) {
        console.log('✅ Georgia sample validation successful:');
        console.log(`   Query time: ${gaQueryTime}ms`);
        console.log(`   CPT ${gaSample.cpt_code} in ${gaSample.county}: ${gaSample.medicare_rate}`);
        console.log(`   USRad Price: ${gaSample.usrad_price}`);
      }
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
    case 'georgia':
      await migrateGeorgiaData();
      break;
    case 'validate':
      await validateMigration();
      break;
    default:
      console.log('Usage: node migrate-json-to-supabase.js [florida|georgia|validate]');
  }
}

// Run the migration
main().catch(console.error);