// src/lib/db.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Get database URL from environment
const connectionString = import.meta.env.DATABASE_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Create postgres client
const client = postgres(connectionString, {
  max: 10, // Maximum number of connections
  idle_timeout: 20, // Close connections after 20 seconds of inactivity
  connect_timeout: 10, // Timeout when connecting to database
});

// Create drizzle instance with schema
export const db = drizzle(client, { schema });

// Helper functions for common queries
export class DatabaseService {
  // User operations
  static async getUserByEmail(email: string) {
    const users = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
      with: {
        imagingCenter: true
      }
    });
    return users;
  }

  static async getUserById(id: number) {
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
      with: {
        imagingCenter: true
      }
    });
    return user;
  }

  static async createUser(userData: schema.NewUser) {
    const [user] = await db.insert(schema.users).values(userData).returning();
    return user;
  }

  // Imaging Center operations
  static async getImagingCenterByUserId(userId: number) {
    const center = await db.query.imagingCenters.findFirst({
      where: (centers, { eq }) => eq(centers.userId, userId),
      with: {
        user: true,
        appointments: {
          limit: 10,
          orderBy: (appointments, { desc }) => [desc(appointments.scheduledDate)]
        }
      }
    });
    return center;
  }

  static async createImagingCenter(centerData: schema.NewImagingCenter) {
    const [center] = await db.insert(schema.imagingCenters).values(centerData).returning();
    return center;
  }

  // Appointment operations
  static async getAppointmentsByImagingCenter(imagingCenterId: number, limit = 50) {
    const appointments = await db.query.appointments.findMany({
      where: (appointments, { eq }) => eq(appointments.imagingCenterId, imagingCenterId),
      orderBy: (appointments, { desc }) => [desc(appointments.scheduledDate)],
      limit,
      with: {
        scanResults: true
      }
    });
    return appointments;
  }

  static async getAppointmentById(id: number) {
    const appointment = await db.query.appointments.findFirst({
      where: (appointments, { eq }) => eq(appointments.id, id),
      with: {
        imagingCenter: true,
        scanResults: true
      }
    });
    return appointment;
  }

  static async createAppointment(appointmentData: schema.NewAppointment) {
    const [appointment] = await db.insert(schema.appointments).values(appointmentData).returning();
    return appointment;
  }

  static async updateAppointmentStatus(id: number, status: string) {
    const [appointment] = await db
      .update(schema.appointments)
      .set({ status, updatedAt: new Date() })
      .where((appointments, { eq }) => eq(appointments.id, id))
      .returning();
    return appointment;
  }

  // Dashboard metrics
  static async getDashboardStats(imagingCenterId: number) {
    // Get appointments for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentAppointments = await db.query.appointments.findMany({
      where: (appointments, { eq, gte, and }) => and(
        eq(appointments.imagingCenterId, imagingCenterId),
        gte(appointments.createdAt, thirtyDaysAgo)
      )
    });

    // Calculate stats
    const totalAppointments = recentAppointments.length;
    const completedAppointments = recentAppointments.filter(apt => apt.status === 'completed').length;
    const pendingAppointments = recentAppointments.filter(apt => apt.status === 'scheduled').length;
    const totalRevenue = recentAppointments
      .filter(apt => apt.paymentStatus === 'paid')
      .reduce((sum, apt) => sum + Number(apt.price || 0), 0);

    // Get today's appointments
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    
    const todayAppointments = await db.query.appointments.findMany({
      where: (appointments, { eq, and, gte, lt }) => {
        const startOfDay = new Date(todayString);
        const endOfDay = new Date(todayString);
        endOfDay.setDate(endOfDay.getDate() + 1);
        
        return and(
          eq(appointments.imagingCenterId, imagingCenterId),
          gte(appointments.scheduledDate, startOfDay),
          lt(appointments.scheduledDate, endOfDay)
        );
      },
      orderBy: (appointments, { asc }) => [asc(appointments.scheduledDate)]
    });

    return {
      totalAppointments,
      completedAppointments,
      pendingAppointments,
      totalRevenue,
      todayAppointments: todayAppointments.length,
      recentAppointments: recentAppointments.slice(0, 5), // Last 5 appointments
      upcomingToday: todayAppointments
    };
  }

  // Session operations (for Lucia auth)
  static async createSession(sessionData: {
    id: string;
    userId: number;
    activeExpires: number;
    idleExpires: number;
  }) {
    const [session] = await db.insert(schema.userSessions).values(sessionData).returning();
    return session;
  }

  static async getSessionById(sessionId: string) {
    const session = await db.query.userSessions.findFirst({
      where: (sessions, { eq }) => eq(sessions.id, sessionId),
      with: {
        user: {
          with: {
            imagingCenter: true
          }
        }
      }
    });
    return session;
  }

  static async deleteSession(sessionId: string) {
    await db.delete(schema.userSessions)
      .where((sessions, { eq }) => eq(sessions.id, sessionId));
  }

  static async deleteUserSessions(userId: number) {
    await db.delete(schema.userSessions)
      .where((sessions, { eq }) => eq(sessions.userId, userId));
  }
}