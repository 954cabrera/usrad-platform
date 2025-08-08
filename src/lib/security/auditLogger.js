// src/lib/security/auditLogger.js
import { supabase } from '../supabase';

export async function logActivity(action, details, resourceType = null, resourceId = null) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Get provider ID
    const { data: provider } = await supabase
      .from('providers')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!provider) return;

    // Log the activity
    const { error } = await supabase
      .from('provider_activity_logs')
      .insert({
        provider_id: provider.id,
        action,
        resource: resourceType,
        resource_id: resourceId,
        details,
        ip_address: window.location.hostname, // In production, get from request
        user_agent: navigator.userAgent
      });

    if (error) console.error('Audit log error:', error);
  } catch (err) {
    console.error('Audit logging failed:', err);
  }
}