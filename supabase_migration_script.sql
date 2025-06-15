-- USRad Database Fixes
-- Generated on 2025-06-14T17:42:55.752Z
-- 
-- Apply this script in the Supabase SQL Editor
-- https://supabase.com/dashboard/project/skpxihbmwdswmcajnhut/sql/new

-- Fix corporate_entities constraints
ALTER TABLE corporate_entities ALTER COLUMN email DROP NOT NULL;

ALTER TABLE corporate_entities ALTER COLUMN user_id DROP NOT NULL;

ALTER TABLE corporate_entities ADD COLUMN IF NOT EXISTS corporate_name VARCHAR(255);

ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS onboarding_current_step INTEGER DEFAULT 0;

ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;

ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS onboarding_started_at TIMESTAMP;

ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS onboarding_completed_at TIMESTAMP;

ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS profile_complete BOOLEAN DEFAULT FALSE;

ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS organization_complete BOOLEAN DEFAULT FALSE;

ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS facility_complete BOOLEAN DEFAULT FALSE;

ALTER TABLE user_facilities ADD COLUMN IF NOT EXISTS setup_progress INTEGER DEFAULT 0;

ALTER TABLE user_facilities ADD COLUMN IF NOT EXISTS setup_complete BOOLEAN DEFAULT FALSE;

ALTER TABLE user_facilities ADD COLUMN IF NOT EXISTS equipment_setup_complete BOOLEAN DEFAULT FALSE;

ALTER TABLE user_facilities ADD COLUMN IF NOT EXISTS staff_setup_complete BOOLEAN DEFAULT FALSE;

ALTER TABLE user_facilities ADD COLUMN IF NOT EXISTS services_setup_complete BOOLEAN DEFAULT FALSE;

ALTER TABLE user_facilities ADD COLUMN IF NOT EXISTS verification_status VARCHAR(50) DEFAULT 'pending';

ALTER TABLE user_facilities ADD COLUMN IF NOT EXISTS verification_date TIMESTAMP;

ALTER TABLE user_facilities ALTER COLUMN facility_name DROP NOT NULL;

ALTER TABLE user_facilities ALTER COLUMN street_address DROP NOT NULL;

ALTER TABLE user_facilities ALTER COLUMN city DROP NOT NULL;

ALTER TABLE user_facilities ALTER COLUMN state DROP NOT NULL;

ALTER TABLE user_facilities ALTER COLUMN zip_code DROP NOT NULL;

ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS auto_populate_enabled BOOLEAN DEFAULT TRUE;

ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS last_synced_at TIMESTAMP;

ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS sync_source VARCHAR(50);

ALTER TABLE corporate_entities ADD COLUMN IF NOT EXISTS primary_contact_name VARCHAR(255);

ALTER TABLE corporate_entities ADD COLUMN IF NOT EXISTS primary_contact_email VARCHAR(255);

ALTER TABLE corporate_entities ADD COLUMN IF NOT EXISTS primary_contact_phone VARCHAR(20);

ALTER TABLE corporate_entities ADD COLUMN IF NOT EXISTS billing_email VARCHAR(255);

ALTER TABLE corporate_entities ADD COLUMN IF NOT EXISTS billing_phone VARCHAR(20);

ALTER TABLE corporate_entities ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'draft';

ALTER TABLE corporate_entities ADD COLUMN IF NOT EXISTS completion_percentage INTEGER DEFAULT 0;

ALTER TABLE corporate_entities ADD COLUMN IF NOT EXISTS last_saved_at TIMESTAMP;

CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

CREATE INDEX IF NOT EXISTS idx_corporate_entities_user_id ON corporate_entities(user_id);

CREATE INDEX IF NOT EXISTS idx_user_facilities_user_id ON user_facilities(user_id);

CREATE INDEX IF NOT EXISTS idx_user_facilities_is_primary ON user_facilities(is_primary);

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
