// src/pages/api/medicare/batch-price.js

import { calculatePricing, withRetry } from '../../../utils/medicare-pricing';

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { items } = body;
    
    if (!items || !Array.isArray(items)) {
      return new Response(JSON.stringify({ 
        error: 'Invalid request format. Expected array of items with zip and cpt.'
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Process each item with a timeout
    const results = await Promise.all(
      items.map(async (item) => {
        try {
          // Validate item format
          if (!item.zip || !item.cpt) {
            return {
              cpt_code: item.cpt || 'missing',
              zip_code: item.zip || 'missing',
              error: 'Missing required fields: zip and cpt'
            };
          }
          
          // Process with timeout protection
          const pricing = await Promise.race([
            withRetry(() => calculatePricing(item.cpt, item.zip, item.center_id)),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Calculation timeout')), 5000)
            )
          ]);
          
          return pricing;
        } catch (error) {
          return {
            cpt_code: item.cpt || 'unknown',
            zip_code: item.zip || 'unknown',
            center_id: item.center_id,
            error: error.message
          };
        }
      })
    );
    
    return new Response(JSON.stringify({
      results,
      count: results.length,
      timestamp: new Date().toISOString()
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
