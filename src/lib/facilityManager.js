// Enhanced facilityManager.js with real ACR database integration
import { supabase } from './supabase.js';

// State name to abbreviation mapping
const stateMapping = {
  'alabama': 'AL', 'alaska': 'AK', 'arizona': 'AZ', 'arkansas': 'AR', 'california': 'CA',
  'colorado': 'CO', 'connecticut': 'CT', 'delaware': 'DE', 'florida': 'FL', 'georgia': 'GA',
  'hawaii': 'HI', 'idaho': 'ID', 'illinois': 'IL', 'indiana': 'IN', 'iowa': 'IA',
  'kansas': 'KS', 'kentucky': 'KY', 'louisiana': 'LA', 'maine': 'ME', 'maryland': 'MD',
  'massachusetts': 'MA', 'michigan': 'MI', 'minnesota': 'MN', 'mississippi': 'MS', 'missouri': 'MO',
  'montana': 'MT', 'nebraska': 'NE', 'nevada': 'NV', 'new hampshire': 'NH', 'new jersey': 'NJ',
  'new mexico': 'NM', 'new york': 'NY', 'north carolina': 'NC', 'north dakota': 'ND', 'ohio': 'OH',
  'oklahoma': 'OK', 'oregon': 'OR', 'pennsylvania': 'PA', 'rhode island': 'RI', 'south carolina': 'SC',
  'south dakota': 'SD', 'tennessee': 'TN', 'texas': 'TX', 'utah': 'UT', 'vermont': 'VT',
  'virginia': 'VA', 'washington': 'WA', 'west virginia': 'WV', 'wisconsin': 'WI', 'wyoming': 'WY'
};

// Get current user with complete profile data
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      console.error('Auth error:', error);
      return null;
    }

    // Get complete user profile including facility progress
    const { data: profileData, error: profileError } = await supabase
      .rpc('get_user_complete_profile', { p_user_id: user.id });

    if (profileError) {
      console.error('Profile error:', profileError);
      return user; // Return basic user if profile fetch fails
    }

    const profile = profileData[0];
    return {
      ...user,
      profile: profile?.user_info || {},
      corporateInfo: profile?.corporate_info || {},
      facilities: profile?.facilities || [],
      facilityProgress: profile?.progress_info || {
        status: 'not_started',
        nextStep: 'org_type',
        lastSaved: null,
        completionPercentage: 0,
        data: {}
      }
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Enhanced facility configuration loading
export const loadFacilityConfiguration = async (userId) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    const hasExistingData = user.corporateInfo || user.facilities?.length > 0;

    return {
      success: true,
      hasExistingData,
      corporateInfo: user.corporateInfo,
      facilities: user.facilities,
      userProfile: user.profile,
      facilityProgress: user.facilityProgress
    };
  } catch (error) {
    console.error('Error loading facility configuration:', error);
    return { success: false, error: error.message };
  }
};

// Enhanced save facility configuration with proper error handling
export const saveFacilityConfiguration = async (userId, corporateInfo, facilities) => {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error('Authentication required');
    }

    // Start transaction-like approach
    const errors = [];

    // 1. Save/update corporate information
    const corporateData = {
      user_id: user.id,
      legal_name: corporateInfo.legalName,
      legal_name: corporateInfo.legalEntityName || corporateInfo.legalName,
      tax_id: corporateInfo.taxId,
      signer_name: corporateInfo.signerName,
      signer_title: corporateInfo.signerTitle || 'Owner',
      email: corporateInfo.email,
      phone: corporateInfo.phone,
      corporate_address: corporateInfo.corporateAddress || '',
      corporate_city: corporateInfo.corporateCity || '',
      corporate_state: corporateInfo.corporateState || '',
      corporate_zip: corporateInfo.corporateZip || '',
      website: corporateInfo.website || '',
      organization_type: corporateInfo.organizationType,
      updated_at: new Date().toISOString()
    };

    const { error: corporateError } = await supabase
      .from('corporate_entities')
      .upsert(corporateData, { 
        onConflict: 'user_id',
        ignoreDuplicates: false 
      });

    if (corporateError) {
      console.error('Corporate save error:', corporateError);
      errors.push(`Corporate info: ${corporateError.message}`);
    }

    // 2. Save/update user profile with center name
    const { error: profileError } = await supabase
      .from('user_profiles')
      .update({
        center_name: corporateInfo.legalName,
        phone: corporateInfo.phone,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (profileError) {
      console.error('Profile update error:', profileError);
      errors.push(`Profile: ${profileError.message}`);
    }

    // 3. Save facilities if any exist
    if (facilities && facilities.length > 0) {
      console.log('🔍 About to save facilities:', facilities);
      
      // Delete existing facilities for this user
      const { error: deleteError } = await supabase
        .from('user_facilities')
        .delete()
        .eq('user_id', user.id);

      if (deleteError) {
        console.error('Delete facilities error:', deleteError);
        errors.push(`Delete old facilities: ${deleteError.message}`);
      } else {
        // Insert new facilities with proper column mapping
        const facilitiesData = facilities.map(facility => {
          console.log('🔍 Processing facility for save:', facility);
          
          const facilityData = {
            user_id: user.id,
            acr_facility_id: facility.acrId || null,
            facility_name: facility.name,
            
            // ✅ Use the individual columns instead of concatenated address
            street_address: facility.address,
            city: facility.city,
            state: facility.state,
            zip_code: facility.zip,  // ✅ This preserves the zip code!
            
            // Phone mapping
            facility_phone: facility.phone || '',
            phone_number: facility.phone || '',
            
            // Other fields
            email: facility.email || '',
            website: facility.website || '',
            modalities: facility.modalities || [],
            modality: facility.modalities ? facility.modalities.join(', ') : '',
            equipment_brands: facility.equipmentBrands || [],
            primary_contact: facility.primaryContact || '',
            contact_title: facility.contactTitle || '',
            notes: facility.notes || '',
            
            // ACR verification flags
            acr_verified: facility.acrVerified || false,
            is_acr_verified: facility.acrVerified || false,
            
            // Flags
            is_manual_entry: facility.isManualEntry || false,
            is_primary: facility.isPrimary || false,
            is_edited: facility.isEdited || false,
            original_acr_data: facility.originalACRData || null,
            created_at: new Date().toISOString()
          };
          
          console.log('🔍 Mapped facility data:', facilityData);
          return facilityData;
        });

        const { error: facilitiesError } = await supabase
          .from('user_facilities')
          .insert(facilitiesData);

        if (facilitiesError) {
          console.error('Facilities save error:', facilitiesError);
          errors.push(`Facilities: ${facilitiesError.message}`);
        }
      }
    }

    // 4. Update facility progress
    const progressData = {
      corporateInfo,
      facilities,
      organizationType: corporateInfo.organizationType
    };

    const { error: progressError } = await supabase
      .rpc('update_facility_progress', {
        p_user_id: user.id,
        p_next_step: facilities?.length > 0 ? 'review_completion' : 'facilities',
        p_data: progressData,
        p_percentage: facilities?.length > 0 ? 85 : 60
      });

    if (progressError) {
      console.error('Progress update error:', progressError);
      errors.push(`Progress: ${progressError.message}`);
    }

    if (errors.length > 0) {
      return { 
        success: false, 
        error: errors.join('; '),
        partialSuccess: true 
      };
    }

    return { success: true };

  } catch (error) {
    console.error('Save facility configuration error:', error);
    return { success: false, error: error.message };
  }
};

