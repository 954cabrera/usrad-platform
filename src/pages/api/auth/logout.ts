// src/pages/api/auth/logout.ts
import type { APIRoute } from 'astro';
import { AuthService } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  try {
    // Get session from cookie
    const sessionId = cookies.get('auth_session')?.value;
    
    if (sessionId) {
      // Invalidate the session
      await AuthService.invalidateSession(sessionId);
    }
    
    // Clear the session cookie
    cookies.delete('auth_session', {
      path: '/'
    });

    // Check if this is an API request or form submission
    const contentType = request.headers.get('content-type');
    const isFormSubmission = contentType?.includes('application/x-www-form-urlencoded');
    
    if (isFormSubmission) {
      // Redirect for form submissions
      return redirect('/imaginglogin', 302);
    } else {
      // JSON response for API calls
      return new Response(JSON.stringify({
        success: true,
        message: 'Logged out successfully'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    console.error('Logout error:', error);
    
    // Always redirect to login on error for form submissions
    const contentType = request.headers.get('content-type');
    const isFormSubmission = contentType?.includes('application/x-www-form-urlencoded');
    
    if (isFormSubmission) {
      return redirect('/imaginglogin', 302);
    } else {
      return new Response(JSON.stringify({
        success: false,
        error: 'Logout failed'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
};