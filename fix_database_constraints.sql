-- Fix corporate_entities table NOT NULL constraints to allow progressive data entry
ALTER TABLE corporate_entities 
  ALTER COLUMN email DROP NOT NULL,
  ALTER COLUMN user_id DROP NOT NULL;

-- Add missing corporate_name column that was referenced in error messages
ALTER TABLE corporate_entities 
  ADD COLUMN IF NOT EXISTS corporate_name VARCHAR(255);

-- Add onboarding progress tracking to user_profiles
ALTER TABLE user_profiles
  ADD COLUMN IF NOT EXISTS onboarding_current_step INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS onboarding_started_at TIMESTAMP,
  ADD COLUMN IF NOT EXISTS onboarding_completed_at TIMESTAMP,
  ADD COLUMN IF NOT EXISTS profile_complete BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS organization_complete BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS facility_complete BOOLEAN DEFAULT FALSE;

-- Add facility progress tracking to user_facilities
ALTER TABLE user_facilities
  ADD COLUMN IF NOT EXISTS setup_progress INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS setup_complete BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS equipment_setup_complete BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS staff_setup_complete BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS services_setup_complete BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS verification_status VARCHAR(50) DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS verification_date TIMESTAMP;

-- Make user_facilities columns nullable for progressive completion
ALTER TABLE user_facilities
  ALTER COLUMN facility_name DROP NOT NULL,
  ALTER COLUMN street_address DROP NOT NULL,
  ALTER COLUMN city DROP NOT NULL,
  ALTER COLUMN state DROP NOT NULL,
  ALTER COLUMN zip_code DROP NOT NULL;

-- Add auto-population support fields to user_profiles
ALTER TABLE user_profiles
  ADD COLUMN IF NOT EXISTS auto_populate_enabled BOOLEAN DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS last_synced_at TIMESTAMP,
  ADD COLUMN IF NOT EXISTS sync_source VARCHAR(50);

-- Add missing relationship fields for better data flow
ALTER TABLE corporate_entities
  ADD COLUMN IF NOT EXISTS primary_contact_name VARCHAR(255),
  ADD COLUMN IF NOT EXISTS primary_contact_email VARCHAR(255),
  ADD COLUMN IF NOT EXISTS primary_contact_phone VARCHAR(20),
  ADD COLUMN IF NOT EXISTS billing_email VARCHAR(255),
  ADD COLUMN IF NOT EXISTS billing_phone VARCHAR(20);

-- Add status and workflow tracking to corporate_entities
ALTER TABLE corporate_entities
  ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS completion_percentage INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_saved_at TIMESTAMP;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_corporate_entities_user_id ON corporate_entities(user_id);
CREATE INDEX IF NOT EXISTS idx_user_facilities_user_id ON user_facilities(user_id);
CREATE INDEX IF NOT EXISTS idx_user_facilities_is_primary ON user_facilities(is_primary);

-- Add trigger to auto-update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply the trigger to all tables
CREATE TRIGGER update_corporate_entities_updated_at BEFORE UPDATE ON corporate_entities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_facilities_updated_at BEFORE UPDATE ON user_facilities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add a function to calculate completion percentage
CREATE OR REPLACE FUNCTION calculate_corporate_entity_completion(entity_id INTEGER)
RETURNS INTEGER AS $$
DECLARE
    total_fields INTEGER := 16;
    filled_fields INTEGER := 0;
    entity RECORD;
BEGIN
    SELECT * INTO entity FROM corporate_entities WHERE id = entity_id;
    
    IF entity.legal_name IS NOT NULL AND entity.legal_name != '' THEN filled_fields := filled_fields + 1; END IF;
    IF entity.legal_entity_name IS NOT NULL AND entity.legal_entity_name != '' THEN filled_fields := filled_fields + 1; END IF;
    IF entity.tax_id IS NOT NULL AND entity.tax_id != '' THEN filled_fields := filled_fields + 1; END IF;
    IF entity.signer_name IS NOT NULL AND entity.signer_name != '' THEN filled_fields := filled_fields + 1; END IF;
    IF entity.signer_title IS NOT NULL AND entity.signer_title != '' THEN filled_fields := filled_fields + 1; END IF;
    IF entity.email IS NOT NULL AND entity.email != '' THEN filled_fields := filled_fields + 1; END IF;
    IF entity.phone IS NOT NULL AND entity.phone != '' THEN filled_fields := filled_fields + 1; END IF;
    IF entity.corporate_address IS NOT NULL AND entity.corporate_address != '' THEN filled_fields := filled_fields + 1; END IF;
    IF entity.corporate_city IS NOT NULL AND entity.corporate_city != '' THEN filled_fields := filled_fields + 1; END IF;
    IF entity.corporate_state IS NOT NULL AND entity.corporate_state != '' THEN filled_fields := filled_fields + 1; END IF;
    IF entity.corporate_zip IS NOT NULL AND entity.corporate_zip != '' THEN filled_fields := filled_fields + 1; END IF;
    IF entity.website IS NOT NULL AND entity.website != '' THEN filled_fields := filled_fields + 1; END IF;
    IF entity.organization_type IS NOT NULL AND entity.organization_type != '' THEN filled_fields := filled_fields + 1; END IF;
    IF entity.corporate_name IS NOT NULL AND entity.corporate_name != '' THEN filled_fields := filled_fields + 1; END IF;
    IF entity.primary_contact_name IS NOT NULL AND entity.primary_contact_name != '' THEN filled_fields := filled_fields + 1; END IF;
    IF entity.primary_contact_email IS NOT NULL AND entity.primary_contact_email != '' THEN filled_fields := filled_fields + 1; END IF;
    
    RETURN (filled_fields * 100) / total_fields;
END;
$$ LANGUAGE 'plpgsql';

-- Add RLS policies to ensure users can only access their own data
ALTER TABLE corporate_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_facilities ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view own corporate entity" ON corporate_entities
    FOR ALL USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view own profile" ON user_profiles
    FOR ALL USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view own facilities" ON user_facilities
    FOR ALL USING (auth.uid()::text = user_id::text);