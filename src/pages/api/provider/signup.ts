// src/pages/api/provider/signup.ts
import type { APIRoute } from 'astro';
import { AuthService } from '../../../lib/auth';
import { DatabaseService } from '../../../lib/db';
import crypto from 'crypto';

interface ProviderSignupData {
  // Business Information
  legalBusinessName: string;
  dbaName?: string;
  taxId: string;
  businessAddress: string;
  city: string;
  state: string;
  zipCode: string;
  businessPhone: string;
  
  // Primary Contact
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  directPhone: string;
  
  // Services & Equipment
  services: string[];
  mriFieldStrength?: string;
  equipmentDetails?: string;
  
  // Operating Information
  yearsInOperation?: string;
  dailyVolume?: string;
  hoursOfOperation?: string;
  
  // Payment Information (simplified)
  paymentMethod?: string;
  bankName?: string;
}

export const POST: APIRoute = async ({ request, url }) => {
  try {
    const data: ProviderSignupData = await request.json();
    
    // Check if user already exists with this email
    const existingUser = await DatabaseService.getUserByEmail(data.email);
    if (existingUser) {
      return new Response(JSON.stringify({ 
        error: 'Email Already in Use',
        message: 'An account with this email address already exists. Please check the email you entered, or if this is your account, sign in instead.',
        suggestions: [
          'Double-check the email address you entered',
          'Try signing in if you already have an account',
          'Use a different email address if this is a new application'
        ],
        loginUrl: '/login/imaginglogin'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Generate secure verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    // Generate temporary password (for backup login if needed)
    const tempPassword = generateTemporaryPassword();
    
    // 1. Create user account (but don't log them in)
    const user = await AuthService.createUser({
      email: data.email,
      password: tempPassword,
      role: 'imaging_center',
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.directPhone
    });
    
    // 2. Create imaging center record
    const imagingCenter = await DatabaseService.createImagingCenter({
      userId: user.id,
      name: data.legalBusinessName,
      legalBusinessName: data.legalBusinessName,
      dbaName: data.dbaName,
      taxId: data.taxId,
      businessAddress: data.businessAddress,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      businessPhone: data.businessPhone,
      email: data.email,
      contactTitle: data.title,
      services: JSON.stringify(data.services),
      mriFieldStrength: data.mriFieldStrength,
      equipmentDetails: data.equipmentDetails,
      yearsInOperation: data.yearsInOperation,
      dailyVolume: data.dailyVolume,
      hoursOfOperation: data.hoursOfOperation,
      paymentMethod: data.paymentMethod,
      bankName: data.bankName,
      status: 'pending_verification', // New status for unverified accounts
      tier: 'standard'
    });
    
    // 3. Store verification token
    await DatabaseService.storeVerificationToken(user.id, verificationToken, tokenExpiry);
    
    // 4. Send magic link email
    const magicLink = `${url.origin}/api/auth/verify?token=${verificationToken}`;
    await sendMagicLinkEmail(data.email, data.firstName, magicLink);
    
    // 5. Return success (no auto-login)
    return new Response(JSON.stringify({ 
      success: true,
      message: 'Application submitted successfully!',
      email: data.email,
      nextStep: 'Check your email for verification link'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Provider signup error:', error);
    
    // Handle different types of errors gracefully
    let errorMessage = 'Registration failed. Please try again.';
    
    if (error.message?.includes('duplicate key')) {
      errorMessage = 'An account with this email already exists. Please try logging in instead.';
    } else if (error.message?.includes('connection')) {
      errorMessage = 'Unable to connect to our servers. Please try again in a moment.';
    } else if (error.message?.includes('validation')) {
      errorMessage = 'Please check that all required fields are filled out correctly.';
    }
    
    return new Response(JSON.stringify({ 
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Helper functions
function generateTemporaryPassword(): string {
  return crypto.randomBytes(8).toString('hex');
}

async function sendMagicLinkEmail(email: string, firstName: string, magicLink: string) {
  // TODO: Implement email sending
  console.log(`
🪄 MAGIC LINK EMAIL
To: ${email}
Subject: Welcome to USRad Network - Verify Your Account

Hi ${firstName},

Welcome to the USRad Network! Click the link below to verify your email and access your provider dashboard:

${magicLink}

This link expires in 24 hours.

Best regards,
USRad Team
  `);
  
  // In production, use your email service:
  // await emailService.send({
  //   to: email,
  //   subject: 'Welcome to USRad Network - Verify Your Account',
  //   template: 'magic-link',
  //   data: { firstName, magicLink }
  // });
}