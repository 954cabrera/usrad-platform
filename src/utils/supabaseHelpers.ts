// Utility functions for consistent Supabase queries
// Helps prevent 406 Not Acceptable errors by ensuring proper query formatting

import { supabase } from '@/lib/supabase';

// Safe query wrapper that ensures proper headers and error handling
export async function safeSupabaseQuery<T>(
  queryFn: () => Promise<any>
): Promise<{ data: T | null; error: Error | null }> {
  try {
    const result = await queryFn();
    
    // Check for 406 errors
    if (result.error?.message?.includes('406') || result.error?.code === '406') {
      console.error('❌ 406 Not Acceptable Error detected');
      console.error('This usually means:');
      console.error('1. The Accept header is missing or incorrect');
      console.error('2. Using raw fetch() instead of Supabase client');
      console.error('3. The query expects a single result but multiple were returned');
      
      return {
        data: null,
        error: new Error('Database query failed. Please ensure you are using the Supabase client correctly.')
      };
    }
    
    return result;
  } catch (error) {
    console.error('Unexpected error in Supabase query:', error);
    return {
      data: null,
      error: error as Error
    };
  }
}

// Load user profile with proper error handling
export async function loadUserProfile(userId: string | number) {
  return safeSupabaseQuery(async () => {
    const result = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (result.data) {
      console.log('✅ User profile loaded successfully');
    }
    
    return result;
  });
}

// Load organization/corporate data with proper error handling
export async function loadOrganizationData(userId: string | number) {
  return safeSupabaseQuery(async () => {
    const result = await supabase
      .from('corporate_entities')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle(); // Use maybeSingle() as organization might not exist yet
      
    if (result.data) {
      console.log('✅ Organization data loaded successfully');
    } else {
      console.log('ℹ️ No organization data found for user');
    }
    
    return result;
  });
}

// Load facilities with proper error handling
export async function loadFacilitiesData(userId: string | number) {
  return safeSupabaseQuery(async () => {
    const result = await supabase
      .from('user_facilities')
      .select('*')
      .eq('user_id', userId)
      .order('is_primary', { ascending: false });
      
    console.log(`✅ Loaded ${result.data?.length || 0} facilities`);
    
    return result;
  });
}

// Load complete user data (profile + organization + facilities)
export async function loadCompleteUserData(userId: string | number) {
  try {
    const [profileResult, orgResult, facilitiesResult] = await Promise.all([
      loadUserProfile(userId),
      loadOrganizationData(userId),
      loadFacilitiesData(userId)
    ]);
    
    // Check for any errors
    const errors = [
      profileResult.error,
      orgResult.error,
      facilitiesResult.error
    ].filter(Boolean);
    
    if (errors.length > 0) {
      console.error('Errors loading user data:', errors);
      return {
        success: false,
        errors,
        data: null
      };
    }
    
    return {
      success: true,
      errors: [],
      data: {
        profile: profileResult.data,
        organization: orgResult.data,
        facilities: facilitiesResult.data || []
      }
    };
  } catch (error) {
    console.error('Critical error loading complete user data:', error);
    return {
      success: false,
      errors: [error],
      data: null
    };
  }
}

// Helper to check if we should use raw fetch (NOT RECOMMENDED)
export function shouldUseRawFetch(): boolean {
  console.warn('⚠️ Using raw fetch() with Supabase is NOT recommended!');
  console.warn('Always use the Supabase client to avoid 406 errors');
  return false;
}

// If you MUST use raw fetch, ensure proper headers
export function getSupabaseHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'apikey': import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${import.meta.env.PUBLIC_SUPABASE_ANON_KEY}`
  };
}