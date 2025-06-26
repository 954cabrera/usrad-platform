// src/pages/api/booking/patient-bookings.js
// Retrieves patient's booking history and status

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY
);

export async function GET({ url }) {
  try {
    const params = new URL(url).searchParams;
    const patientEmail = params.get('email');
    const patientId = params.get('patientId');
    
    if (!patientEmail && !patientId) {
      return new Response(JSON.stringify({ error: 'Patient email or ID required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get patient's appointments
    let query = supabase
      .from('appointment_requests')
      .select(`
        *,
        patients(*),
        imaging_centers(*),
        imaging_procedures(*),
        appointment_vouchers(*),
        payments(*)
      `)
      .order('created_at', { ascending: false });

    if (patientEmail) {
      query = query.eq('patients.email', patientEmail);
    } else {
      query = query.eq('patient_id', patientId);
    }

    const { data: appointments, error } = await query;

    if (error) {
      return new Response(JSON.stringify({ error: 'Failed to retrieve appointments' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Format response data
    const formattedAppointments = appointments.map(apt => ({
      bookingId: apt.booking_id,
      status: apt.booking_status,
      procedure: apt.procedure_name,
      center: apt.imaging_centers?.name,
      centerAddress: apt.imaging_centers?.address,
      centerPhone: apt.imaging_centers?.phone,
      scheduledDateTime: apt.scheduled_datetime,
      requestedDate: apt.preferred_date_1,
      amountPaid: apt.payment_amount,
      voucherCode: apt.appointment_vouchers?.[0]?.voucher_code,
      providerResponse: apt.provider_response,
      providerNotes: apt.provider_notes,
      createdAt: apt.created_at,
      updatedAt: apt.updated_at
    }));

    return new Response(JSON.stringify({
      success: true,
      appointments: formattedAppointments,
      totalBookings: formattedAppointments.length
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Patient bookings retrieval error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}