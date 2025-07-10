require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

console.log('Using URL:', supabaseUrl ? 'Found' : 'Missing');
console.log('Using Key:', supabaseKey ? 'Found' : 'Missing');

const supabase = createClient(supabaseUrl, supabaseKey);

(async () => {
  console.log('\n🔍 CURRENT FLORIDA STRUCTURE:');
  
  const { data: flData } = await supabase.from('medicare_pricing').select('county, locality_code, locality_name').eq('state', 'FL');
  
  const flStructure = flData.reduce((acc, row) => {
    if (!acc[row.locality_code]) {
      acc[row.locality_code] = {
        locality_name: row.locality_name,
        counties: new Set()
      };
    }
    acc[row.locality_code].counties.add(row.county);
    return acc;
  }, {});
  
  Object.entries(flStructure).forEach(([code, data]) => {
    console.log(`${code} (${data.locality_name}): ${Array.from(data.counties).join(', ')}`);
  });
  
  console.log('\n🔍 CURRENT GEORGIA STRUCTURE:');
  
  const { data: gaData } = await supabase.from('medicare_pricing').select('county, locality_code, locality_name').eq('state', 'GA');
  
  if (!gaData || gaData.length === 0) {
    console.log('No Georgia data found');
    return;
  }
  
  const gaStructure = gaData.reduce((acc, row) => {
    if (!acc[row.locality_code]) {
      acc[row.locality_code] = {
        locality_name: row.locality_name,
        counties: new Set()
      };
    }
    acc[row.locality_code].counties.add(row.county);
    return acc;
  }, {});
  
  Object.entries(gaStructure).forEach(([code, data]) => {
    console.log(`${code} (${data.locality_name}): ${Array.from(data.counties).join(', ')}`);
  });
  
  console.log('\n📊 COMPARISON TO OFFICIAL STRUCTURE:');
  console.log('Expected Florida:');
  console.log('  09102_04 (MIAMI): Miami-Dade, Monroe');
  console.log('  09102_03 (FORT LAUDERDALE): Broward, Collier, Indian River, Lee, Martin, Palm Beach, St. Lucie');
  console.log('  09102_99 (REST OF FLORIDA): All Other Counties');
  
  console.log('\nExpected Georgia:');
  console.log('  10212_01 (ATLANTA): Butts, Cherokee, Clayton, Cobb, DeKalb, Douglas, Fayette, Forsyth, Fulton, Gwinnett, Henry, Newton, Paulding, Rockdale, Walton');
  console.log('  10212_99 (REST OF STATE): All Other Counties');
})().catch(console.error);
