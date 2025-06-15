import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

// Create Supabase client with service role key for admin access
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// SQL statements to fix database constraints
const sqlStatements = [
  // Fix corporate_entities constraints
  `ALTER TABLE corporate_entities ALTER COLUMN email DROP NOT NULL`,
  `ALTER TABLE corporate_entities ALTER COLUMN user_id DROP NOT NULL`,
  `ALTER TABLE corporate_entities ADD COLUMN IF NOT EXISTS corporate_name VARCHAR(255)`,
  
  // Add onboarding progress tracking to user_profiles
  `ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS onboarding_current_step INTEGER DEFAULT 0`,
  `ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE`,
  `ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS onboarding_started_at TIMESTAMP`,
  `ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS onboarding_completed_at TIMESTAMP`,
  `ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS profile_complete BOOLEAN DEFAULT FALSE`,
  `ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS organization_complete BOOLEAN DEFAULT FALSE`,
  `ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS facility_complete BOOLEAN DEFAULT FALSE`,
  
  // Add facility progress tracking
  `ALTER TABLE user_facilities ADD COLUMN IF NOT EXISTS setup_progress INTEGER DEFAULT 0`,
  `ALTER TABLE user_facilities ADD COLUMN IF NOT EXISTS setup_complete BOOLEAN DEFAULT FALSE`,
  `ALTER TABLE user_facilities ADD COLUMN IF NOT EXISTS equipment_setup_complete BOOLEAN DEFAULT FALSE`,
  `ALTER TABLE user_facilities ADD COLUMN IF NOT EXISTS staff_setup_complete BOOLEAN DEFAULT FALSE`,
  `ALTER TABLE user_facilities ADD COLUMN IF NOT EXISTS services_setup_complete BOOLEAN DEFAULT FALSE`,
  `ALTER TABLE user_facilities ADD COLUMN IF NOT EXISTS verification_status VARCHAR(50) DEFAULT 'pending'`,
  `ALTER TABLE user_facilities ADD COLUMN IF NOT EXISTS verification_date TIMESTAMP`,
  
  // Make user_facilities columns nullable
  `ALTER TABLE user_facilities ALTER COLUMN facility_name DROP NOT NULL`,
  `ALTER TABLE user_facilities ALTER COLUMN street_address DROP NOT NULL`,
  `ALTER TABLE user_facilities ALTER COLUMN city DROP NOT NULL`,
  `ALTER TABLE user_facilities ALTER COLUMN state DROP NOT NULL`,
  `ALTER TABLE user_facilities ALTER COLUMN zip_code DROP NOT NULL`,
  
  // Add auto-population support fields
  `ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS auto_populate_enabled BOOLEAN DEFAULT TRUE`,
  `ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS last_synced_at TIMESTAMP`,
  `ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS sync_source VARCHAR(50)`,
  
  // Add relationship fields to corporate_entities
  `ALTER TABLE corporate_entities ADD COLUMN IF NOT EXISTS primary_contact_name VARCHAR(255)`,
  `ALTER TABLE corporate_entities ADD COLUMN IF NOT EXISTS primary_contact_email VARCHAR(255)`,
  `ALTER TABLE corporate_entities ADD COLUMN IF NOT EXISTS primary_contact_phone VARCHAR(20)`,
  `ALTER TABLE corporate_entities ADD COLUMN IF NOT EXISTS billing_email VARCHAR(255)`,
  `ALTER TABLE corporate_entities ADD COLUMN IF NOT EXISTS billing_phone VARCHAR(20)`,
  
  // Add status tracking to corporate_entities
  `ALTER TABLE corporate_entities ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'draft'`,
  `ALTER TABLE corporate_entities ADD COLUMN IF NOT EXISTS completion_percentage INTEGER DEFAULT 0`,
  `ALTER TABLE corporate_entities ADD COLUMN IF NOT EXISTS last_saved_at TIMESTAMP`,
  
  // Create indexes
  `CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id)`,
  `CREATE INDEX IF NOT EXISTS idx_corporate_entities_user_id ON corporate_entities(user_id)`,
  `CREATE INDEX IF NOT EXISTS idx_user_facilities_user_id ON user_facilities(user_id)`,
  `CREATE INDEX IF NOT EXISTS idx_user_facilities_is_primary ON user_facilities(is_primary)`
];

