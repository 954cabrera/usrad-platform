// src/pages/api/employer-consultation.js
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const REMIX_API_URL = import.meta.env.PUBLIC_REMIX_URL || 'https://app.usrad.com';

export const POST = async ({ request }) => {
  try {
    // Check environment variables
    console.log('🔧 Environment check:');
    console.log('RESEND_API_KEY exists:', !!import.meta.env.RESEND_API_KEY);
    console.log('PUBLIC_SUPABASE_URL exists:', !!import.meta.env.PUBLIC_SUPABASE_URL);
    console.log('SUPABASE_SERVICE_ROLE_KEY exists:', !!import.meta.env.SUPABASE_SERVICE_ROLE_KEY);

    const data = await request.json();
    console.log('📋 === Employer Consultation Request ===');
    console.log('Executive Name:', data.firstName, data.lastName);
    console.log('Company:', data.companyName);
    console.log('Email:', data.email);

    // Validation
    if (!data.firstName || !data.lastName || !data.email || !data.companyName) {
      return new Response(
        JSON.stringify({ 
          error: 'Name, email, and company are required',
          received: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            companyName: data.companyName
          }
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate reference ID
    const referenceId = `EC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Format the imaging challenges array if it exists
    const imagingChallengesFormatted = Array.isArray(data.imagingChallenges) 
      ? data.imagingChallenges.join(', ')
      : data.imagingChallenges || 'Not specified';

    // Save to Supabase
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { error: dbError } = await supabase
      .from('employer_consultations')
      .insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone || null,
        company_name: data.companyName,
        job_title: data.jobTitle || null,
        company_size: data.companySize || null,
        industry: data.industry || null,
        preferred_date: data.preferredDate || null,
        preferred_time: data.preferredTime || null,
        consultation_type: data.consultationType || null,
        current_provider: data.currentProvider || null,
        imaging_challenges: Array.isArray(data.imagingChallenges) 
          ? data.imagingChallenges 
          : (data.imagingChallenges ? [data.imagingChallenges] : []),
        annual_budget: data.annualBudget || null,
        specific_needs: data.specificNeeds || null,
        timeline: data.timeline || null,
        reference_id: referenceId,
        status: 'new',
        submitted_at: new Date().toISOString()
      });

    if (dbError) {
      console.error('❌ Database error:', dbError);
      throw new Error('Failed to save to database');
    }

    console.log('✅ Saved to database with reference:', referenceId);

    // Send emails via Remix API (branded templates)
    console.log('📧 Sending emails via Remix API...');
    try {
      const emailResponse = await fetch(`${REMIX_API_URL}/api/marketing-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'employer-consultation',
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            jobTitle: data.jobTitle,
            companyName: data.companyName,
            industry: data.industry,
            companySize: data.companySize,
            currentProvider: data.currentProvider,
            annualBudget: data.annualBudget,
            timeline: data.timeline,
            imagingChallenges: imagingChallengesFormatted,
            specificNeeds: data.specificNeeds,
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
          from: 'USRad Employer Consultations <noreply@send.usrad.com>',
          to: 'mcabrera@usrad.com',
          subject: `🎯 New Employer Consultation Lead - ${data.companyName}`,
          html: `<div style="font-family: Arial, sans-serif;"><h2>New Employer Lead</h2><p><strong>${data.firstName} ${data.lastName}</strong> from <strong>${data.companyName}</strong></p><p>Email: ${data.email}</p><p>Phone: ${data.phone || 'Not provided'}</p></div>`
        });
        console.log('✅ Fallback admin email sent');
      }
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      // Fallback to direct Resend
      try {
        await resend.emails.send({
          from: 'USRad Employer Consultations <noreply@send.usrad.com>',
          to: 'mcabrera@usrad.com',
          subject: `🎯 New Employer Consultation Lead - ${data.companyName}`,
          html: `<div style="font-family: Arial, sans-serif;"><h2>New Employer Lead</h2><p><strong>${data.firstName} ${data.lastName}</strong> from <strong>${data.companyName}</strong></p><p>Email: ${data.email}</p><p>Phone: ${data.phone || 'Not provided'}</p></div>`
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
        message: 'Consultation request received successfully' 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Error processing employer consultation:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process consultation request',
        details: error.message // Include error message in production for debugging
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};