-- Database Enhancements for Unified Settings System
-- Execute these statements in your Supabase SQL editor

-- Ensure user_profiles table has all necessary columns
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS professional_title TEXT,
ADD COLUMN IF NOT EXISTS specialty TEXT,
ADD COLUMN IF NOT EXISTS profile_photo_url TEXT,
ADD COLUMN IF NOT EXISTS notification_settings JSONB DEFAULT '{
  "email_notifications": true,
  "sms_alerts": false,
  "appointment_reminders": true,
  "system_updates": true
}'::jsonb,
ADD COLUMN IF NOT EXISTS onboarding_step TEXT DEFAULT 'profile',
ADD COLUMN IF NOT EXISTS onboarding_completed_steps TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS onboarding_skip_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS psa_signed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS credentialing_complete BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS banking_setup BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS launch_ready BOOLEAN DEFAULT false;

-- Ensure corporate_entities table has all necessary columns and proper constraints
ALTER TABLE corporate_entities 
ADD COLUMN IF NOT EXISTS corporate_suite TEXT,
ADD COLUMN IF NOT EXISTS legal_name TEXT,
DROP CONSTRAINT IF EXISTS corporate_entities_tax_id_check,
DROP CONSTRAINT IF EXISTS corporate_entities_phone_check,
DROP CONSTRAINT IF EXISTS corporate_entities_primary_contact_phone_check;

-- Make columns nullable for progressive entry
ALTER TABLE corporate_entities 
ALTER COLUMN corporate_name DROP NOT NULL,
ALTER COLUMN tax_id DROP NOT NULL,
ALTER COLUMN signer_name DROP NOT NULL,
ALTER COLUMN email DROP NOT NULL,
ALTER COLUMN corporate_address DROP NOT NULL;

-- Ensure user_facilities table has proper structure
ALTER TABLE user_facilities 
ADD COLUMN IF NOT EXISTS acr_verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS is_primary BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'pending';

-- Create or replace function to calculate onboarding progress
CREATE OR REPLACE FUNCTION calculate_onboarding_progress(user_id_param UUID)
RETURNS INTEGER AS $$
DECLARE
    profile_complete BOOLEAN := false;
    corporate_complete BOOLEAN := false;
    facilities_count INTEGER := 0;
    psa_complete BOOLEAN := false;
    credentialing_complete BOOLEAN := false;
    banking_complete BOOLEAN := false;
    launch_ready BOOLEAN := false;
    total_steps INTEGER := 7;
    completed_steps INTEGER := 1; -- Account created is always true
