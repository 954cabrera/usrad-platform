// /api/docuseal/create-template.js
// API endpoint to create DocuSeal template from DOCX

export async function POST(request) {
  try {
    const formData = await request.formData();
    const docxFile = formData.get('file');
    const templateName = formData.get('name') || 'USRad Provider Service Agreement';
    
    if (!docxFile) {
      return new Response(JSON.stringify({ error: 'No DOCX file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create FormData for DocuSeal API
    const docuSealFormData = new FormData();
    docuSealFormData.append('name', templateName);
    docuSealFormData.append('documents', docxFile);

    // Upload to DocuSeal
    const response = await fetch('https://api.docuseal.com/templates/docx', {
      method: 'POST',
      headers: {
        'X-Auth-Token': process.env.DOCUSEAL_API_KEY // Test mode key
      },
      body: docuSealFormData
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('DocuSeal API error:', error);
      return new Response(JSON.stringify({ 
        error: 'Failed to create template',
        details: error 
      }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const template = await response.json();
    
    // Return template info
    return new Response(JSON.stringify({
      success: true,
      template_id: template.id,
      template_slug: template.slug,
      template_name: template.name,
      fields: template.fields || []
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Template creation error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}