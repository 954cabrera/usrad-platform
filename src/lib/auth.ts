// src/lib/auth.ts
import { Lucia } from 'lucia';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { db, DatabaseService } from './db';
import { users, userSessions } from './schema';
import { hash, verify } from '@node-rs/argon2';

// Initialize Lucia Auth with Drizzle adapter
const adapter = new DrizzlePostgreSQLAdapter(db, userSessions, users);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: import.meta.env.PROD // set to true in production
    }
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      role: attributes.role,
      firstName: attributes.firstName,
      lastName: attributes.lastName,
      phone: attributes.phone,
      isActive: attributes.isActive
    };
  }
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      email: string;
      role: string;
      firstName: string | null;
      lastName: string | null;
      phone: string | null;
      isActive: string;
    };
  }
}

// Auth utility functions
export class AuthService {
  // Hash password using Argon2
  static async hashPassword(password: string): Promise<string> {
    return await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1
    });
  }

  // Verify password
  static async verifyPassword(hash: string, password: string): Promise<boolean> {
    return await verify(hash, password);
  }

  // Create user account
  static async createUser(data: {
    email: string;
    password: string;
    role: 'imaging_center' | 'admin' | 'patient';
    firstName?: string;
    lastName?: string;
    phone?: string;
  }) {
    const hashedPassword = await this.hashPassword(data.password);
    
    const user = await DatabaseService.createUser({
      email: data.email.toLowerCase(),
      passwordHash: hashedPassword,
      role: data.role,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone
    });

    return user;
  }

  // Authenticate user
  static async authenticateUser(email: string, password: string) {
    const user = await DatabaseService.getUserByEmail(email.toLowerCase());
    
    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }

    if (user.isActive !== 'true') {
      return { success: false, error: 'Account is deactivated' };
    }

    const validPassword = await this.verifyPassword(user.passwordHash, password);
    
    if (!validPassword) {
      return { success: false, error: 'Invalid email or password' };
    }

    return { success: true, user };
  }

  // Create session
  static async createSession(userId: number) {
    const session = await lucia.createSession(userId.toString(), {});
    return session;
  }

  // Validate session
  static async validateSession(sessionId: string) {
    try {
      const result = await lucia.validateSession(sessionId);
      return result;
    } catch (error) {
      return { session: null, user: null };
    }
  }

  // Invalidate session
  static async invalidateSession(sessionId: string) {
    await lucia.invalidateSession(sessionId);
  }

  // Check if user has required role
  static hasRole(user: any, requiredRole: string | string[]): boolean {
    if (!user) return false;
    
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    
    return user.role === requiredRole;
  }

  // Get user dashboard data
  static async getUserDashboardData(userId: number) {
    const user = await DatabaseService.getUserById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    if (user.role === 'imaging_center') {
      const center = await DatabaseService.getImagingCenterByUserId(userId);
      if (center) {
        const stats = await DatabaseService.getDashboardStats(center.id);
        return {
          user,
          imagingCenter: center,
          stats
        };
      }
    }

    return { user };
  }
}

// Session validation middleware for Astro
export async function validateAuthSession(request: Request): Promise<{
  session: any;
  user: any;
}> {
  const sessionId = extractSessionId(request);
  
  if (!sessionId) {
    return { session: null, user: null };
  }

  return await AuthService.validateSession(sessionId);
}

// Extract session ID from request
function extractSessionId(request: Request): string | null {
  const cookies = request.headers.get('cookie');
  if (!cookies) return null;

  const sessionCookie = cookies
    .split(';')
    .find(cookie => cookie.trim().startsWith('auth_session='));
  
  if (!sessionCookie) return null;

  return sessionCookie.split('=')[1];
}