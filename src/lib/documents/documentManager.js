// src/lib/documents/documentManager.js
import { supabase } from '../supabase';
import { logActivity } from '../security/auditLogger';

export async function uploadProviderDocument(file, documentType, providerId) {
  try {
    // Create file path: provider-id/document-type-timestamp.pdf
    const timestamp = new Date().getTime();
    const fileName = `${documentType.toLowerCase().replace(' ', '-')}-${timestamp}.pdf`;
    const filePath = `${providerId}/${fileName}`;

    // Upload to storage
    const { data, error } = await supabase.storage
      .from('provider-documents')
      .upload(filePath, file, {
        contentType: 'application/pdf',
        upsert: false
      });

    if (error) throw error;

    // Save document record
    const { data: docRecord, error: dbError } = await supabase
      .from('provider_documents')
      .insert({
        provider_id: providerId,
        document_type: documentType,
        storage_path: data.path,
        signed_date: new Date(),
        status: 'active'
      })
      .select()
      .single();

    if (dbError) throw dbError;

    // Log activity
    await logActivity(
      'DOCUMENT_UPLOADED',
      { documentType, fileName },
      'provider_documents',
      docRecord.id
    );

    return docRecord;
  } catch (error) {
    console.error('Document upload failed:', error);
    throw error;
  }
}