// src/utils/supabaseService.js
export async function saveCorporateEntity(supabase, orgData) {
    return await supabase
      .from('corporate_entities')
      .upsert(orgData, { onConflict: 'user_id' });
  }
  