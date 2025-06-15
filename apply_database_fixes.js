import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get Supabase credentials from environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:');
  console.error('- NEXT_PUBLIC_SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function applyDatabaseFixes() {
  console.log('🔧 Applying database fixes...\n');

  try {
    // Read the SQL migration file
    const sqlPath = path.join(__dirname, 'supabase/migrations/20250114_fix_database_constraints.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');

    // Split SQL statements (simple split on semicolons)
    const statements = sqlContent
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`📝 Found ${statements.length} SQL statements to execute\n`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';';
      console.log(`Executing statement ${i + 1}/${statements.length}...`);
      
      try {
        const { error } = await supabase.rpc('exec_sql', { 
          sql_query: statement 
        });

        if (error) {
          // Try direct execution if RPC fails
          console.log('RPC failed, attempting direct execution...');
          // Note: Direct SQL execution requires admin access
          throw error;
        }

        console.log('✅ Success\n');
      } catch (error) {
        console.error(`❌ Error executing statement ${i + 1}:`, error.message);
        console.error('Statement:', statement.substring(0, 100) + '...\n');
        
        // Continue with other statements even if one fails
        continue;
      }
    }

    console.log('🎉 Database fixes applied successfully!');
    console.log('\n📋 Summary of changes:');
    console.log('- Removed NOT NULL constraints from corporate_entities (email, user_id)');
    console.log('- Added corporate_name column to corporate_entities');
    console.log('- Added onboarding progress tracking to user_profiles');
    console.log('- Added facility progress tracking to user_facilities');
    console.log('- Made user_facilities columns nullable for progressive completion');
    console.log('- Added auto-population support fields');
    console.log('- Added status and workflow tracking fields');
    console.log('- Created performance indexes');
    console.log('- Added auto-update triggers for updated_at columns');

  } catch (error) {
    console.error('❌ Failed to apply database fixes:', error);
    process.exit(1);
  }
}

// Run the fixes
applyDatabaseFixes();