BEGIN
    -- Check profile completion
    SELECT 
        (full_name IS NOT NULL AND full_name != '' AND 
         phone IS NOT NULL AND phone != '' AND 
         center_name IS NOT NULL AND center_name != '')
    INTO profile_complete
    FROM user_profiles 
    WHERE user_id = user_id_param;
    
    IF profile_complete THEN
        completed_steps := completed_steps + 1;
    END IF;
    
    -- Check corporate completion (at least 80% of required fields)
    SELECT 
        (corporate_name IS NOT NULL AND corporate_name != '' AND
         tax_id IS NOT NULL AND tax_id != '' AND
         signer_name IS NOT NULL AND signer_name != '' AND
         primary_contact_email IS NOT NULL AND primary_contact_email != '' AND
         corporate_address IS NOT NULL AND corporate_address != '' AND
         corporate_city IS NOT NULL AND corporate_city != '' AND
         corporate_state IS NOT NULL AND corporate_state != '')
    INTO corporate_complete
    FROM corporate_entities 
    WHERE user_id = user_id_param;
    
    IF corporate_complete THEN
        completed_steps := completed_steps + 1;
    END IF;
    
    -- Check facilities
    SELECT COUNT(*) INTO facilities_count
    FROM user_facilities 
    WHERE user_id = user_id_param;
    
    IF facilities_count > 0 THEN
        completed_steps := completed_steps + 1;
    END IF;
    
    -- Check other completion flags
    SELECT 
        COALESCE(psa_signed, false),
        COALESCE(credentialing_complete, false),
        COALESCE(banking_setup, false),
        COALESCE(launch_ready, false)
    INTO psa_complete, credentialing_complete, banking_complete, launch_ready
    FROM user_profiles 
    WHERE user_id = user_id_param;
    
    IF psa_complete THEN completed_steps := completed_steps + 1; END IF;
    IF credentialing_complete THEN completed_steps := completed_steps + 1; END IF;
    IF banking_complete THEN completed_steps := completed_steps + 1; END IF;
    
    -- Update the onboarding_progress in user_profiles
    UPDATE user_profiles 
    SET onboarding_progress = ROUND((completed_steps::FLOAT / total_steps::FLOAT) * 100)
    WHERE user_id = user_id_param;
    
    RETURN ROUND((completed_steps::FLOAT / total_steps::FLOAT) * 100);
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update onboarding progress
CREATE OR REPLACE FUNCTION update_onboarding_progress_trigger()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM calculate_onboarding_progress(NEW.user_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS trigger_update_progress_profiles ON user_profiles;
DROP TRIGGER IF EXISTS trigger_update_progress_corporate ON corporate_entities;
DROP TRIGGER IF EXISTS trigger_update_progress_facilities ON user_facilities;

-- Create triggers
CREATE TRIGGER trigger_update_progress_profiles
    AFTER INSERT OR UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_onboarding_progress_trigger();

CREATE TRIGGER trigger_update_progress_corporate
    AFTER INSERT OR UPDATE ON corporate_entities
    FOR EACH ROW
    EXECUTE FUNCTION update_onboarding_progress_trigger();

CREATE TRIGGER trigger_update_progress_facilities
    AFTER INSERT OR UPDATE OR DELETE ON user_facilities
    FOR EACH ROW
    EXECUTE FUNCTION update_onboarding_progress_trigger();

-- Create storage bucket for profile photos (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-photos', 'profile-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy for profile photos
CREATE POLICY "Users can upload their own profile photos" ON storage.objects
FOR INSERT WITH CHECK (
    bucket_id = 'profile-photos' AND 
    auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own profile photos" ON storage.objects
FOR SELECT USING (
    bucket_id = 'profile-photos' AND 
    auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own profile photos" ON storage.objects
FOR UPDATE USING (
    bucket_id = 'profile-photos' AND 
    auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own profile photos" ON storage.objects
FOR DELETE USING (
    bucket_id = 'profile-photos' AND 
    auth.uid()::text = (storage.foldername(name))[1]
);

-- Update existing user profiles to have default notification settings
UPDATE user_profiles 
SET notification_settings = '{
  "email_notifications": true,
  "sms_alerts": false,
  "appointment_reminders": true,
  "system_updates": true
}'::jsonb
WHERE notification_settings IS NULL;

-- Calculate progress for all existing users
DO $$
DECLARE
    user_record RECORD;
BEGIN
    FOR user_record IN SELECT DISTINCT user_id FROM user_profiles
    LOOP
        PERFORM calculate_onboarding_progress(user_record.user_id);
    END LOOP;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_onboarding ON user_profiles(user_id, onboarding_progress);
CREATE INDEX IF NOT EXISTS idx_corporate_entities_user ON corporate_entities(user_id);
CREATE INDEX IF NOT EXISTS idx_user_facilities_user ON user_facilities(user_id);
CREATE INDEX IF NOT EXISTS idx_user_facilities_primary ON user_facilities(user_id, is_primary);

COMMENT ON TABLE user_profiles IS 'Enhanced user profiles with comprehensive onboarding tracking';
COMMENT ON TABLE corporate_entities IS 'Corporate information with flexible data entry requirements';
COMMENT ON TABLE user_facilities IS 'User facilities with verification status tracking';
COMMENT ON FUNCTION calculate_onboarding_progress(UUID) IS 'Calculates and updates user onboarding progress percentage';

-- Verify the enhancements
SELECT 
    'user_profiles' as table_name,
    COUNT(*) as total_users,
    AVG(onboarding_progress) as avg_progress
FROM user_profiles
UNION ALL
SELECT 
    'corporate_entities' as table_name,
    COUNT(*) as total_entities,
    0 as avg_progress
FROM corporate_entities
UNION ALL
SELECT 
    'user_facilities' as table_name,
    COUNT(*) as total_facilities,
    0 as avg_progress
FROM user_facilities;