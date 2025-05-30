// src/pages/api/auth/verify.ts
import type { APIRoute } from 'astro';
import { AuthService } from '../../../lib/auth';
import { DatabaseService } from '../../../lib/db';

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  try {
    const token = url.searchParams.get('token');
    
    if (!token) {
      return redirect('/provider-signup?error=invalid_link');
    }
    
    // 1. Verify the token
    const verification = await DatabaseService.verifyToken(token);
    
    if (!verification || verification.expired) {
      return redirect('/provider-signup?error=expired_link');
    }
    
    if (verification.used) {
      return redirect('/provider-signup?error=link_already_used');
    }
    
    // 2. Get the user
    const user = await DatabaseService.getUserById(verification.userId);
    
    if (!user) {
      return redirect('/provider-signup?error=user_not_found');
    }
    
    // 3. Update provider status to verified
    await DatabaseService.updateProviderStatus(verification.userId, 'psa_pending');
    
    // 4. Mark token as used
    await DatabaseService.markTokenAsUsed(token);
    
    // 5. Create session and log user in
    const session = await AuthService.createSession(user.id);
    
    // 6. Set session cookie
    cookies.set('auth_session', session.id, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'strict'
    });
    
    // 7. Redirect to dashboard with welcome message
    return redirect('/dashboard?verified=true&welcome=true');
    
  } catch (error) {
    console.error('Magic link verification error:', error);
    return redirect('/provider-signup?error=verification_failed');
  }
};