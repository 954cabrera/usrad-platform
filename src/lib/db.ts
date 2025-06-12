// src/lib/db.ts
import { createClient } from '@supabase/supabase-js'

// Get Supabase credentials from environment
const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables are required')
}

// Create Supabase client
export const supabase = import { supabase } from '@/lib/supabase';
// Helper functions for common queries using Supabase client
export class DatabaseService {
  // User operations
  static async getUserByEmail(email: string) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          imagingCenter:imaging_centers(*)
        `)
        .eq('email', email)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      return data
    } catch (error) {
      console.error('Error getting user by email:', error)
      throw error
    }
  }

  static async getUserById(id: number) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          imagingCenter:imaging_centers(*)
        `)
        .eq('id', id)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      return data
    } catch (error) {
      console.error('Error getting user by ID:', error)
      throw error
    }
  }

  static async createUser(userData: any) {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert(userData)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  // Imaging Center operations
  static async getImagingCenterByUserId(userId: number) {
    try {
      const { data, error } = await supabase
        .from('imaging_centers')
        .select(`
          *,
          user:users(*),
          appointments:appointments(*)
        `)
        .eq('user_id', userId)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      return data
    } catch (error) {
      console.error('Error getting imaging center:', error)
      throw error
    }
  }

  static async createImagingCenter(centerData: any) {
    try {
      const { data, error } = await supabase
        .from('imaging_centers')
        .insert(centerData)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating imaging center:', error)
      throw error
    }
  }

  // Appointment operations
  static async getAppointmentsByImagingCenter(imagingCenterId: number, limit = 50) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          scan_results(*)
        `)
        .eq('imaging_center_id', imagingCenterId)
        .order('scheduled_date', { ascending: false })
        .limit(limit)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error getting appointments:', error)
      throw error
    }
  }

  static async getAppointmentById(id: number) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          imaging_center:imaging_centers(*),
          scan_results(*)
        `)
        .eq('id', id)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      return data
    } catch (error) {
      console.error('Error getting appointment by ID:', error)
      throw error
    }
  }

  static async createAppointment(appointmentData: any) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert(appointmentData)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating appointment:', error)
      throw error
    }
  }

  static async updateAppointmentStatus(id: number, status: string) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update({ 
          status, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating appointment status:', error)
      throw error
    }
  }

  // Dashboard metrics
  static async getDashboardStats(imagingCenterId: number) {
    try {
      // Get appointments for the last 30 days
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      
      const { data: recentAppointments, error: appointmentsError } = await supabase
        .from('appointments')
        .select('*')
        .eq('imaging_center_id', imagingCenterId)
        .gte('created_at', thirtyDaysAgo.toISOString())

      if (appointmentsError) throw appointmentsError

      // Calculate stats
      const totalAppointments = recentAppointments?.length || 0
      const completedAppointments = recentAppointments?.filter(apt => apt.status === 'completed').length || 0
      const pendingAppointments = recentAppointments?.filter(apt => apt.status === 'scheduled').length || 0
      const totalRevenue = recentAppointments
        ?.filter(apt => apt.payment_status === 'paid')
        .reduce((sum, apt) => sum + Number(apt.price || 0), 0) || 0

      // Get today's appointments
      const today = new Date()
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
      const todayEnd = new Date(todayStart)
      todayEnd.setDate(todayEnd.getDate() + 1)

      const { data: todayAppointments, error: todayError } = await supabase
        .from('appointments')
        .select('*')
        .eq('imaging_center_id', imagingCenterId)
        .gte('scheduled_date', todayStart.toISOString())
        .lt('scheduled_date', todayEnd.toISOString())
        .order('scheduled_date', { ascending: true })

      if (todayError) throw todayError

      return {
        totalAppointments,
        completedAppointments,
        pendingAppointments,
        totalRevenue,
        todayAppointments: todayAppointments?.length || 0,
        recentAppointments: recentAppointments?.slice(0, 5) || [],
        upcomingToday: todayAppointments || []
      }
    } catch (error) {
      console.error('Error getting dashboard stats:', error)
      throw error
    }
  }

  // Session operations (for Lucia auth)
  static async createSession(sessionData: {
    id: string
    user_id: number
    active_expires: number
    idle_expires: number
  }) {
    try {
      const { data, error } = await supabase
        .from('user_sessions')
        .insert(sessionData)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating session:', error)
      throw error
    }
  }

  static async getSessionById(sessionId: string) {
    try {
      const { data, error } = await supabase
        .from('user_sessions')
        .select(`
          *,
          user:users(
            *,
            imaging_center:imaging_centers(*)
          )
        `)
        .eq('id', sessionId)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      return data
    } catch (error) {
      console.error('Error getting session:', error)
      throw error
    }
  }

  static async deleteSession(sessionId: string) {
    try {
      const { error } = await supabase
        .from('user_sessions')
        .delete()
        .eq('id', sessionId)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting session:', error)
      throw error
    }
  }

  static async deleteUserSessions(userId: number) {
    try {
      const { error } = await supabase
        .from('user_sessions')
        .delete()
        .eq('user_id', userId)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting user sessions:', error)
      throw error
    }
  }

  // Verification token operations
  static async storeVerificationToken(userId: number, token: string, expiresAt: Date) {
    try {
      const { data, error } = await supabase
        .from('verification_tokens')
        .insert({
          user_id: userId,
          token,
          expires_at: expiresAt.toISOString()
        })
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error storing verification token:', error)
      throw error
    }
  }

  static async verifyToken(token: string) {
    try {
      const { data: verification, error } = await supabase
        .from('verification_tokens')
        .select(`
          *,
          user:users(*)
        `)
        .eq('token', token)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      if (!verification) return null

      const now = new Date()
      const expired = new Date(verification.expires_at) < now
      const used = verification.used_at !== null

      return {
        ...verification,
        expired,
        used
      }
    } catch (error) {
      console.error('Error verifying token:', error)
      throw error
    }
  }

  static async markTokenAsUsed(token: string) {
    try {
      const { data, error } = await supabase
        .from('verification_tokens')
        .update({ used_at: new Date().toISOString() })
        .eq('token', token)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error marking token as used:', error)
      throw error
    }
  }

  static async updateProviderStatus(userId: number, status: string) {
    try {
      const { data, error } = await supabase
        .from('imaging_centers')
        .update({ 
          status, 
          updated_at: new Date().toISOString() 
        })
        .eq('user_id', userId)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating provider status:', error)
      throw error
    }
  }
}