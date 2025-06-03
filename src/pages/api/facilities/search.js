// src/pages/api/facilities/search.js
// API endpoint for searching ACR facility database

import { Pool } from 'pg';

// For SSR mode - this endpoint will be called at runtime
export const prerender = false;

// Database connection pool
let pool;

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });
  }
  return pool;
}

export async function GET({ request }) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');
    const city = url.searchParams.get('city');
    const state = url.searchParams.get('state');
    const limit = url.searchParams.get('limit') || '20';

    // Validate input
    if (!query && !city) {
      return new Response(JSON.stringify({
        error: 'Search query or city is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const db = getPool();
    
    // Build dynamic search query
    let sqlQuery = `
      SELECT 
        id,
        name,
        address,
        city,
        state,
        zip_code,
        phone,
        email,
        legal_business_name,
        dba_name,
        equipment,
        services,
        years_in_operation,
        tier
      FROM imaging_centers 
      WHERE 1=1
    `;
    
    const params = [];
    let paramCount = 0;

    // Add search conditions
    if (query) {
      paramCount++;
      sqlQuery += ` AND (
        name ILIKE ${paramCount} OR 
        address ILIKE ${paramCount} OR
        city ILIKE ${paramCount} OR
        legal_business_name ILIKE ${paramCount} OR
        dba_name ILIKE ${paramCount}
      )`;
      params.push(`%${query}%`);
    }

    if (city) {
      paramCount++;
      sqlQuery += ` AND city ILIKE $${paramCount}`;
      params.push(`%${city}%`);
    }

    if (state) {
      paramCount++;
      sqlQuery += ` AND state = $${paramCount}`;
      params.push(state.toUpperCase());
    }

    // Add ordering and limit
    sqlQuery += ` 
      ORDER BY 
        CASE WHEN name ILIKE $1 THEN 1 ELSE 2 END,
        name ASC
      LIMIT ${paramCount + 1}
    `;
    params.push(parseInt(limit));

    console.log('Executing query:', sqlQuery);
    console.log('With params:', params);

    const result = await db.query(sqlQuery, params);

    // Format results
    const facilities = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      legalBusinessName: row.legal_business_name,
      dbaName: row.dba_name,
      address: `${row.address}, ${row.city}, ${row.state} ${row.zip_code}`,
      phone: row.phone,
      email: row.email,
      city: row.city,
      state: row.state,
      zip: row.zip_code,
      equipment: row.equipment,
      services: row.services,
      yearsInOperation: row.years_in_operation,
      tier: row.tier,
      accredited: true, // ACR database so all are accredited
      type: 'ACR Accredited Center'
    }));

    return new Response(JSON.stringify({
      success: true,
      count: facilities.length,
      facilities: facilities,
      query: {
        search: query,
        city: city,
        state: state,
        limit: limit
      }
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      }
    });

  } catch (error) {
    console.error('Database search error:', error);
    
    return new Response(JSON.stringify({
      error: 'Database search failed',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Optional: Add a POST endpoint for more complex searches
export async function POST({ request }) {
  try {
    const body = await request.json();
    const { 
      search, 
      filters = {}, 
      limit = 20,
      offset = 0 
    } = body;

    const db = getPool();
    
    // More complex search logic here
    let sqlQuery = `
      SELECT COUNT(*) OVER() as total_count,
        id,
        name,
        address,
        city,
        state,
        zip_code,
        phone,
        email,
        legal_business_name,
        dba_name,
        equipment,
        services,
        tier
      FROM imaging_centers 
      WHERE 1=1
    `;
    
    const params = [];
    let paramCount = 0;

    // Add search term
    if (search) {
      paramCount++;
      sqlQuery += ` AND (
        name ILIKE ${paramCount} OR 
        address ILIKE ${paramCount} OR
        city ILIKE ${paramCount} OR
        legal_business_name ILIKE ${paramCount} OR
        dba_name ILIKE ${paramCount}
      )`;
      params.push(`%${search}%`);
    }

    // Add filters
    if (filters.state) {
      paramCount++;
      sqlQuery += ` AND state = $${paramCount}`;
      params.push(filters.state.toUpperCase());
    }

    if (filters.accreditedOnly) {
      // All centers in this database are ACR accredited
      // This filter is redundant but kept for compatibility
    }

    if (filters.tier) {
      paramCount++;
      sqlQuery += ` AND tier = ${paramCount}`;
      params.push(filters.tier);
    }

    if (filters.hasEquipment) {
      sqlQuery += ` AND equipment IS NOT NULL AND equipment != ''`;
    }

    // Add pagination
    sqlQuery += ` ORDER BY name ASC`;
    paramCount++;
    sqlQuery += ` LIMIT $${paramCount}`;
    params.push(parseInt(limit));
    
    paramCount++;
    sqlQuery += ` OFFSET $${paramCount}`;
    params.push(parseInt(offset));

    const result = await db.query(sqlQuery, params);
    
    const totalCount = result.rows.length > 0 ? result.rows[0].total_count : 0;
    
    const facilities = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      legalBusinessName: row.legal_business_name,
      dbaName: row.dba_name,
      address: `${row.address}, ${row.city}, ${row.state} ${row.zip_code}`,
      phone: row.phone,
      email: row.email,
      city: row.city,
      state: row.state,
      zip: row.zip_code,
      equipment: row.equipment,
      services: row.services,
      tier: row.tier,
      accredited: true,
      type: 'ACR Accredited Center'
    }));

    return new Response(JSON.stringify({
      success: true,
      totalCount: parseInt(totalCount),
      count: facilities.length,
      facilities: facilities,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: (parseInt(offset) + facilities.length) < parseInt(totalCount)
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Advanced search error:', error);
    
    return new Response(JSON.stringify({
      error: 'Advanced search failed',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}