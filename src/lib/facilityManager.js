// COMPLETE FIX: /src/lib/facilityManager.js
// Handles data loading, progress updates, and global state synchronization

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
 * Save selected facilities to user profile with complete progress tracking
 */
export async function saveFacilitySelection(userId, corporateInfo, facilities) {
  try {
    console.log('🔍 Starting facility save for user:', userId);

    // First, save corporate information with proper conflict resolution
    const { data: corporateEntity, error: corpError } = await supabase
      .from('corporate_entities')
      .upsert({
        userid: userId,
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
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id',
        ignoreDuplicates: false
      })
      .select()
      .single();

    if (corpError) {
      console.error('Error saving corporate entity:', corpError);
      return false;
    }

    console.log('✅ Corporate entity saved successfully');

    // Clear existing facilities for this user
    const { error: deleteError } = await supabase
      .from('user_facilities')
      .delete()
      .eq('user_id', userId);

    if (deleteError) {
      console.warn('Warning clearing existing facilities:', deleteError);
    }

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

    const { data: savedFacilities, error: facilitiesError } = await supabase
      .from('user_facilities')
      .insert(facilityInserts)
      .select();

    if (facilitiesError) {
      console.error('Error saving facilities:', facilitiesError);
      return false;
    }

    console.log('✅ Facilities saved successfully:', savedFacilities.length);

    // Update user profile progress - use upsert to handle missing profiles
    const { error: profileError } = await supabase
      .from('user_profiles')
      .upsert({
        id: userId,
        company_name: corporateInfo.corporateName,
        onboarding_progress: 25, // Facilities complete = 25% (step 1 of 5)
        facilities_configured: true,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'id',
        ignoreDuplicates: false
      });

    if (profileError) {
      console.warn('Warning updating user profile:', profileError);
      // Don't fail the save for this
    }

    // Update global user state if available
    if (typeof window !== 'undefined' && window.USRadUser) {
      // Update the global user object
      if (window.USRadUser.updateUserMetadata) {
        try {
          await window.USRadUser.updateUserMetadata({
            facilities_configured: true,
            onboarding_progress: 25,
            company_name: corporateInfo.corporateName
          });
          console.log('✅ Global user state updated');
        } catch (error) {
          console.warn('Warning updating global user state:', error);
        }
      }

      // Trigger UI update event
      if (window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('userProgressUpdate', {
          detail: {
            facilities_configured: true,
            onboarding_progress: 25,
            step_completed: 'facilities'
          }
        }));
      }
    }

    return true;

  } catch (error) {
    console.error('💥 Error in saveFacilitySelection:', error);
    return false;
  }
}

/**
 * Load saved facility selection for user
 */
export async function loadFacilitySelection(userId) {
  try {
    console.log('🔍 Loading facility data for user:', userId);

    // Load corporate entity
    const { data: corporateData, error: corpError } = await supabase
      .from('corporate_entities')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle(); // Use maybeSingle instead of single to avoid errors

    if (corpError && corpError.code !== 'PGRST116') {
      console.error('Error loading corporate entity:', corpError);
    }

    // Load facilities
    const { data: facilitiesData, error: facilitiesError } = await supabase
      .from('user_facilities')
      .select('*')
      .eq('user_id', userId)
      .order('is_primary', { ascending: false });

    if (facilitiesError) {
      console.error('Error loading facilities:', facilitiesError);
    }

    const corporateInfo = corporateData ? {
      corporateName: corporateData.corporate_name || '',
      legalEntityName: corporateData.legal_entity_name || '',
      taxId: corporateData.tax_id || '',
      organizationType: corporateData.organization_type || 'single',
      primaryContactName: corporateData.primary_contact_name || '',
      primaryContactTitle: corporateData.primary_contact_title || '',
      primaryContactEmail: corporateData.primary_contact_email || '',
      primaryContactPhone: corporateData.primary_contact_phone || '',
      billingAddress: corporateData.billing_address || '',
      billingCity: corporateData.billing_city || '',
      billingState: corporateData.billing_state || '',
      billingZip: corporateData.billing_zip || '',
      signingAuthority: corporateData.signing_authority || ''
    } : {
      corporateName: '',
      legalEntityName: '',
      taxId: '',
      organizationType: 'single',
      primaryContactName: '',
      primaryContactTitle: '',
      primaryContactEmail: '',
      primaryContactPhone: '',
      billingAddress: '',
      billingCity: '',
      billingState: '',
      billingZip: '',
      signingAuthority: ''
    };

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

    const hasData = !!(corporateData || (facilitiesData && facilitiesData.length > 0));
    
    console.log('✅ Loaded facility data:', { 
      hasCorporateInfo: !!corporateData, 
      facilitiesCount: facilities.length,
      hasData 
    });

    return { corporateInfo, facilities, hasData };

  } catch (error) {
    console.error('💥 Error loading facility selection:', error);
    return { 
      corporateInfo: {
        corporateName: '',
        legalEntityName: '',
        taxId: '',
        organizationType: 'single',
        primaryContactName: '',
        primaryContactTitle: '',
        primaryContactEmail: '',
        primaryContactPhone: '',
        billingAddress: '',
        billingCity: '',
        billingState: '',
        billingZip: '',
        signingAuthority: ''
      }, 
      facilities: [],
      hasData: false
    };
  }
}

/**
 * Check if user has completed facility setup
 */
export async function checkFacilitySetupStatus(userId) {
  try {
    const { corporateInfo, facilities } = await loadFacilitySelection(userId);
    
    const hasCorporateInfo = corporateInfo.corporateName && 
                           corporateInfo.corporateName !== '' && 
                           corporateInfo.corporateName !== 'Pending Facility Selection';
    
    const hasFacilities = facilities && facilities.length > 0;
    
    const isComplete = hasCorporateInfo && hasFacilities;
    
    return {
      isComplete,
      hasCorporateInfo,
      hasFacilities,
      facilitiesCount: facilities.length,
      progress: isComplete ? 75 : 0
    };
  } catch (error) {
    console.error('Error checking facility setup status:', error);
    return {
      isComplete: false,
      hasCorporateInfo: false,
      hasFacilities: false,
      facilitiesCount: 0,
      progress: 0
    };
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
    corporateInfo[field] && 
    corporateInfo[field].trim() !== '' && 
    corporateInfo[field] !== 'Pending Facility Selection'
  );
}