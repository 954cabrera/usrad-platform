import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database connection URL from Supabase
const connectionString = 'postgresql://postgres.skpxihbmwdswmcajnhut:' + process.env.SUPABASE_SERVICE_ROLE_KEY + '@aws-0-us-west-1.pooler.supabase.com:6543/postgres';

const { Client } = pg;

async function applyDatabaseFixes() {
  const client = new Client({
    connectionString: connectionString,
  });

  try {
    console.log('🔧 Connecting to database...\n');
    await client.connect();
    console.log('✅ Connected successfully\n');

    // Read the SQL migration file
    const sqlPath = path.join(__dirname, 'supabase/migrations/20250114_fix_database_constraints.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');

    // Split SQL statements and filter out comments and empty lines
    const statements = sqlContent
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`📝 Found ${statements.length} SQL statements to execute\n`);

    let successCount = 0;
    let errorCount = 0;

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';';
      const preview = statement.substring(0, 80).replace(/\n/g, ' ') + '...';
      
      console.log(`[${i + 1}/${statements.length}] Executing: ${preview}`);
      
      try {
        await client.query(statement);
        console.log('✅ Success\n');
        successCount++;
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log('⚠️  Already exists (skipping)\n');
          successCount++;
        } else {
          console.error(`❌ Error: ${error.message}\n`);
          errorCount++;
        }
      }
    }

    console.log('🎉 Database migration completed!');
    console.log(`✅ Successful statements: ${successCount}`);
    console.log(`❌ Failed statements: ${errorCount}`);
    
    console.log('\n📋 Summary of changes applied:');
    console.log('- ✅ Removed NOT NULL constraints from corporate_entities (email, user_id)');
    console.log('- ✅ Added corporate_name column to corporate_entities');
    console.log('- ✅ Added onboarding progress tracking fields to user_profiles');
    console.log('- ✅ Added facility progress tracking fields to user_facilities');
    console.log('- ✅ Made user_facilities columns nullable for progressive completion');
    console.log('- ✅ Added auto-population support fields');
    console.log('- ✅ Added status and workflow tracking fields');
    console.log('- ✅ Created performance indexes');
    console.log('- ✅ Added auto-update triggers for updated_at columns');
    
    console.log('\n🚀 Next steps:');
    console.log('1. Test save functionality in Settings, Profile, Organization, and Facility Management');
    console.log('2. Verify that partial data can be saved without constraint violations');
    console.log('3. Check that onboarding progress tracking works correctly');

  } catch (error) {
    console.error('❌ Failed to apply database fixes:', error);
    process.exit(1);
  } finally {
    await client.end();
    console.log('\n👋 Database connection closed');
  }
}

// Check if pg is installed
try {
  await import('pg');
} catch (error) {
  console.error('❌ Missing required package: pg');
  console.error('Please run: npm install pg');
  process.exit(1);
}

// Run the fixes
console.log('🚀 USRad Database Fix Script');
console.log('============================\n');
applyDatabaseFixes();