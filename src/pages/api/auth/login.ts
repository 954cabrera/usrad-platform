// src/pages/api/auth/login.ts
import type { APIRoute } from 'astro';
import { AuthService, lucia } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  try {
    const formData = await request.formData();
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    // Validate input
    if (!email || !password) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Email and password are required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Authenticate user
    const authResult = await AuthService.authenticateUser(email, password);
    
    if (!authResult.success) {
      return new Response(JSON.stringify({
        success: false,
        error: authResult.error
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create session using Lucia directly
    const session = await lucia.createSession(authResult.user.id.toString(), {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    
    // Set session cookie
    cookies.set(sessionCookie.name, sessionCookie.value, {
      ...sessionCookie.attributes
    });

    // Determine redirect URL based on user role
    let redirectUrl = '/dashboard';
    if (authResult.user.role === 'admin') {
      redirectUrl = '/dashboard/admin';
    } else if (authResult.user.role === 'imaging_center') {
      redirectUrl = '/dashboard';
    }

    // Return success response
    return new Response(JSON.stringify({
      success: true,
      user: {
        id: authResult.user.id,
        email: authResult.user.email,
        role: authResult.user.role,
        firstName: authResult.user.firstName,
        lastName: authResult.user.lastName
      },
      redirectUrl
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Login error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};