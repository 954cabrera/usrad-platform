PSA Signing Integration - Project Summary
Date: June 2, 2025
Status: ✅ Core Integration Complete - Ready for Database Integration
Platform: USRad Provider Onboarding System
🎯 Project Overview
Successfully built a complete Provider Service Agreement (PSA) signing integration using DocuSeal API, enabling healthcare providers to digitally sign their agreements as part of the USRad onboarding process.
📋 What Was Accomplished
1. DocuSeal Integration Setup

Template Created: PSA template (ID: 1155842) in DocuSeal with proper field mapping
API Integration: Full DocuSeal API integration with submission creation and status checking
Field Mapping: All provider fields properly mapped to DocuSeal template fields:

provider_name, primary_contact_name, signer_name, signer_title
primary_contact_email, provider_email, primary_contact_phone, provider_phone
tax_id, total_locations, agreement_date, provider_date



2. Backend Infrastructure
Created the following API routes in Astro:
/api/docuseal.ts

Creates DocuSeal submissions with provider data
Handles field mapping and template population
Includes redirect URL for post-signing navigation
Returns embed URLs for document signing

/api/docuseal-webhook.ts

Receives real-time webhook events from DocuSeal
Handles: form.completed, form.started, form.viewed, submission.expired
Logs completion events and submission data
Ready for database integration

/api/check-psa-status.ts

Checks DocuSeal submission status via API
Returns completion status for manual user verification
Used by "Check Completion Status" button

3. Frontend User Experience
PSA Signing Component (PSASigningSystemUpdated.jsx)
Complete React component with three-step workflow:

Review Step: Shows provider information and generates PSA
Signing Step: Opens DocuSeal in new tab with manual status check
Completion Step: Professional completion screen with next steps

Completion Page (/dashboard/psa/completed.astro)

Standalone completion page for DocuSeal redirects
Shows success message and navigation options
Redirects to /login/imaginglogin for re-authentication

4. Production Deployment

Platform: Railway (https://usrad-r-production.up.railway.app)
Environment Variables: DOCUSEAL_API_KEY configured
Webhook URL: https://usrad-r-production.up.railway.app/api/docuseal-webhook
All endpoints tested and functional

🔄 Complete User Flow (As Built)

User navigates to PSA page → Shows provider information and generate button
Clicks "Generate & Sign PSA" → Creates DocuSeal submission
Clicks "Open Document to Sign" → Opens DocuSeal in new tab
Signs document in DocuSeal → Completes signing process
Returns to USRad tab → Still on signing page
Clicks "Check Completion Status" → Verifies completion and updates UI
Sees completion screen → Shows success with next step options
Clicks "Continue to Portal Setup" → Goes to /dashboard/onboarding

📁 File Structure Created
src/
├── pages/
│   ├── api/
│   │   ├── docuseal.ts              # Main PSA generation API
│   │   ├── docuseal-webhook.ts      # Webhook handler
│   │   └── check-psa-status.ts      # Status checking API
│   └── dashboard/
│       └── psa/
│           └── completed.astro      # Completion page
└── components/
    └── PSASigningSystemUpdated.jsx  # Main React component
🚀 Next Steps for Database Integration
Phase 1: Database Schema
Create tables to track PSA completion:
sql-- Example schema
CREATE TABLE psa_submissions (
    id UUID PRIMARY KEY,
    provider_id VARCHAR,
    docuseal_submission_id VARCHAR UNIQUE,
    status VARCHAR, -- 'pending', 'completed', 'declined', 'expired'
    signed_at TIMESTAMP,
    signer_name VARCHAR,
    signer_email VARCHAR,
    document_url VARCHAR,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Update provider onboarding progress
ALTER TABLE providers ADD COLUMN psa_completed_at TIMESTAMP;
ALTER TABLE providers ADD COLUMN onboarding_step INTEGER DEFAULT 1;
Phase 2: Webhook Database Integration
Update /api/docuseal-webhook.ts:
javascript// Add to handleDocumentCompleted function
await database.updatePSAStatus({
    submissionId: submissionData.id,
    status: 'completed',
    signedAt: submissionData.completed_at,
    signerName: submissionData.name,
    signerEmail: submissionData.email
});

// Update provider onboarding progress
await database.updateProvider(providerId, {
    psa_completed_at: new Date(),
    onboarding_step: 2 // Move to next step
});
Phase 3: Onboarding Progress Integration
Update /dashboard/onboarding page to:

Read PSA completion status from database
Show PSA step as completed with green checkmark
Update progress bar: "1 of 5 steps completed (20%)"
Enable next step: Make Facility Locations Setup active

Phase 4: Enhanced Status Checking
Update /api/check-psa-status.ts to:

Check database first before calling DocuSeal API
Cache results for better performance
Return comprehensive status including timestamps

🔧 Technical Configuration
DocuSeal Settings

Template ID: 1155842
Webhook URL: https://usrad-r-production.up.railway.app/api/docuseal-webhook
Events: form.completed, form.started, form.viewed, submission.expired
Redirect URL: https://usrad-r-production.up.railway.app/dashboard/psa/completed?submission_id={{submission.id}}

Environment Variables Required
envDOCUSEAL_API_KEY=your_api_key_here
DOCUSEAL_WEBHOOK_SECRET=optional_webhook_secret
Authentication Flow

PSA signing happens in separate DocuSeal tab
Completion page is public (no auth required)
Users re-authenticate when returning to dashboard
Uses /login/imaginglogin for provider login

⚠️ Known Limitations & Future Enhancements
Current Limitations:

No database persistence - Completion status not saved
Static onboarding progress - Progress bar doesn't update automatically
Manual status checking - Users must click button to verify completion
No email notifications - No automatic notifications to USRad team
No document storage - Relying on DocuSeal for document retention

Potential Enhancements:

Automatic progress tracking with database integration
Email notifications when PSAs are completed
Admin dashboard to view all PSA completion statuses
Document archival system for compliance
Bulk PSA management for multi-location providers
Integration with existing provider management system

📊 Success Metrics Achieved
✅ Full end-to-end PSA signing workflow
✅ Real document generation and signing
✅ Professional user experience
✅ Production-ready deployment
✅ Webhook infrastructure for real-time updates
✅ Error handling and user feedback
✅ Mobile-friendly responsive design
🎯 Business Value Delivered

Eliminates manual PSA processing
Provides legally binding digital signatures
Streamlines provider onboarding
Reduces administrative overhead
Creates audit trail for compliance
Improves time-to-activation for new providers


This integration is production-ready and provides immediate business value. The next phase should focus on database integration to complete the onboarding progress tracking system.