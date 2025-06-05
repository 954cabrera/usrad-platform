import { Lucia } from 'lucia';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { pgTable, timestamp, varchar, serial, integer, text, decimal } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { hash, verify } from '@node-rs/argon2';

const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull(),
  // 'imaging_center', 'admin', 'patient'
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  phone: varchar("phone", { length: 20 }),
  isActive: varchar("is_active", { length: 10 }).default("true"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
const userSessions = pgTable("user_sessions", {
  id: varchar("id", { length: 128 }).primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull()
});
const imagingCenters = pgTable("imaging_centers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  // Basic info (existing)
  name: varchar("name", { length: 255 }).notNull(),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 50 }),
  zipCode: varchar("zip_code", { length: 10 }),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 255 }),
  // Provider-specific fields (new)
  legalBusinessName: varchar("legal_business_name", { length: 255 }),
  dbaName: varchar("dba_name", { length: 255 }),
  taxId: varchar("tax_id", { length: 50 }),
  businessAddress: text("business_address"),
  businessPhone: varchar("business_phone", { length: 20 }),
  contactTitle: varchar("contact_title", { length: 100 }),
  // Services & Equipment
  services: text("services"),
  // JSON array: ["MRI", "CT", "Ultrasound"]
  mriFieldStrength: varchar("mri_field_strength", { length: 20 }),
  equipmentDetails: text("equipment_details"),
  // Operating Information
  yearsInOperation: varchar("years_in_operation", { length: 20 }),
  dailyVolume: varchar("daily_volume", { length: 20 }),
  hoursOfOperation: text("hours_of_operation"),
  // Banking Information
  bankName: varchar("bank_name", { length: 255 }),
  routingNumber: varchar("routing_number", { length: 20 }),
  accountNumber: varchar("account_number", { length: 50 }),
  accountType: varchar("account_type", { length: 20 }),
  // Provider Status Tracking
  status: varchar("status", { length: 50 }).default("psa_pending"),
  // Updated default
  tier: varchar("tier", { length: 20 }).default("standard"),
  // 'premium' or 'standard'
  // PSA & Credentialing
  psaUrl: varchar("psa_url", { length: 500 }),
  // DocuSeal PSA URL
  credentialingId: varchar("credentialing_id", { length: 100 }),
  // CAQH ID
  credentialingStatus: varchar("credentialing_status", { length: 50 }),
  documentsSubmitted: text("documents_submitted"),
  // JSON array
  // Existing fields (keep for backward compatibility)
  licenseNumber: varchar("license_number", { length: 100 }),
  equipment: text("equipment"),
  // JSON string of available equipment
  operatingHours: text("operating_hours"),
  // JSON string of hours
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  patientName: varchar("patient_name", { length: 255 }).notNull(),
  patientEmail: varchar("patient_email", { length: 255 }),
  patientPhone: varchar("patient_phone", { length: 20 }),
  patientDateOfBirth: timestamp("patient_date_of_birth"),
  imagingCenterId: integer("imaging_center_id").references(() => imagingCenters.id).notNull(),
  scanType: varchar("scan_type", { length: 100 }).notNull(),
  scanArea: varchar("scan_area", { length: 100 }),
  // 'brain', 'spine', 'knee', etc.
  withContrast: varchar("with_contrast", { length: 10 }).default("false"),
  scheduledDate: timestamp("scheduled_date").notNull(),
  scheduledTime: varchar("scheduled_time", { length: 10 }),
  // '10:30 AM'
  duration: integer("duration").default(60),
  // minutes
  status: varchar("status", { length: 50 }).default("scheduled"),
  // 'scheduled', 'completed', 'cancelled', 'no_show'
  price: decimal("price", { precision: 10, scale: 2 }),
  paymentStatus: varchar("payment_status", { length: 50 }).default("pending"),
  referringPhysician: varchar("referring_physician", { length: 255 }),
  clinicalHistory: text("clinical_history"),
  specialInstructions: text("special_instructions"),
  confirmationNumber: varchar("confirmation_number", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
const scanResults = pgTable("scan_results", {
  id: serial("id").primaryKey(),
  appointmentId: integer("appointment_id").references(() => appointments.id).notNull(),
  radiologistName: varchar("radiologist_name", { length: 255 }),
  radiologistId: varchar("radiologist_id", { length: 100 }),
  reportText: text("report_text"),
  findings: text("findings"),
  impression: text("impression"),
  recommendations: text("recommendations"),
  imageUrls: text("image_urls"),
  // JSON array of image URLs
  reportPdfUrl: varchar("report_pdf_url", { length: 500 }),
  status: varchar("status", { length: 50 }).default("pending"),
  // 'pending', 'completed', 'reviewed'
  completedAt: timestamp("completed_at"),
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").defaultNow()
});
const verificationTokens = pgTable("verification_tokens", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  token: varchar("token", { length: 64 }).unique().notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  usedAt: timestamp("used_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
});
const metrics = pgTable("metrics", {
  id: serial("id").primaryKey(),
  imagingCenterId: integer("imaging_center_id").references(() => imagingCenters.id),
  metricType: varchar("metric_type", { length: 100 }).notNull(),
  // 'appointments', 'revenue', 'patient_satisfaction'
  value: decimal("value", { precision: 15, scale: 2 }).notNull(),
  period: varchar("period", { length: 20 }).notNull(),
  // 'daily', 'weekly', 'monthly'
  date: timestamp("date").notNull(),
  metadata: text("metadata"),
  // JSON for additional data
  createdAt: timestamp("created_at").defaultNow()
});
const usersRelations = relations(users, ({ one, many }) => ({
  imagingCenter: one(imagingCenters, {
    fields: [users.id],
    references: [imagingCenters.userId]
  }),
  sessions: many(userSessions)
}));
const imagingCentersRelations = relations(imagingCenters, ({ one, many }) => ({
  user: one(users, {
    fields: [imagingCenters.userId],
    references: [users.id]
  }),
  appointments: many(appointments),
  metrics: many(metrics)
}));
const appointmentsRelations = relations(appointments, ({ one, many }) => ({
  imagingCenter: one(imagingCenters, {
    fields: [appointments.imagingCenterId],
    references: [imagingCenters.id]
  }),
  scanResults: many(scanResults)
}));
const scanResultsRelations = relations(scanResults, ({ one }) => ({
  appointment: one(appointments, {
    fields: [scanResults.appointmentId],
    references: [appointments.id]
  })
}));
const userSessionsRelations = relations(userSessions, ({ one }) => ({
  user: one(users, {
    fields: [userSessions.userId],
    references: [users.id]
  })
}));
const metricsRelations = relations(metrics, ({ one }) => ({
  imagingCenter: one(imagingCenters, {
    fields: [metrics.imagingCenterId],
    references: [imagingCenters.id]
  })
}));
const verificationTokensRelations = relations(verificationTokens, ({ one }) => ({
  user: one(users, {
    fields: [verificationTokens.userId],
    references: [users.id]
  })
}));

const schema = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  appointments,
  appointmentsRelations,
  imagingCenters,
  imagingCentersRelations,
  metrics,
  metricsRelations,
  scanResults,
  scanResultsRelations,
  userSessions,
  userSessionsRelations,
  users,
  usersRelations,
  verificationTokens,
  verificationTokensRelations
}, Symbol.toStringTag, { value: 'Module' }));

