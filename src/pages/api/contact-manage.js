import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST({ request }) {
  try {
    const { action, contactId, data } = await request.json();

    console.log('📋 Admin Action:', action, 'Contact ID:', contactId);

    switch (action) {
      case 'mark_resolved':
        const { error: resolveError } = await supabase
          .from('contact_submissions')
          .update({ 
            status: 'resolved',
            resolved_at: new Date().toISOString()
          })
          .eq('id', contactId);

        if (resolveError) throw resolveError;
        
        console.log('✅ Marked as resolved');
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      case 'update_status':
        const { error: statusError } = await supabase
          .from('contact_submissions')
          .update({ status: data.status })
          .eq('id', contactId);

        if (statusError) throw statusError;
        
        console.log('✅ Status updated to:', data.status);
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      case 'update_priority':
        const { error: priorityError } = await supabase
          .from('contact_submissions')
          .update({ priority: data.priority })
          .eq('id', contactId);

        if (priorityError) throw priorityError;
        
        console.log('✅ Priority updated to:', data.priority);
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      case 'add_note':
        const { error: noteError } = await supabase
          .from('contact_notes')
          .insert([{
            contact_id: contactId,
            note: data.note,
            created_by: data.createdBy,
            created_at: new Date().toISOString()
          }]);

        if (noteError) throw noteError;
        
        console.log('✅ Note added');
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      case 'set_follow_up':
        const { error: followUpError } = await supabase
          .from('contact_submissions')
          .update({ 
            follow_up_due: data.followUpDate,
            status: 'follow_up_needed'
          })
          .eq('id', contactId);

        if (followUpError) throw followUpError;
        
        console.log('✅ Follow-up scheduled');
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }), 
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

  } catch (error) {
    console.error('❌ Contact management error:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function GET({ request }) {
  try {
    const url = new URL(request.url);
    const action = url.searchParams.get('action');

    if (action === 'check_follow_ups') {
      const now = new Date().toISOString();
      
      const { data: overdueContacts, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .eq('status', 'follow_up_needed')
        .lt('follow_up_due', now);

      if (error) throw error;

      console.log('📊 Overdue follow-ups:', overdueContacts.length);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          overdueCount: overdueContacts.length,
          contacts: overdueContacts 
        }), 
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }), 
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Contact management error:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}