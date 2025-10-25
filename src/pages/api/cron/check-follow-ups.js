import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function GET() {
  try {
    const now = new Date().toISOString();
    
    // Get overdue contacts
    const { data: overdueContacts, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .eq('status', 'follow_up_needed')
      .lt('follow_up_due', now);

    if (error) throw error;

    console.log('📊 Overdue follow-ups found:', overdueContacts.length);

    // Send reminder email if there are overdue contacts
    if (overdueContacts.length > 0) {
      await resend.emails.send({
        from: 'USRad System <notifications@send.usrad.com>',
        to: import.meta.env.SUPPORT_EMAIL,
        subject: `⚠️ ${overdueContacts.length} Overdue Follow-ups`,
        html: `
          <h2>Overdue Follow-ups Reminder</h2>
          <p>You have ${overdueContacts.length} contacts that need follow-up:</p>
          <ul>
            ${overdueContacts.map(c => `
              <li>
                <strong>${c.first_name} ${c.last_name}</strong> - ${c.email}<br>
                Topic: ${c.topic}<br>
                Due: ${new Date(c.follow_up_due).toLocaleDateString()}
              </li>
            `).join('')}
          </ul>
          <p><a href="https://usrad.com/admin/contacts">View in Admin Dashboard</a></p>
        `
      });
      
      console.log('✅ Reminder email sent');
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        overdueCount: overdueContacts.length 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Cron error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}