// src/pages/api/provider-consultation.js
import { Resend } from 'resend';

const REMIX_API_URL = import.meta.env.PUBLIC_REMIX_URL || 'https://app.usrad.com';
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST = async ({ request }) => {
  console.log('🏥 === Provider Consultation Request ===');
  
  try {
    const data = await request.json();
    console.log('Provider Name:', data.firstName, data.lastName);
    console.log('Organization:', data.organizationName);
    console.log('Center Count:', data.centerCount);
    console.log('Email:', data.email);

    // Validation
    if (!data.firstName || !data.lastName || !data.email || !data.position || !data.organizationName || !data.centerCount) {
      return new Response(
        JSON.stringify({ 
          error: 'Name, email, position, organization, and center count are required'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Determine if this is a VIP lead (10+ centers)
    const isVIP = ['10-20', '21-50', '50+'].includes(data.centerCount);
    console.log('Is VIP Lead (10+ centers):', isVIP);

    // Generate reference ID
    const referenceId = `PC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Format the primary interests array if it exists
    const primaryInterestsFormatted = Array.isArray(data.primaryInterest) 
      ? data.primaryInterest.join(', ')
      : data.primaryInterest || 'Not specified';

    // Save to Supabase
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY
);

    console.log('💾 Saving to database...');
    const { error: dbError } = await supabase
      .from('provider_consultations')
      .insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone || null,
        position: data.position || null,
        organization_name: data.organizationName,
        center_count: data.centerCount,
        monthly_volume: data.monthlyVolume || null,
        center_locations: data.centerLocations || null,
        primary_interest: Array.isArray(data.primaryInterest) 
          ? data.primaryInterest 
          : (data.primaryInterest ? [data.primaryInterest] : []),
        additional_questions: data.additionalQuestions || null,
        timeline: data.timeline || null,
        is_vip: isVIP,
        reference_id: referenceId,
        status: 'new',
        consultation_scheduled: false,
        submitted_at: new Date().toISOString()
      });

    if (dbError) {
      console.error('❌ Database error:', dbError);
      throw new Error('Failed to save to database');
    }

    console.log('✅ Saved to database with reference:', referenceId);

    // Send emails via Remix API (branded templates)
    // Converts centerCount string to number for VIP detection
    const centerCountNum = (() => {
      if (data.centerCount === '1') return 1;
      if (data.centerCount === '2-5') return 3;
      if (data.centerCount === '6-10') return 8;
      if (data.centerCount === '10-20') return 15;
      if (data.centerCount === '21-50') return 35;
      if (data.centerCount === '50+') return 60;
      return parseInt(data.centerCount) || 1;
    })();

    console.log('📧 Sending emails via Remix API...');
    try {
      const emailResponse = await fetch(`${REMIX_API_URL}/api/marketing-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'provider-consultation',
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            position: data.position,
            organizationName: data.organizationName,
            centerCount: centerCountNum,
            monthlyVolume: data.monthlyVolume,
            centerLocations: data.centerLocations,
            primaryInterest: primaryInterestsFormatted,
            additionalQuestions: data.additionalQuestions,
            timeline: data.timeline,
            referenceId,
          },
        }),
      });

      if (emailResponse.ok) {
        const result = await emailResponse.json();
        console.log('✅ Emails sent via Remix API');
        console.log('   Customer Email ID:', result.customerEmailId);
        console.log('   Admin Email ID:', result.adminEmailId);
      } else {
        console.error('❌ Remix API failed:', emailResponse.status);
        // Fallback to direct Resend (simple notification)
        await resend.emails.send({
          from: 'USRad Provider Network <providers@send.usrad.com>',
          to: import.meta.env.MCABRERA_EMAIL || 'mcabrera@usrad.com',
          subject: isVIP 
            ? `🎯 HIGH VALUE LEAD - ${data.centerCount} Centers - ${data.organizationName}`
            : `📋 New Provider Inquiry - ${data.centerCount} Centers - ${data.organizationName}`,
          html: `<div style="font-family: Arial, sans-serif;"><h2>${isVIP ? '🎯 VIP Provider Lead' : 'New Provider Inquiry'}</h2><p><strong>${data.firstName} ${data.lastName}</strong> from <strong>${data.organizationName}</strong></p><p>Centers: ${data.centerCount}</p><p>Email: ${data.email}</p><p>Phone: ${data.phone || 'Not provided'}</p></div>`
        });
        console.log('✅ Fallback admin email sent');
      }
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      // Fallback to direct Resend
      try {
        await resend.emails.send({
          from: 'USRad Provider Network <providers@send.usrad.com>',
          to: import.meta.env.MCABRERA_EMAIL || 'mcabrera@usrad.com',
          subject: isVIP 
            ? `🎯 HIGH VALUE LEAD - ${data.centerCount} Centers - ${data.organizationName}`
            : `📋 New Provider Inquiry - ${data.centerCount} Centers - ${data.organizationName}`,
          html: `<div style="font-family: Arial, sans-serif;"><h2>${isVIP ? '🎯 VIP Provider Lead' : 'New Provider Inquiry'}</h2><p><strong>${data.firstName} ${data.lastName}</strong> from <strong>${data.organizationName}</strong></p><p>Centers: ${data.centerCount}</p><p>Email: ${data.email}</p><p>Phone: ${data.phone || 'Not provided'}</p></div>`
        });
        console.log('✅ Fallback admin email sent');
      } catch (fallbackError) {
        console.error('❌ Fallback also failed:', fallbackError);
      }
    }

    

    return new Response(
      JSON.stringify({ 
        success: true, 
        referenceId,
        isVIP,
        calendarLink: isVIP ? 'https://cal.com/usrad/15min' : null,
        message: 'Consultation request received successfully' 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Error processing provider consultation:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process consultation request',
        details: error.message
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};