// Create this file: src/test/testSchema.ts
// Run with: npx tsx src/test/testSchema.ts

import { db } from '../lib/db';
import { imagingCenters } from '../lib/schema';
import { sql } from 'drizzle-orm';

async function testSchema() {
  console.log('🧪 Testing schema updates...');
  
  try {
    // Test 1: Check if new columns exist
    console.log('\n1. Checking database columns...');
    const result = await db.execute(sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'imaging_centers' 
      AND column_name IN ('legal_business_name', 'psa_url', 'credentialing_id', 'tier')
      ORDER BY column_name;
    `);
    
    console.log('✅ New columns found:', result.rows);
    
    // Test 2: Try inserting test data (we'll delete it after)
    console.log('\n2. Testing data insertion...');
    const testData = {
      userId: 1, // You might need to adjust this
      name: 'Test Imaging Center',
      legalBusinessName: 'Test Legal Name LLC',
      city: 'Test City',
      state: 'FL',
      status: 'psa_pending' as const,
      tier: 'standard' as const
    };
    
    // Insert test record
    const inserted = await db.insert(imagingCenters).values(testData).returning();
    console.log('✅ Test record inserted:', inserted[0]?.id);
    
    // Clean up - delete test record
    if (inserted[0]?.id) {
      await db.delete(imagingCenters).where(sql`id = ${inserted[0].id}`);
      console.log('✅ Test record cleaned up');
    }
    
    console.log('\n🎉 Schema test completed successfully!');
    
  } catch (error) {
    console.error('❌ Schema test failed:', error);
    
    if (error.message.includes('column') && error.message.includes('does not exist')) {
      console.log('\n💡 It looks like the migration didn\'t run properly.');
      console.log('Try running the migration again in Railway console.');
    }
  }
}

testSchema().then(() => process.exit(0));