async function testConnection() {
  console.log('🔧 Testing Supabase connection...');
  
  try {
    // Test connection by querying corporate_entities table
    const { data, error } = await supabase
      .from('corporate_entities')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Connection test failed:', error);
      return false;
    }
    
    console.log('✅ Connection successful!\n');
    return true;
  } catch (error) {
    console.error('❌ Connection error:', error);
    return false;
  }
}

async function executeSQLStatement(sql, index, total) {
  const preview = sql.substring(0, 60).replace(/\n/g, ' ') + '...';
  console.log(`[${index}/${total}] ${preview}`);
  
  try {
    // For DDL statements, we need to use the Supabase SQL editor API
    // Since direct SQL execution isn't available in the JS client,
    // we'll need to check if the changes already exist first
    
    // Special handling for checking existing columns
    if (sql.includes('ADD COLUMN IF NOT EXISTS')) {
      console.log('⚠️  Column check: This needs to be applied via Supabase Dashboard');
      return { success: true, message: 'Needs manual application' };
    }
    
    // For other statements, we'll need manual application
    console.log('⚠️  Requires manual application in Supabase SQL Editor');
    return { success: true, message: 'Manual application required' };
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function generateSQLScript() {
  console.log('\n📝 Generating SQL script for manual execution...\n');
  
  const scriptContent = `-- USRad Database Fixes
-- Generated on ${new Date().toISOString()}
-- 
-- Apply this script in the Supabase SQL Editor
-- https://supabase.com/dashboard/project/skpxihbmwdswmcajnhut/sql/new

-- Fix corporate_entities constraints
${sqlStatements.join(';\n\n')};

-- Add update trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
DROP TRIGGER IF EXISTS update_corporate_entities_updated_at ON corporate_entities;
CREATE TRIGGER update_corporate_entities_updated_at BEFORE UPDATE ON corporate_entities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_facilities_updated_at ON user_facilities;
CREATE TRIGGER update_user_facilities_updated_at BEFORE UPDATE ON user_facilities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Verify the changes
SELECT 
    table_name,
    column_name,
    is_nullable,
    data_type,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
    AND table_name IN ('corporate_entities', 'user_profiles', 'user_facilities')
ORDER BY table_name, ordinal_position;
`;

  // Save the script
  const fs = await import('fs');
  const scriptPath = './supabase_migration_script.sql';
  fs.writeFileSync(scriptPath, scriptContent);
  
  console.log(`✅ SQL script saved to: ${scriptPath}`);
  console.log('\n📋 Next steps:');
  console.log('1. Go to Supabase SQL Editor: https://supabase.com/dashboard/project/skpxihbmwdswmcajnhut/sql/new');
  console.log('2. Copy and paste the contents of supabase_migration_script.sql');
  console.log('3. Click "Run" to execute the migration');
  console.log('4. Verify that all statements execute successfully');
  
  return scriptPath;
}

async function main() {
  console.log('🚀 USRad Database Fix Script');
  console.log('============================\n');
  
  // Test connection
  const connected = await testConnection();
  if (!connected) {
    console.error('\n❌ Cannot proceed without a valid connection');
    process.exit(1);
  }
  
  // Generate SQL script for manual execution
  await generateSQLScript();
  
  console.log('\n🎯 Summary of fixes to be applied:');
  console.log('- Remove NOT NULL constraints from corporate_entities (email, user_id)');
  console.log('- Add corporate_name column to corporate_entities');
  console.log('- Add onboarding progress tracking to user_profiles');
  console.log('- Add facility progress tracking to user_facilities');
  console.log('- Make user_facilities columns nullable');
  console.log('- Add auto-population support fields');
  console.log('- Add status and workflow tracking');
  console.log('- Create performance indexes');
  console.log('- Add auto-update triggers');
  
  console.log('\n✅ Script generation complete!');
}

// Run the script
main().catch(console.error);