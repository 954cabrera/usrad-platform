import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.PUBLIC_SUPABASE_ANON_KEY
);

async function checkProcedures() {
  console.log('🔍 Analyzing procedure differences...\n');
  
  const { data: flProcedures } = await supabase
    .from('medicare_pricing')
    .select('cpt_code, description, modality')
    .eq('state', 'FL')
    .eq('county', 'Miami-Dade');
  
  const { data: gaProcedures } = await supabase
    .from('medicare_pricing')
    .select('cpt_code, description, modality')
    .eq('state', 'GA')
    .limit(1000);
  
  const flCpts = new Set(flProcedures.map(p => p.cpt_code));
  const gaCpts = new Set(gaProcedures.map(p => p.cpt_code));
  
  console.log('📊 PROCEDURE BREAKDOWN:');
  console.log(`Florida unique CPTs: ${flCpts.size}`);
  console.log(`Georgia unique CPTs: ${gaCpts.size}`);
  
  console.log('\n🔍 MISSING IN GEORGIA:');
  const missingInGA = [...flCpts].filter(cpt => !gaCpts.has(cpt));
  missingInGA.slice(0, 15).forEach(cpt => {
    const proc = flProcedures.find(p => p.cpt_code === cpt);
    console.log(`   ${cpt}: ${proc.description} (${proc.modality})`);
  });
  
  console.log(`\n... and ${Math.max(0, missingInGA.length - 15)} more missing from Georgia`);
  
  // Group by modality
  console.log('\n📋 MISSING BY MODALITY:');
  const missingByModality = {};
  missingInGA.forEach(cpt => {
    const proc = flProcedures.find(p => p.cpt_code === cpt);
    const modality = proc.modality;
    missingByModality[modality] = (missingByModality[modality] || 0) + 1;
  });
  
  Object.entries(missingByModality).forEach(([modality, count]) => {
    console.log(`   ${modality}: ${count} missing procedures`);
  });
}

checkProcedures().catch(console.error);