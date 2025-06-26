// src/pages/api/booking/create-request.js
// Creates a new appointment booking request

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export async function POST({ request }) {
  try {
    const bookingData = await request.json();
    
    // Generate unique booking ID
    const bookingId = 'USR-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Insert patient information
    const { data: patient, error: patientError } = await supabase
      .from('patients')
      .upsert({
        email: bookingData.patient.email,
        first_name: bookingData.patient.firstName,
        last_name: bookingData.patient.lastName,
        phone: bookingData.patient.phone,
        date_of_birth: bookingData.patient.dateOfBirth,
        address: bookingData.patient.address,
        city: bookingData.patient.city,
        state: bookingData.patient.state,
        zip_code: bookingData.patient.zipCode,
        emergency_contact: bookingData.patient.emergencyContact,
        emergency_phone: bookingData.patient.emergencyPhone,
        updated_at: new Date().toISOString()
      }, { 
        onConflict: 'email',
        returning: 'representation' 
      })
      .select()
      .single();

    if (patientError) {
      console.error('Patient creation error:', patientError);
      return new Response(JSON.stringify({ error: 'Failed to create patient record' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create appointment request
    const { data: appointmentRequest, error: requestError } = await supabase
      .from('appointment_requests')
      .insert({
        booking_id: bookingId,
        patient_id: patient.id,
        center_id: bookingData.centerId,
        cpt_code: bookingData.cptCode,
        procedure_name: bookingData.procedureName,
        preferred_date_1: bookingData.appointment.preferredDate1,
        preferred_time_1: bookingData.appointment.preferredTime1,
        preferred_date_2: bookingData.appointment.preferredDate2 || null,
        preferred_time_2: bookingData.appointment.preferredTime2 || null,
        preferred_date_3: bookingData.appointment.preferredDate3 || null,
        preferred_time_3: bookingData.appointment.preferredTime3 || null,
        special_requests: bookingData.appointment.specialRequests,
        has_symptoms: bookingData.appointment.hasSymptoms || false,
        symptom_description: bookingData.appointment.symptomDescription,
        prescription_status: bookingData.prescription ? 'uploaded' : 'pending',
        payment_amount: bookingData.paymentAmount,
        payment_status: 'paid',
        booking_status: 'pending_provider_response',
        provider_response_deadline: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (requestError) {
      console.error('Appointment request creation error:', requestError);
      return new Response(JSON.stringify({ error: 'Failed to create appointment request' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Handle prescription upload if provided
    if (bookingData.prescription) {
      // In a real implementation, you'd upload the file to Supabase Storage
      // and store the file path in the database
      const { data: prescriptionRecord, error: prescriptionError } = await supabase
        .from('prescription_uploads')
        .insert({
          appointment_request_id: appointmentRequest.id,
          file_name: bookingData.prescription.fileName,
          file_size: bookingData.prescription.fileSize,
          upload_status: 'uploaded',
          uploaded_at: new Date().toISOString()
        });

      if (prescriptionError) {
        console.warn('Prescription upload record failed:', prescriptionError);
      }
    }

    // Create payment record
    const { data: paymentRecord, error: paymentError } = await supabase
      .from('payments')
      .insert({
        appointment_request_id: appointmentRequest.id,
        amount: bookingData.paymentAmount,
        payment_method: bookingData.payment.method,
        payment_status: 'completed',
        stripe_payment_intent_id: bookingData.paymentIntentId || null,
        processed_at: new Date().toISOString()
      });

    if (paymentError) {
      console.warn('Payment record creation failed:', paymentError);
    }

    // Notify provider about new appointment request
    await notifyProvider(appointmentRequest.id, bookingData.centerId);

    // Send confirmation email to patient
    await sendPatientConfirmation(patient.email, appointmentRequest);

    // Set escalation reminders
    await scheduleProviderReminders(appointmentRequest.id);

    return new Response(JSON.stringify({
      success: true,
      bookingId: bookingId,
      appointmentRequestId: appointmentRequest.id,
      estimatedConfirmationTime: '4 hours',
      message: 'Booking request submitted successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Booking creation error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error', 
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Helper function to notify provider
async function notifyProvider(appointmentRequestId, centerId) {
  try {
    // Get center details
    const { data: center } = await supabase
      .from('imaging_centers')
      .select('*')
      .eq('id', centerId)
      .single();

    // Get appointment details
    const { data: appointment } = await supabase
      .from('appointment_requests')
      .select(`
        *,
        patients(*),
        imaging_procedures(*)
      `)
      .eq('id', appointmentRequestId)
      .single();

    // Create provider notification
    await supabase
      .from('provider_notifications')
      .insert({
        center_id: centerId,
        appointment_request_id: appointmentRequestId,
        notification_type: 'new_appointment',
        message: `New appointment request for ${appointment.patients.first_name} ${appointment.patients.last_name}`,
        is_read: false,
        response_deadline: appointment.provider_response_deadline,
        created_at: new Date().toISOString()
      });

    // In production: Send email/SMS to provider
    // await sendProviderEmail(center.contact_email, appointment);
    // await sendProviderSMS(center.contact_phone, appointment);
    
    console.log(`Provider notification sent for appointment ${appointmentRequestId}`);
  } catch (error) {
    console.error('Provider notification failed:', error);
  }
}

// Helper function to send patient confirmation
async function sendPatientConfirmation(email, appointmentRequest) {
  try {
    // In production: Use your email service (SendGrid, etc.)
    console.log(`Confirmation email would be sent to ${email} for booking ${appointmentRequest.booking_id}`);
    
    // Create email log
    await supabase
      .from('email_logs')
      .insert({
        recipient_email: email,
        email_type: 'booking_confirmation',
        appointment_request_id: appointmentRequest.id,
        sent_at: new Date().toISOString(),
        status: 'sent'
      });
  } catch (error) {
    console.error('Patient confirmation email failed:', error);
  }
}

// Helper function to schedule provider reminders
async function scheduleProviderReminders(appointmentRequestId) {
  try {
    const now = new Date();
    const reminders = [
      { time: new Date(now.getTime() + 2 * 60 * 60 * 1000), type: '2_hour_reminder' }, // 2 hours
      { time: new Date(now.getTime() + 3.5 * 60 * 60 * 1000), type: '30_min_warning' }, // 3.5 hours
      { time: new Date(now.getTime() + 4 * 60 * 60 * 1000), type: 'escalation' } // 4 hours
    ];

    for (const reminder of reminders) {
      await supabase
        .from('scheduled_reminders')
        .insert({
          appointment_request_id: appointmentRequestId,
          reminder_type: reminder.type,
          scheduled_for: reminder.time.toISOString(),
          status: 'pending'
        });
    }
  } catch (error) {
    console.error('Reminder scheduling failed:', error);
  }
}