const connectionString = "postgresql://postgres:mlaTdbUSyoLJXuUMcVYXAGDCCVHDCmAb@shinkansen.proxy.rlwy.net:43460/railway";
const client = postgres(connectionString, {
  max: 10,
  // Maximum number of connections
  idle_timeout: 20,
  // Close connections after 20 seconds of inactivity
  connect_timeout: 10
  // Timeout when connecting to database
});
const db = drizzle(client, { schema });
class DatabaseService {
  // User operations
  static async getUserByEmail(email) {
    const users = await db.query.users.findFirst({
      where: (users2, { eq }) => eq(users2.email, email),
      with: {
        imagingCenter: true
      }
    });
    return users;
  }
  static async getUserById(id) {
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
      with: {
        imagingCenter: true
      }
    });
    return user;
  }
  static async createUser(userData) {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }
  // Imaging Center operations
  static async getImagingCenterByUserId(userId) {
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
  static async createImagingCenter(centerData) {
    const [center] = await db.insert(imagingCenters).values(centerData).returning();
    return center;
  }
  // Appointment operations
  static async getAppointmentsByImagingCenter(imagingCenterId, limit = 50) {
    const appointments = await db.query.appointments.findMany({
      where: (appointments2, { eq }) => eq(appointments2.imagingCenterId, imagingCenterId),
      orderBy: (appointments2, { desc }) => [desc(appointments2.scheduledDate)],
      limit,
      with: {
        scanResults: true
      }
    });
    return appointments;
  }
  static async getAppointmentById(id) {
    const appointment = await db.query.appointments.findFirst({
      where: (appointments, { eq }) => eq(appointments.id, id),
      with: {
        imagingCenter: true,
        scanResults: true
      }
    });
    return appointment;
  }
  static async createAppointment(appointmentData) {
    const [appointment] = await db.insert(appointments).values(appointmentData).returning();
    return appointment;
  }
  static async updateAppointmentStatus(id, status) {
    const [appointment] = await db.update(appointments).set({ status, updatedAt: /* @__PURE__ */ new Date() }).where((appointments, { eq }) => eq(appointments.id, id)).returning();
    return appointment;
  }
  // Dashboard metrics
  static async getDashboardStats(imagingCenterId) {
    const thirtyDaysAgo = /* @__PURE__ */ new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentAppointments = await db.query.appointments.findMany({
      where: (appointments, { eq, gte, and }) => and(
        eq(appointments.imagingCenterId, imagingCenterId),
        gte(appointments.createdAt, thirtyDaysAgo)
      )
    });
    const totalAppointments = recentAppointments.length;
    const completedAppointments = recentAppointments.filter((apt) => apt.status === "completed").length;
    const pendingAppointments = recentAppointments.filter((apt) => apt.status === "scheduled").length;
    const totalRevenue = recentAppointments.filter((apt) => apt.paymentStatus === "paid").reduce((sum, apt) => sum + Number(apt.price || 0), 0);
    const today = /* @__PURE__ */ new Date();
    const todayString = today.toISOString().split("T")[0];
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
      recentAppointments: recentAppointments.slice(0, 5),
      // Last 5 appointments
      upcomingToday: todayAppointments
    };
  }
  // Session operations (for Lucia auth)
  static async createSession(sessionData) {
    const [session] = await db.insert(userSessions).values(sessionData).returning();
    return session;
  }
  static async getSessionById(sessionId) {
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
  static async deleteSession(sessionId) {
    await db.delete(userSessions).where((sessions, { eq }) => eq(sessions.id, sessionId));
  }
  static async deleteUserSessions(userId) {
    await db.delete(userSessions).where((sessions, { eq }) => eq(sessions.userId, userId));
  }
  // Add these methods to your DatabaseService class in db.ts
  // Verification token operations
  static async storeVerificationToken(userId, token, expiresAt) {
    const [verificationToken] = await db.insert(verificationTokens).values({
      userId,
      token,
      expiresAt
    }).returning();
    return verificationToken;
  }
  static async verifyToken(token) {
    const verification = await db.query.verificationTokens.findFirst({
      where: (tokens, { eq }) => eq(tokens.token, token),
      with: {
        user: true
      }
    });
    if (!verification) {
      return null;
    }
    const now = /* @__PURE__ */ new Date();
    const expired = verification.expiresAt < now;
    const used = verification.usedAt !== null;
    return {
      ...verification,
      expired,
      used
    };
  }
  static async markTokenAsUsed(token) {
    const [updatedToken] = await db.update(verificationTokens).set({ usedAt: /* @__PURE__ */ new Date() }).where((tokens, { eq }) => eq(tokens.token, token)).returning();
    return updatedToken;
  }
  static async updateProviderStatus(userId, status) {
    const [updatedCenter] = await db.update(imagingCenters).set({ status, updatedAt: /* @__PURE__ */ new Date() }).where((centers, { eq }) => eq(centers.userId, userId)).returning();
    return updatedCenter;
  }
}

