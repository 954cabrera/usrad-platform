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

 // Get user dashboard data (existing method for imaging centers)
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

 // Get patient dashboard data
 static async getPatientDashboardData(userId: number) {
   const user = await DatabaseService.getUserById(userId);
   
   if (!user) {
     throw new Error('User not found');
   }

   // Mock data for now - replace with real database calls later
   return {
     patientProfile: {
       phone: user.phone || "(555) 123-4567",
       memberSince: "2024-01-15",
       onboardingComplete: true,
       referralProgress: 2,
       membershipTier: "Standard"
     },
     appointments: {
       upcoming: [],
       recent: []
     },
     healthMetrics: {
       totalSavings: 2847,
       completedScans: 4,
       healthScore: 92
     }
   };
 }

 // Get patient profile data
 static async getPatientProfileData(userId: number) {
   const user = await DatabaseService.getUserById(userId);
   
   if (!user) {
     throw new Error('User not found');
   }

   // Mock data structure - replace with real database calls
   return {
     patientProfile: {
       phone: user.phone,
       dateOfBirth: null,
       gender: null,
       address: null,
       city: null,
       state: null,
       zipCode: null,
       memberSince: "2024-01-15",
       membershipTier: "Standard",
       preferredLanguage: "English"
     },
     medicalHistory: null,
     insuranceInfo: null,
     emergencyContacts: null
   };
 }

 // Get patient booking data
 static async getPatientBookingData(userId: number) {
   const user = await DatabaseService.getUserById(userId);
   
   if (!user) {
     throw new Error('User not found');
   }

   // Mock data - replace with real provider data from database
   return {
     availableProviders: [],
     scanTypes: [],
     patientPreferences: null
   };
 }

 // Get patient reports data
 static async getPatientReportsData(userId: number) {
   const user = await DatabaseService.getUserById(userId);
   
   if (!user) {
     throw new Error('User not found');
   }

   // Mock data - replace with real reports from database
   return {
     reports: [],
     sharedReports: [],
     reportSummary: {
       totalReports: 0,
       normalFindings: 0,
       abnormalFindings: 0,
       pendingReports: 0,
       totalDownloads: 0,
       totalShared: 0,
       averageReportTime: "2 hours",
       lastReportDate: null
     }
   };
 }

 // Get patient appointments data
 static async getPatientAppointmentsData(userId: number) {
   const user = await DatabaseService.getUserById(userId);
   
   if (!user) {
     throw new Error('User not found');
   }

   // Mock data - replace with real appointments from database
   return {
     appointments: {
       upcoming: [],
       completed: [],
       cancelled: []
     },
     appointmentStats: {
       totalAppointments: 0,
       completedAppointments: 0,
       upcomingAppointments: 0,
       cancelledAppointments: 0,
       noShowCount: 0,
       averageWaitTime: "8 minutes",
       onTimePercentage: 94,
       totalSavings: 0
     },
     upcomingReminders: []
   };
 }

 // Get patient billing data
 static async getPatientBillingData(userId: number) {
   const user = await DatabaseService.getUserById(userId);
   
   if (!user) {
     throw new Error('User not found');
   }

   // Mock data - replace with real billing data from database
   return {
     invoices: [],
     paymentMethods: [],
     billingStats: {
       totalPaid: 0,
       totalSaved: 0,
       outstandingBalance: 0,
       averageSavings: 0,
       paymentsThisYear: 0,
       nextPaymentDue: null,
       creditAvailable: 0,
       loyaltyPoints: 0
     },
     insuranceClaims: []
   };
 }

 // Get patient referrals data
 static async getPatientReferralsData(userId: number) {
   const user = await DatabaseService.getUserById(userId);
   
   if (!user) {
     throw new Error('User not found');
   }

   // Mock data - replace with real referral data from database
   return {
     referrals: [],
     referralStats: {
       totalReferrals: 0,
       activeReferrals: 0,
       completedReferrals: 0,
       totalEarned: 0,
       availableCredit: 0,
       nextMilestone: 5,
       nextReward: 100,
       currentTier: "Bronze",
       lifetimeValue: 0,
       monthlyReferrals: 0,
       conversionRate: 0
     },
     rewards: [],
     leaderboard: []
   };
 }

 // Get patient education data
 static async getPatientEducationData(userId: number) {
   const user = await DatabaseService.getUserById(userId);
   
   if (!user) {
     throw new Error('User not found');
   }

   // Mock data - replace with real education progress from database
   return {
     articles: [],
     videos: [],
     courses: [],
     progress: {
       articlesRead: 0,
       videosWatched: 0,
       coursesCompleted: 0,
       totalProgress: 0,
       streakDays: 0,
       pointsEarned: 0,
       certificatesEarned: 0
     }
   };
 }

 // Get patient support data
 static async getPatientSupportData(userId: number) {
   const user = await DatabaseService.getUserById(userId);
   
   if (!user) {
     throw new Error('User not found');
   }

   // Mock data - replace with real support tickets from database
   return {
     tickets: [],
     faq: [],
     contactInfo: {
       phone: "(888) USR-HELP",
       email: "support@usrad.com",
       hours: {
         weekday: "7:00 AM - 10:00 PM EST",
         weekend: "8:00 AM - 6:00 PM EST"
       },
       emergencyLine: "(888) USR-URGENT",
       chatAvailable: true,
       averageWaitTime: "2 minutes"
     },
     supportStats: {
       totalTickets: 0,
       resolvedTickets: 0,
       averageResponseTime: "2 hours",
       satisfactionRating: 4.8,
       activeTickets: 0,
       lastContact: null
     }
   };
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