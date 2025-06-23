// src/pages/api/slots/update-pricing.js
import { createClient } from '@supabase/supabase-js';

export async function POST({ request }) {
  const supabaseUrl = import.meta.env.SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL;
  const supabaseKey = import.meta.env.SUPABASE_ANON_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    const body = await request.json();
    const { slotId, cptCode, facilityId } = body;

    if (!slotId || !cptCode) {
      return new Response(JSON.stringify({ error: 'slotId and cptCode are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get pricing for the facility
    const { data: pricing, error: pricingError } = await supabase
      .rpc('calculate_facility_pricing', {
        p_facility_id: facilityId,
        p_cpt_code: cptCode
      });

    if (pricingError || !pricing || pricing.length === 0) {
      return new Response(JSON.stringify({ 
        error: 'Failed to calculate pricing',
        details: pricingError?.message 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const p = pricing[0];

    // Update appointment slot with Medicare pricing
    const { data: updatedSlot, error: updateError } = await supabase
      .from('appointment_slots')
      .update({
        base_price: p.medicare_rate,
        current_price: p.patient_total,
        updated_at: new Date().toISOString()
      })
      .eq('id', slotId)
      .select()
      .single();

    if (updateError) {
      return new Response(JSON.stringify({ 
        error: 'Failed to update slot',
        details: updateError.message 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      slot: {
        id: updatedSlot.id,
        datetime: updatedSlot.slot_datetime,
        pricing: {
          medicare_rate: parseFloat(p.medicare_rate),
          patient_total: parseFloat(p.patient_total),
          hospital_estimate: parseFloat(p.hospital_estimate),
          patient_savings: parseFloat(p.patient_savings)
        }
      },
      updated_at: updatedSlot.updated_at
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'Internal server error', 
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}