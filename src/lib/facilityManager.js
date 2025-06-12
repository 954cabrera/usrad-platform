// /src/lib/facilityManager.js
// Supabase integration for ACR facility management

import { supabase } from './supabase.js';

/**
 * Search ACR database for facilities
 */
export async function searchAcrFacilities(query) {
  if (!query || query.length < 2) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('imaging_centers')
      .select(`
        id,
        facility_name,
        street_1,
        city,
        state,
        zip_code,
        phone_number,
        modality,
        status
      `)
      .or(`facility_name.ilike.%${query}%,city.ilike.%${query}%,state.ilike.%${query}%`)
      .eq('status', 'Accredited')
      .limit(10);

    if (error) {
      console.error('Error searching ACR facilities:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in searchAcrFacilities:', error);
    return [];
  }
}

/**
 * Save selected facilities to user profile
 */
export async function saveFacilitySelection(userId, corporateInfo, facilities) {
  try {
    // Update user profile with corporate information
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({
        company_name: corporateInfo.corporateName,
        onboarding_progress: 60,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (updateError) {
      console.error('Error updating user profile:', updateError);
      return false;
    }

    // Save corporate information
    const { error: corpError } = await supabase
      .from('corporate_entities')
      .upsert({
        user_id: userId,
        corporate_name: corporateInfo.corporateName,
        legal_entity_name: corporateInfo.legalEntityName,
        tax_id: corporateInfo.taxId,
        organization_type: corporateInfo.organizationType,
        primary_contact_name: corporateInfo.primaryContactName,
        primary_contact_title: corporateInfo.primaryContactTitle,
        primary_contact_email: corporateInfo.primaryContactEmail,
        primary_contact_phone: corporateInfo.primaryContactPhone,
        billing_address: corporateInfo.billingAddress,
        billing_city: corporateInfo.billingCity,
        billing_state: corporateInfo.billingState,
        billing_zip: corporateInfo.billingZip,
        signing_authority: corporateInfo.signingAuthority,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (corpError) {
      console.error('Error saving corporate entity:', corpError);
    }

    // Clear existing facilities for this user
    await supabase
      .from('user_facilities')
      .delete()
      .eq('user_id', userId);

    // Save facility selections
    const facilityInserts = facilities.map(facility => ({
      user_id: userId,
      facility_name: facility.name,
      facility_address: facility.address,
      facility_phone: facility.phone,
      modality: facility.modality || 'Not specified',
      acr_verified: facility.acrVerified || false,
      acr_facility_id: facility.acrId || null,
      is_primary: facility.isPrimary || false,
      is_manual_entry: facility.isManual || false,
      created_at: new Date().toISOString()
    }));

    const { error: facilitiesError } = await supabase
      .from('user_facilities')
      .insert(facilityInserts);

    if (facilitiesError) {
      console.error('Error saving facilities:', facilitiesError);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in saveFacilitySelection:', error);
    return false;
  }
}

/**
 * Load saved facility selection for user
 */
export async function loadFacilitySelection(userId) {
  try {
    // Load corporate entity
    const { data: corporateData } = await supabase
      .from('corporate_entities')
      .select('*')
      .eq('user_id', userId)
      .single();

    // Load facilities
    const { data: facilitiesData } = await supabase
      .from('user_facilities')
      .select('*')
      .eq('user_id', userId)
      .order('is_primary', { ascending: false });

    const corporateInfo = corporateData ? {
      corporateName: corporateData.corporate_name,
      legalEntityName: corporateData.legal_entity_name,
      taxId: corporateData.tax_id,
      organizationType: corporateData.organization_type,
      primaryContactName: corporateData.primary_contact_name,
      primaryContactTitle: corporateData.primary_contact_title,
      primaryContactEmail: corporateData.primary_contact_email,
      primaryContactPhone: corporateData.primary_contact_phone,
      billingAddress: corporateData.billing_address,
      billingCity: corporateData.billing_city,
      billingState: corporateData.billing_state,
      billingZip: corporateData.billing_zip,
      signingAuthority: corporateData.signing_authority
    } : {};

    const facilities = facilitiesData ? facilitiesData.map(f => ({
      id: f.id,
      name: f.facility_name,
      address: f.facility_address,
      phone: f.facility_phone,
      modality: f.modality,
      acrVerified: f.acr_verified,
      acrId: f.acr_facility_id,
      isPrimary: f.is_primary,
      isManual: f.is_manual_entry
    })) : [];

    return { corporateInfo, facilities };
  } catch (error) {
    console.error('Error loading facility selection:', error);
    return { corporateInfo: {}, facilities: [] };
  }
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone) {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6)}`;
  }
  return phone;
}

/**
 * Validate corporate information completeness
 */
export function validateCorporateInfo(corporateInfo) {
  const required = [
    'corporateName',
    'legalEntityName', 
    'taxId',
    'primaryContactName',
    'primaryContactEmail',
    'organizationType'
  ];
  
  return required.every(field => 
    corporateInfo[field] && corporateInfo[field].trim() !== ''
  );
}