const adapter = new DrizzlePostgreSQLAdapter(db, userSessions, users);
const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: true
      // set to true in production
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
class AuthService {
  // Hash password using Argon2
  static async hashPassword(password) {
    return await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1
    });
  }
  // Verify password
  static async verifyPassword(hash2, password) {
    return await verify(hash2, password);
  }
  // Create user account
  static async createUser(data) {
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
  static async authenticateUser(email, password) {
    const user = await DatabaseService.getUserByEmail(email.toLowerCase());
    if (!user) {
      return { success: false, error: "Invalid email or password" };
    }
    if (user.isActive !== "true") {
      return { success: false, error: "Account is deactivated" };
    }
    const validPassword = await this.verifyPassword(user.passwordHash, password);
    if (!validPassword) {
      return { success: false, error: "Invalid email or password" };
    }
    return { success: true, user };
  }
  // Create session
  static async createSession(userId) {
    const session = await lucia.createSession(userId.toString(), {});
    return session;
  }
  // Validate session
  static async validateSession(sessionId) {
    try {
      const result = await lucia.validateSession(sessionId);
      return result;
    } catch (error) {
      return { session: null, user: null };
    }
  }
  // Invalidate session
  static async invalidateSession(sessionId) {
    await lucia.invalidateSession(sessionId);
  }
  // Check if user has required role
  static hasRole(user, requiredRole) {
    if (!user) return false;
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    return user.role === requiredRole;
  }
  // Get user dashboard data (existing method for imaging centers)
  static async getUserDashboardData(userId) {
    const user = await DatabaseService.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    if (user.role === "imaging_center") {
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
  static async getPatientDashboardData(userId) {
    const user = await DatabaseService.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
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
  static async getPatientProfileData(userId) {
    const user = await DatabaseService.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
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
  static async getPatientBookingData(userId) {
    const user = await DatabaseService.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return {
      availableProviders: [],
      scanTypes: [],
      patientPreferences: null
    };
  }
  // Get patient reports data
  static async getPatientReportsData(userId) {
    const user = await DatabaseService.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
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
  static async getPatientAppointmentsData(userId) {
    const user = await DatabaseService.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
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
  static async getPatientBillingData(userId) {
    const user = await DatabaseService.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
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
  static async getPatientReferralsData(userId) {
    const user = await DatabaseService.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
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
  static async getPatientEducationData(userId) {
    const user = await DatabaseService.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
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
  static async getPatientSupportData(userId) {
    const user = await DatabaseService.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
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
async function validateAuthSession(request) {
  const sessionId = extractSessionId(request);
  if (!sessionId) {
    return { session: null, user: null };
  }
  return await AuthService.validateSession(sessionId);
}
function extractSessionId(request) {
  const cookies = request.headers.get("cookie");
  if (!cookies) return null;
  const sessionCookie = cookies.split(";").find((cookie) => cookie.trim().startsWith("auth_session="));
  if (!sessionCookie) return null;
  return sessionCookie.split("=")[1];
}

export { AuthService as A, DatabaseService as D, lucia as l, validateAuthSession as v };
