# USRad Database Fix Instructions

## Overview
This document contains instructions for applying database fixes to resolve save functionality issues across the USRad facility management system.

## Issues Addressed
1. **Corporate entities table NOT NULL constraints** preventing data saves
2. **Missing columns** for user data flow and onboarding tracking
3. **Rigid constraints** on facility data preventing progressive data entry
4. **Missing indexes** and performance optimizations

## How to Apply the Fixes

### Option 1: Using Supabase SQL Editor (Recommended)

1. **Access the SQL Editor**
   - Go to: https://supabase.com/dashboard/project/skpxihbmwdswmcajnhut/sql/new
   - Make sure you're logged in with admin privileges

2. **Apply the Migration**
   - Copy the entire contents of `supabase_migration_script.sql`
   - Paste it into the SQL Editor
   - Click "Run" to execute all statements

3. **Verify Success**
   - Check that all statements execute without errors
   - The final SELECT statement will show the updated table structure

### Option 2: Using Supabase CLI

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref skpxihbmwdswmcajnhut

# Apply the migration
supabase db push supabase/migrations/20250114_fix_database_constraints.sql
```

## Changes Applied

### 1. Corporate Entities Table
- ✅ Removed NOT NULL constraint from `email` column
- ✅ Removed NOT NULL constraint from `user_id` column
- ✅ Added `corporate_name` column
- ✅ Added contact fields: `primary_contact_name`, `primary_contact_email`, `primary_contact_phone`
- ✅ Added billing fields: `billing_email`, `billing_phone`
- ✅ Added status tracking: `status`, `completion_percentage`, `last_saved_at`

### 2. User Profiles Table
- ✅ Added onboarding tracking: `onboarding_current_step`, `onboarding_completed`, `onboarding_started_at`, `onboarding_completed_at`
- ✅ Added completion flags: `profile_complete`, `organization_complete`, `facility_complete`
- ✅ Added auto-population support: `auto_populate_enabled`, `last_synced_at`, `sync_source`

### 3. User Facilities Table
- ✅ Made all address fields nullable (`facility_name`, `street_address`, `city`, `state`, `zip_code`)
- ✅ Added setup tracking: `setup_progress`, `setup_complete`
- ✅ Added module completion flags: `equipment_setup_complete`, `staff_setup_complete`, `services_setup_complete`
- ✅ Added verification tracking: `verification_status`, `verification_date`

### 4. Performance Improvements
- ✅ Added indexes on foreign key columns
- ✅ Added auto-update triggers for `updated_at` columns
- ✅ Added composite indexes for common queries

## Testing the Fixes

After applying the database fixes, test the following:

1. **Settings Page**
   - Save user profile with partial data
   - Verify no constraint violations

2. **Organization Page**
   - Save corporate entity with only required fields
   - Add additional fields progressively

3. **Facility Management**
   - Create facility with minimal data
   - Update facility information incrementally

4. **Onboarding Flow**
   - Track progress through onboarding steps
   - Verify completion percentages update correctly

## Rollback Instructions

If needed, you can rollback these changes:

```sql
-- Rollback corporate_entities changes
ALTER TABLE corporate_entities 
  ALTER COLUMN email SET NOT NULL,
  ALTER COLUMN user_id SET NOT NULL;

ALTER TABLE corporate_entities 
  DROP COLUMN IF EXISTS corporate_name,
  DROP COLUMN IF EXISTS primary_contact_name,
  DROP COLUMN IF EXISTS primary_contact_email,
  DROP COLUMN IF EXISTS primary_contact_phone,
  DROP COLUMN IF EXISTS billing_email,
  DROP COLUMN IF EXISTS billing_phone,
  DROP COLUMN IF EXISTS status,
  DROP COLUMN IF EXISTS completion_percentage,
  DROP COLUMN IF EXISTS last_saved_at;

-- Continue with other rollback statements...
```

## Next Steps

1. Apply the migration script
2. Test all save functionality
3. Monitor for any issues
4. Update application code to utilize new fields

## Support

If you encounter any issues:
1. Check the Supabase logs for detailed error messages
2. Verify all migration statements completed successfully
3. Ensure your application has the correct permissions