// Enhanced auto-save with better error handling
export const autoSaveProgress = async (userId, nextStep, data, percentage) => {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return;

    await supabase.rpc('update_facility_progress', {
      p_user_id: user.id,
      p_next_step: nextStep,
      p_data: data,
      p_percentage: percentage
    });

  } catch (error) {
    console.error('Auto-save error:', error);
    // Don't throw errors for auto-save to avoid disrupting user experience
  }
};

// Fixed ACR database search function
export const searchAcrFacilities = async (searchTerm) => {
  try {
    console.log('🟡 searchAcrFacilities called with:', searchTerm);
    
    if (!searchTerm || searchTerm.length < 2) {
      console.log('❌ Search term too short:', searchTerm);
      return [];
    }

    console.log('🔍 Searching ACR facilities for:', searchTerm);

    const searchLower = searchTerm.toLowerCase().trim();
    
    // Check if search term might be a state name and convert to abbreviation
    const stateAbbr = stateMapping[searchLower];
    
    let query = supabase
      .from('facilities')
      .select('*')
      .eq('source', 'acr');

    // Build the OR conditions properly
    if (stateAbbr) {
      // State search - search by state abbreviation
      console.log(`🗺️ Detected state search: "${searchTerm}" → "${stateAbbr}"`);
      query = query.eq('state', stateAbbr);
    } else if (searchTerm.length === 2 && searchTerm.toUpperCase() === searchTerm) {
      // 2-letter uppercase might be state abbreviation
      console.log(`🏷️ 2-letter search, treating as state: ${searchTerm}`);
      query = query.eq('state', searchTerm.toUpperCase());
    } else {
      // General search across name, city, address, modality
      query = query.or(`name.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%,address.ilike.%${searchTerm}%,modality.ilike.%${searchTerm}%`);
    }

    const { data, error } = await query
      .order('name')
      .limit(50);

    if (error) {
      console.error('❌ ACR search error:', error);
      return [];
    }

    console.log(`✅ Raw database results count:`, data?.length || 0);
    console.log(`✅ Raw database results:`, data);

    // Transform the database results to match your expected format
    const transformedResults = data?.map(facility => ({
      id: facility.id,
      acrId: facility.id,
      name: facility.name,
      address: facility.address,
      city: facility.city,
      state: facility.state,
      zip: facility.zip_code,
      phone: facility.phone,
      email: '', 
      website: '', 
      modalities: [facility.modality], 
      equipmentBrands: [], 
      accredited: true, 
      acrVerified: true
    })) || [];

    console.log(`🔄 Transformed results count:`, transformedResults.length);

    return transformedResults;

  } catch (error) {
    console.error('❌ ACR search error:', error);
    return [];
  }
};

// Utility functions for formatting
export const formatPhoneNumber = (value) => {
  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;
  
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

export const formatEIN = (value) => {
  const ein = value.replace(/[^\d]/g, '');
  if (ein.length <= 2) return ein;
  return `${ein.slice(0, 2)}-${ein.slice(2, 9)}`;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};