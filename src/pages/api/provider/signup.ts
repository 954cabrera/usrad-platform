// src/pages/api/provider/signup.ts
import type { APIRoute } from 'astro';
import { AuthService, lucia } from '../../../lib/auth';
import { DatabaseService } from '../../../lib/db';

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
  
  // Banking Information
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  accountType: string;
}

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const data: ProviderSignupData = await request.json();
    
    // Generate temporary password for the user
    const tempPassword = generateTemporaryPassword();
    
    // 1. Create user account with your AuthService
    const user = await AuthService.createUser({
      email: data.email,
      password: tempPassword,
      role: 'imaging_center',
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.directPhone
    });
    
    // 2. Create imaging center record with all the new fields
    const imagingCenter = await DatabaseService.createImagingCenter({
      userId: user.id,
      name: data.legalBusinessName, // Use legal name as the name
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
      services: JSON.stringify(data.services), // Store as JSON string
      mriFieldStrength: data.mriFieldStrength,
      equipmentDetails: data.equipmentDetails,
      yearsInOperation: data.yearsInOperation,
      dailyVolume: data.dailyVolume,
      hoursOfOperation: data.hoursOfOperation,
      paymentMethod: data.paymentMethod,
      bankName: data.bankName,
      status: 'psa_pending', // Initialize provider status
      tier: 'standard' // Default tier
    });
    
    // 3. Create session using your AuthService
    const session = await AuthService.createSession(user.id);
    
    // 4. Set session cookie (using your existing auth pattern)
    cookies.set('auth_session', session.id, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'strict'
    });
    
    // 5. TODO: Send welcome email with temporary password
    console.log(`Welcome email needed for ${data.email} with password: ${tempPassword}`);
    // await sendWelcomeEmail(data.email, tempPassword);
    
    return new Response(JSON.stringify({ 
      success: true, 
      imagingCenterId: imagingCenter.id,
      redirectUrl: '/dashboard?welcome=true',
      message: 'Account created successfully! Check your email for login credentials.'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Provider signup error:', error);
    return new Response(JSON.stringify({ 
      error: 'Registration failed. Please try again.' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Helper functions
function generateTemporaryPassword(): string {
  // Generate a secure temporary password
  return Math.random().toString(36).slice(-12) + Math.random().toString(36).slice(-12);
}