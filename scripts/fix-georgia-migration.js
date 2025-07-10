// Fixed Georgia Migration - Bulletproof approach
// scripts/fix-georgia-migration.js

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixGeorgiaMigration() {
  console.log('🔧 BULLETPROOF GEORGIA MIGRATION');
  console.log('===============================');
  
  try {
    // Step 1: Load and validate source data
    console.log('📖 Loading Georgia source data...');
    const rawData = fs.readFileSync('./public/data/processed/georgia-pricing.json', 'utf8');
    const georgiaFileData = JSON.parse(rawData);
    const georgiaData = georgiaFileData.pricing_data || georgiaFileData;
    
    console.log(`📊 Found ${georgiaData.length} Georgia procedures`);
    
    // Step 2: Pre-validate all data
    console.log('🔍 Pre-validating all data...');
    const validRecords = [];
    const invalidRecords = [];
    
    for (const proc of georgiaData) {
      // Strict validation
      const medicareRate = parseFloat(proc.medicare_rate);
      const patientSavings = parseFloat(proc.patient_savings);
      const hospitalEst = parseFloat(proc.hospital_estimate);
      
      // Check all required fields
      const isValid = (
        medicareRate > 0 &&
        patientSavings >= 0 &&
        hospitalEst > 0 &&
        proc.locality_code &&
        proc.locality_name &&
        proc.county &&
        proc.cpt_code &&
        proc.description
      );
      
      if (isValid) {
        const record = {
          state: 'GA',
          county: proc.county,
          locality_code: proc.locality_code,
          locality_name: proc.locality_name,
          locality_description: proc.locality_description || 'Georgia locality',
          cpt_code: proc.cpt_code,
          description: proc.description,
          modality: proc.modality || 'Unknown',
          medicare_rate: medicareRate,
          usrad_price: parseFloat(proc.usrad_price),
          usrad_markup: parseFloat(proc.usrad_markup || 75),
          hospital_estimate: hospitalEst,
          patient_savings: patientSavings,
          savings_percentage: parseInt(proc.savings_percentage) || 0,
          work_rvu: parseFloat(proc.work_rvu || 0),
          pe_rvu_facility: parseFloat(proc.pe_rvu_facility || 0),
          mp_rvu: parseFloat(proc.mp_rvu || 0),
          conversion_factor: parseFloat(proc.conversion_factor || 32.3465),
          work_gpci: parseFloat(proc.work_gpci || 1),
          pe_gpci: parseFloat(proc.pe_gpci || 1),
          mp_gpci: parseFloat(proc.mp_gpci || 1)
        };
        validRecords.push(record);
      } else {
        invalidRecords.push({
          county: proc.county,
          cpt_code: proc.cpt_code,
          reason: !proc.locality_code ? 'Missing locality_code' :
                  !proc.locality_name ? 'Missing locality_name' :
                  medicareRate <= 0 ? 'Invalid medicare_rate' :
                  patientSavings < 0 ? 'Negative patient_savings' :
                  'Other validation error'
        });
      }
    }
    
    console.log(`✅ Valid records: ${validRecords.length}`);
    console.log(`❌ Invalid records: ${invalidRecords.length}`);
    
    // Show county breakdown
    const countiesBefore = validRecords.reduce((acc, record) => {
      acc[record.county] = (acc[record.county] || 0) + 1;
      return acc;
    }, {});
    
    console.log('\n📍 Records per county (pre-insertion):');
    Object.entries(countiesBefore).forEach(([county, count]) => {
      console.log(`   ${county}: ${count} records`);
    });
    
    if (validRecords.length === 0) {
      console.error('❌ No valid records to insert');
      return;
    }
    
    // Step 3: Clear existing Georgia data with explicit confirmation
    console.log('\n🗑️ Clearing existing Georgia data...');
    const { error: deleteError, count: deletedCount } = await supabase
      .from('medicare_pricing')
      .delete({ count: 'exact' })
      .eq('state', 'GA');
    
    if (deleteError) {
      console.error('❌ Delete error:', deleteError);
      return;
    }
    
    console.log(`🗑️ Deleted ${deletedCount || 0} existing GA records`);
    
    // Step 4: Insert in smaller, monitored batches
    console.log('\n📥 Inserting data in monitored batches...');
    const batchSize = 500; // Smaller batches for reliability
    let totalInserted = 0;
    const totalBatches = Math.ceil(validRecords.length / batchSize);
    
    for (let i = 0; i < validRecords.length; i += batchSize) {
      const batch = validRecords.slice(i, i + batchSize);
      const batchNum = Math.floor(i / batchSize) + 1;
      
      console.log(`📥 Inserting batch ${batchNum}/${totalBatches} (${batch.length} records)...`);
      
      const { data, error } = await supabase
        .from('medicare_pricing')
        .insert(batch);
      
      if (error) {
        console.error(`❌ Batch ${batchNum} failed:`, error);
        
        // Try to insert records one by one to identify problem records
        console.log('🔍 Attempting individual record insertion...');
        for (const record of batch) {
          const { error: singleError } = await supabase
            .from('medicare_pricing')
            .insert([record]);
          
          if (singleError) {
            console.error(`❌ Failed record: ${record.county} - ${record.cpt_code}`, singleError.message);
          } else {
            totalInserted++;
          }
        }
      } else {
        totalInserted += batch.length;
        console.log(`✅ Batch ${batchNum} successful (${totalInserted}/${validRecords.length} total)`);
      }
      
      // Small delay between batches to avoid overwhelming the database
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Step 5: Verify insertion success
    console.log('\n🔍 Verifying insertion...');
    
    const { count: finalCount } = await supabase
      .from('medicare_pricing')
      .select('*', { count: 'exact', head: true })
      .eq('state', 'GA');
    
    console.log(`📊 Final GA record count: ${finalCount}`);
    
    // Check county distribution
    const { data: finalCounties } = await supabase
      .from('medicare_pricing')
      .select('county')
      .eq('state', 'GA')
      .limit(20000);
    
    const countiesAfter = finalCounties.reduce((acc, row) => {
      acc[row.county] = (acc[row.county] || 0) + 1;
      return acc;
    }, {});
    
    console.log('\n📍 Final county distribution:');
    Object.entries(countiesAfter).sort().forEach(([county, count]) => {
      console.log(`   ${county}: ${count} records`);
    });
    
    // Success metrics
    console.log('\n🎉 MIGRATION RESULTS:');
    console.log(`✅ Total inserted: ${totalInserted}`);
    console.log(`✅ Final count: ${finalCount}`);
    console.log(`✅ Counties: ${Object.keys(countiesAfter).length}`);
    console.log(`✅ Success rate: ${((finalCount / validRecords.length) * 100).toFixed(1)}%`);
    
    if (finalCount === validRecords.length && Object.keys(countiesAfter).length === 16) {
      console.log('\n🏆 MIGRATION SUCCESSFUL - ALL DATA INSERTED!');
    } else {
      console.log('\n⚠️ PARTIAL SUCCESS - Some data missing');
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

// Run the migration
fixGeorgiaMigration();