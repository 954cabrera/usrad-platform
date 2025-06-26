// src/pages/api/admin/customer-service.js
// Customer service dashboard for monitoring bookings

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY
);

export async function GET({ url }) {
  try {
    const params = new URL(url).searchParams;
    const status = params.get('status') || 'all';
    const timeframe = params.get('timeframe') || '24h';
    
    // Calculate time range
    const now = new Date();
    let startTime;
    switch (timeframe) {
      case '1h':
        startTime = new Date(now.getTime() - 60 * 60 * 1000);
        break;
      case '4h':
        startTime = new Date(now.getTime() - 4 * 60 * 60 * 1000);
        break;
      case '24h':
        startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      default:
        startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }

    // Base query
    let query = supabase
      .from('appointment_requests')
      .select(`
        *,
        patients(*),
        imaging_centers(*),
        imaging_procedures(*),
        provider_notifications(*),
        scheduled_reminders(*)
      `)
      .gte('created_at', startTime.toISOString())
      .order('created_at', { ascending: false });

    // Filter by status if specified
    if (status !== 'all') {
      query = query.eq('booking_status', status);
    }

    const { data: appointments, error } = await query;

    if (error) {
      return new Response(JSON.stringify({ error: 'Failed to retrieve appointments' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Calculate metrics
    const metrics = {
      total_requests: appointments.length,
      pending_provider_response: appointments.filter(a => a.booking_status === 'pending_provider_response').length,
      overdue_responses: appointments.filter(a => 
        a.booking_status === 'pending_provider_response' && 
        new Date(a.provider_response_deadline) < now
      ).length,
      confirmed_appointments: appointments.filter(a => a.booking_status === 'confirmed').length,
      total_revenue: appointments
        .filter(a => a.payment_status === 'paid')
        .reduce((sum, a) => sum + parseFloat(a.payment_amount || 0), 0),
      average_response_time: calculateAverageResponseTime(appointments),
      provider_response_rate: calculateProviderResponseRate(appointments)
    };

    // Get appointments requiring attention
    const requiresAttention = appointments.filter(apt => {
      const deadline = new Date(apt.provider_response_deadline);
      const timeDiff = deadline.getTime() - now.getTime();
      const hoursUntilDeadline = timeDiff / (1000 * 60 * 60);
      
      return (
        apt.booking_status === 'pending_provider_response' && 
        (hoursUntilDeadline < 0.5 || hoursUntilDeadline < 0) // Less than 30 minutes or overdue
      );
    });

    return new Response(JSON.stringify({
      success: true,
      metrics,
      appointments: appointments.map(formatAppointmentForCS),
      requiresAttention: requiresAttention.map(formatAppointmentForCS),
      timeframe,
      generatedAt: now.toISOString()
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Customer service dashboard error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Helper functions
function calculateAverageResponseTime(appointments) {
  const respondedAppointments = appointments.filter(a => a.provider_responded_at);
  if (respondedAppointments.length === 0) return null;
  
  const totalResponseTime = respondedAppointments.reduce((sum, apt) => {
    const created = new Date(apt.created_at);
    const responded = new Date(apt.provider_responded_at);
    return sum + (responded.getTime() - created.getTime());
  }, 0);
  
  const averageMs = totalResponseTime / respondedAppointments.length;
  const averageHours = averageMs / (1000 * 60 * 60);
  return Math.round(averageHours * 10) / 10; // Round to 1 decimal place
}

function calculateProviderResponseRate(appointments) {
  const totalRequests = appointments.length;
  const respondedRequests = appointments.filter(a => a.provider_responded_at).length;
  return totalRequests > 0 ? Math.round((respondedRequests / totalRequests) * 100) : 0;
}

function formatAppointmentForCS(apt) {
  const now = new Date();
  const deadline = new Date(apt.provider_response_deadline);
  const timeUntilDeadline = deadline.getTime() - now.getTime();
  const hoursUntilDeadline = timeUntilDeadline / (1000 * 60 * 60);
  
  return {
    id: apt.id,
    bookingId: apt.booking_id,
    patientName: `${apt.patients.first_name} ${apt.patients.last_name}`,
    patientEmail: apt.patients.email,
    patientPhone: apt.patients.phone,
    centerName: apt.imaging_centers.name,
    procedure: apt.procedure_name,
    requestedDate: apt.preferred_date_1,
    status: apt.booking_status,
    paymentAmount: apt.payment_amount,
    paymentStatus: apt.payment_status,
    providerResponse: apt.provider_response,
    providerNotes: apt.provider_notes,
    responseDeadline: apt.provider_response_deadline,
    hoursUntilDeadline: Math.round(hoursUntilDeadline * 10) / 10,
    isOverdue: hoursUntilDeadline < 0,
    requiresAttention: hoursUntilDeadline < 0.5,
    createdAt: apt.created_at,
    respondedAt: apt.provider_responded_at
  };
}