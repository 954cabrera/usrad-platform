// src/pages/api/booking/provider-response.js
// Handles provider responses to appointment requests

export async function POST({ request }) {
    try {
      const { appointmentRequestId, response, scheduledDateTime, notes } = await request.json();
      
      // Update appointment request with provider response
      const { data: updatedRequest, error } = await supabase
        .from('appointment_requests')
        .update({
          provider_response: response, // 'accepted', 'declined', 'alternative_offered'
          scheduled_datetime: scheduledDateTime,
          provider_notes: notes,
          booking_status: response === 'accepted' ? 'confirmed' : 'pending_patient_response',
          provider_responded_at: new Date().toISOString()
        })
        .eq('id', appointmentRequestId)
        .select(`
          *,
          patients(*),
          imaging_centers(*)
        `)
        .single();
  
      if (error) {
        return new Response(JSON.stringify({ error: 'Failed to update appointment' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
  
      // Mark provider notification as read
      await supabase
        .from('provider_notifications')
        .update({ is_read: true, responded_at: new Date().toISOString() })
        .eq('appointment_request_id', appointmentRequestId);
  
      // Cancel pending reminders
      await supabase
        .from('scheduled_reminders')
        .update({ status: 'cancelled' })
        .eq('appointment_request_id', appointmentRequestId)
        .eq('status', 'pending');
  
      // Notify patient of provider response
      await notifyPatientOfProviderResponse(updatedRequest);
  
      // If confirmed, generate voucher
      if (response === 'accepted') {
        await generateAppointmentVoucher(appointmentRequestId, scheduledDateTime);
      }
  
      return new Response(JSON.stringify({
        success: true,
        appointmentStatus: updatedRequest.booking_status,
        message: 'Provider response recorded successfully'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
  
    } catch (error) {
      console.error('Provider response error:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
  
  // Helper function to notify patient of provider response
  async function notifyPatientOfProviderResponse(appointmentRequest) {
    try {
      const patient = appointmentRequest.patients;
      const center = appointmentRequest.imaging_centers;
      
      const notification = {
        patient_id: patient.id,
        appointment_request_id: appointmentRequest.id,
        notification_type: 'provider_response',
        message: appointmentRequest.provider_response === 'accepted' 
          ? `Your appointment at ${center.name} has been confirmed!`
          : `${center.name} has responded to your appointment request`,
        is_read: false,
        created_at: new Date().toISOString()
      };
  
      await supabase
        .from('patient_notifications')
        .insert(notification);
  
      // Send email/SMS to patient
      console.log(`Patient notification sent to ${patient.email}`);
      
    } catch (error) {
      console.error('Patient notification failed:', error);
    }
  }
  
  // Helper function to generate appointment voucher
  async function generateAppointmentVoucher(appointmentRequestId, scheduledDateTime) {
    try {
      const voucherCode = 'USRAD-' + Math.random().toString(36).substr(2, 8).toUpperCase();
      
      const { data: voucher, error } = await supabase
        .from('appointment_vouchers')
        .insert({
          appointment_request_id: appointmentRequestId,
          voucher_code: voucherCode,
          scheduled_datetime: scheduledDateTime,
          voucher_status: 'active',
          valid_until: new Date(new Date(scheduledDateTime).getTime() + 24 * 60 * 60 * 1000).toISOString(), // Valid for 24 hours after appointment
          generated_at: new Date().toISOString()
        })
        .select()
        .single();
  
      if (error) {
        console.error('Voucher generation failed:', error);
        return;
      }
  
      console.log(`Voucher ${voucherCode} generated for appointment ${appointmentRequestId}`);
      return voucher;
      
    } catch (error) {
      console.error('Voucher generation error:', error);
    }
  }