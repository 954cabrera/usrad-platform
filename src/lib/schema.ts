// src/lib/schema.ts
import { pgTable, serial, varchar, text, timestamp, integer, decimal, bigint } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table - handles all user types
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull(), // 'imaging_center', 'admin', 'patient'
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  phone: varchar('phone', { length: 20 }),
  isActive: varchar('is_active', { length: 10 }).default('true'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// User Sessions for Lucia Auth - FIXED VERSION
export const userSessions = pgTable('user_sessions', {
  id: varchar('id', { length: 128 }).primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull()
});

// Imaging Centers table - UPDATED WITH PROVIDER FIELDS
export const imagingCenters = pgTable('imaging_centers', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  
  // Basic info (existing)
  name: varchar('name', { length: 255 }).notNull(),
  address: text('address'),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 50 }),
  zipCode: varchar('zip_code', { length: 10 }),
  phone: varchar('phone', { length: 20 }),
  email: varchar('email', { length: 255 }),
  
  // Provider-specific fields (new)
  legalBusinessName: varchar('legal_business_name', { length: 255 }),
  dbaName: varchar('dba_name', { length: 255 }),
  taxId: varchar('tax_id', { length: 50 }),
  businessAddress: text('business_address'),
  businessPhone: varchar('business_phone', { length: 20 }),
  contactTitle: varchar('contact_title', { length: 100 }),
  
  // Services & Equipment
  services: text('services'), // JSON array: ["MRI", "CT", "Ultrasound"]
  mriFieldStrength: varchar('mri_field_strength', { length: 20 }),
  equipmentDetails: text('equipment_details'),
  
  // Operating Information
  yearsInOperation: varchar('years_in_operation', { length: 20 }),
  dailyVolume: varchar('daily_volume', { length: 20 }),
  hoursOfOperation: text('hours_of_operation'),
  
  // Banking Information
  bankName: varchar('bank_name', { length: 255 }),
  routingNumber: varchar('routing_number', { length: 20 }),
  accountNumber: varchar('account_number', { length: 50 }),
  accountType: varchar('account_type', { length: 20 }),
  
  // Provider Status Tracking
  status: varchar('status', { length: 50 }).default('psa_pending'), // Updated default
  tier: varchar('tier', { length: 20 }).default('standard'), // 'premium' or 'standard'
  
  // PSA & Credentialing
  psaUrl: varchar('psa_url', { length: 500 }), // DocuSeal PSA URL
  credentialingId: varchar('credentialing_id', { length: 100 }), // CAQH ID
  credentialingStatus: varchar('credentialing_status', { length: 50 }),
  documentsSubmitted: text('documents_submitted'), // JSON array
  
  // Existing fields (keep for backward compatibility)
  licenseNumber: varchar('license_number', { length: 100 }),
  equipment: text('equipment'), // JSON string of available equipment
  operatingHours: text('operating_hours'), // JSON string of hours
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Appointments table
export const appointments = pgTable('appointments', {
  id: serial('id').primaryKey(),
  patientName: varchar('patient_name', { length: 255 }).notNull(),
  patientEmail: varchar('patient_email', { length: 255 }),
  patientPhone: varchar('patient_phone', { length: 20 }),
  patientDateOfBirth: timestamp('patient_date_of_birth'),
  imagingCenterId: integer('imaging_center_id').references(() => imagingCenters.id).notNull(),
  scanType: varchar('scan_type', { length: 100 }).notNull(),
  scanArea: varchar('scan_area', { length: 100 }), // 'brain', 'spine', 'knee', etc.
  withContrast: varchar('with_contrast', { length: 10 }).default('false'),
  scheduledDate: timestamp('scheduled_date').notNull(),
  scheduledTime: varchar('scheduled_time', { length: 10 }), // '10:30 AM'
  duration: integer('duration').default(60), // minutes
  status: varchar('status', { length: 50 }).default('scheduled'), // 'scheduled', 'completed', 'cancelled', 'no_show'
  price: decimal('price', { precision: 10, scale: 2 }),
  paymentStatus: varchar('payment_status', { length: 50 }).default('pending'),
  referringPhysician: varchar('referring_physician', { length: 255 }),
  clinicalHistory: text('clinical_history'),
  specialInstructions: text('special_instructions'),
  confirmationNumber: varchar('confirmation_number', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Scan Results table
export const scanResults = pgTable('scan_results', {
  id: serial('id').primaryKey(),
  appointmentId: integer('appointment_id').references(() => appointments.id).notNull(),
  radiologistName: varchar('radiologist_name', { length: 255 }),
  radiologistId: varchar('radiologist_id', { length: 100 }),
  reportText: text('report_text'),
  findings: text('findings'),
  impression: text('impression'),
  recommendations: text('recommendations'),
  imageUrls: text('image_urls'), // JSON array of image URLs
  reportPdfUrl: varchar('report_pdf_url', { length: 500 }),
  status: varchar('status', { length: 50 }).default('pending'), // 'pending', 'completed', 'reviewed'
  completedAt: timestamp('completed_at'),
  reviewedAt: timestamp('reviewed_at'),
  createdAt: timestamp('created_at').defaultNow()
});

// Analytics/Metrics table for tracking
export const metrics = pgTable('metrics', {
  id: serial('id').primaryKey(),
  imagingCenterId: integer('imaging_center_id').references(() => imagingCenters.id),
  metricType: varchar('metric_type', { length: 100 }).notNull(), // 'appointments', 'revenue', 'patient_satisfaction'
  value: decimal('value', { precision: 15, scale: 2 }).notNull(),
  period: varchar('period', { length: 20 }).notNull(), // 'daily', 'weekly', 'monthly'
  date: timestamp('date').notNull(),
  metadata: text('metadata'), // JSON for additional data
  createdAt: timestamp('created_at').defaultNow()
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  imagingCenter: one(imagingCenters, {
    fields: [users.id],
    references: [imagingCenters.userId]
  }),
  sessions: many(userSessions)
}));

export const imagingCentersRelations = relations(imagingCenters, ({ one, many }) => ({
  user: one(users, {
    fields: [imagingCenters.userId],
    references: [users.id]
  }),
  appointments: many(appointments),
  metrics: many(metrics)
}));

export const appointmentsRelations = relations(appointments, ({ one, many }) => ({
  imagingCenter: one(imagingCenters, {
    fields: [appointments.imagingCenterId],
    references: [imagingCenters.id]
  }),
  scanResults: many(scanResults)
}));

export const scanResultsRelations = relations(scanResults, ({ one }) => ({
  appointment: one(appointments, {
    fields: [scanResults.appointmentId],
    references: [appointments.id]
  })
}));

export const userSessionsRelations = relations(userSessions, ({ one }) => ({
  user: one(users, {
    fields: [userSessions.userId],
    references: [users.id]
  })
}));

export const metricsRelations = relations(metrics, ({ one }) => ({
  imagingCenter: one(imagingCenters, {
    fields: [metrics.imagingCenterId],
    references: [imagingCenters.id]
  })
}));

// Type exports for use in components
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type ImagingCenter = typeof imagingCenters.$inferSelect;
export type NewImagingCenter = typeof imagingCenters.$inferInsert;
export type Appointment = typeof appointments.$inferSelect;
export type NewAppointment = typeof appointments.$inferInsert;
export type ScanResult = typeof scanResults.$inferSelect;
export type NewScanResult = typeof scanResults.$inferInsert;

// New type exports for provider status tracking
export type ImagingCenterStatus = 
  | 'psa_pending' 
  | 'psa_signed' 
  | 'credentialing_initiated'
  | 'credentialing_pending' 
  | 'credentialing_approved' 
  | 'active' 
  | 'suspended' 
  | 'terminated';

export type ImagingCenterTier = 'premium' | 'standard';