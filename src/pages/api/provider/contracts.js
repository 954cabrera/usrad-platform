// src/pages/api/provider/contracts.js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

// GET: Retrieve contracts for a provider
export async function GET({ url }) {
  const searchParams = new URLSearchParams(url.search);
  const centerId = searchParams.get('center_id');
  
  if (!centerId) {
    return new Response(JSON.stringify({ 
      error: 'Missing required parameter: center_id'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const { data, error } = await supabase
      .from('provider_contracts')
      .select('*')
      .eq('center_id', centerId)
      .order('effective_date', { ascending: false });
      
    if (error) throw error;
    
    // Also get the legacy contract data from imaging_centers
    const { data: centerData, error: centerError } = await supabase
      .from('imaging_centers')
      .select('contract_pricing_model, contract_medicare_percentage, contract_effective_date')
      .eq('id', centerId)
      .single();
      
    let legacyContract = null;
    if (!centerError && centerData && centerData.contract_medicare_percentage) {
      legacyContract = {
        id: 'legacy',
        center_id: centerId,
        cpt_code: null,
        pricing_model: centerData.contract_pricing_model || 'medicare_percentage',
        medicare_percentage: centerData.contract_medicare_percentage,
        fixed_rate: null,
        effective_date: centerData.contract_effective_date || new Date().toISOString(),
        expiration_date: null,
        created_at: null,
        updated_at: null,
        is_legacy: true
      };
    }
    
    return new Response(JSON.stringify({
      contracts: data || [],
      legacy_contract: legacyContract,
      count: (data?.length || 0) + (legacyContract ? 1 : 0)
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// POST: Create a new contract
export async function POST({ request }) {
  try {
    const body = await request.json();
    const { center_id, cpt_code, pricing_model, medicare_percentage, fixed_rate, effective_date } = body;
    
    // Validate required fields
    if (!center_id || !pricing_model || !effective_date) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields: center_id, pricing_model, effective_date'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Validate pricing model
    if (pricing_model === 'medicare_percentage' && !medicare_percentage) {
      return new Response(JSON.stringify({ 
        error: 'Medicare percentage is required for medicare_percentage pricing model'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (pricing_model === 'fixed_rate' && !fixed_rate) {
      return new Response(JSON.stringify({ 
        error: 'Fixed rate is required for fixed_rate pricing model'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Create the contract
    const { data, error } = await supabase
      .from('provider_contracts')
      .insert({
        center_id,
        cpt_code: cpt_code || null, // null means default contract
        pricing_model,
        medicare_percentage: pricing_model === 'medicare_percentage' ? medicare_percentage : null,
        fixed_rate: pricing_model === 'fixed_rate' ? fixed_rate : null,
        effective_date,
        expiration_date: null // No expiration by default
      })
      .select();
      
    if (error) throw error;
    
    return new Response(JSON.stringify({
      success: true,
      contract: data[0]
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// PATCH: Update an existing contract
export async function PATCH({ request }) {
  try {
    const body = await request.json();
    const { id, pricing_model, medicare_percentage, fixed_rate, expiration_date } = body;
    
    if (!id) {
      return new Response(JSON.stringify({ 
        error: 'Missing required field: id'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Build update object
    const updates = {};
    
    if (pricing_model) {
      updates.pricing_model = pricing_model;
      
      if (pricing_model === 'medicare_percentage') {
        if (!medicare_percentage) {
          return new Response(JSON.stringify({ 
            error: 'Medicare percentage is required for medicare_percentage pricing model'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        updates.medicare_percentage = medicare_percentage;
        updates.fixed_rate = null;
      } else if (pricing_model === 'fixed_rate') {
        if (!fixed_rate) {
          return new Response(JSON.stringify({ 
            error: 'Fixed rate is required for fixed_rate pricing model'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        updates.fixed_rate = fixed_rate;
        updates.medicare_percentage = null;
      }
    } else {
      // If pricing model isn't changing, update the relevant field
      if (medicare_percentage !== undefined) {
        updates.medicare_percentage = medicare_percentage;
      }
      
      if (fixed_rate !== undefined) {
        updates.fixed_rate = fixed_rate;
      }
    }
    
    if (expiration_date !== undefined) {
      updates.expiration_date = expiration_date;
    }
    
    updates.updated_at = new Date().toISOString();
    
    // Update the contract
    const { data, error } = await supabase
      .from('provider_contracts')
      .update(updates)
      .eq('id', id)
      .select();
      
    if (error) throw error;
    
    return new Response(JSON.stringify({
      success: true,
      contract: data[0]
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// DELETE: Expire a contract (soft delete)
export async function DELETE({ url }) {
  const searchParams = new URLSearchParams(url.search);
  const id = searchParams.get('id');
  
  if (!id) {
    return new Response(JSON.stringify({ 
      error: 'Missing required parameter: id'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    // Soft delete by setting expiration date to today
    const { data, error } = await supabase
      .from('provider_contracts')
      .update({
        expiration_date: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();
      
    if (error) throw error;
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Contract expired successfully',
      contract: data[0]
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
