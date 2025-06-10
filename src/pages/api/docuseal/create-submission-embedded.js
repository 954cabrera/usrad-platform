export async function POST({ request }) {
  try {
    const { providerData } = await request.json();

    const response = await fetch('https://api.docuseal.co/api/submissions/embedded', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': import.meta.env.DOCUSEAL_API_KEY,
      },
      body: JSON.stringify({
        template_id: import.meta.env.DOCUSEAL_TEMPLATE_ID,
        template_variables: {
          provider_name: providerData.contactName,
          provider_email: providerData.email,
        },
        submitters: [
          {
            role: 'Provider',
            name: providerData.contactName,
            email: providerData.email,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ DocuSeal API responded with error:', data);
      return new Response(JSON.stringify({ error: data?.message || 'DocuSeal API error' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!data.embed_src) {
      console.error('❌ DocuSeal response missing embed_src:', data);
      return new Response(JSON.stringify({ error: 'Missing embed_src in DocuSeal response' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ embed_src: data.embed_src }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('❌ Docuseal embed creation failed:', err);
    return new Response(JSON.stringify({ error: err.message || 'Failed to create embed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
