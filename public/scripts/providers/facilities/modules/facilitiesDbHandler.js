// src/scripts/providers/facilities/modules/facilitiesDbHandler.js
// DB-first handler for facilities using user_facilities table

export class FacilitiesDbHandler {
  constructor(supabase) {
    this.supabase = supabase;
  }

  /**
   * Save a facility to database
   */
  async saveFacility(facilityData) {
    try {
      // Get current user
      const { data: { user }, error: authError } = await this.supabase.auth.getUser();
      if (authError || !user) {
        throw new Error('User not authenticated');
      }

      // Map form data to user_facilities table schema
      const dbRecord = {
        user_id: user.id,
        facility_name: facilityData.name,
        street_address: facilityData.address,
        city: facilityData.city,
        state: facilityData.state,
        zip_code: facilityData.zipCode,
        phone_number: facilityData.phone,
        email: facilityData.administrator?.email || null,
        
        // Equipment/modalities
        modalities: facilityData.equipment || [],
        equipment_brands: facilityData.equipmentDetails?.map(e => e.manufacturer) || [],
        
        // Contact info
        primary_contact: facilityData.administrator?.name || null,
        contact_title: facilityData.administrator?.title || null,
        
        // Flags
        is_primary: facilityData.isPrimary || false,
        is_manual_entry: true,  // Since it's from form
        is_acr_verified: false,  // Manual entries start unverified
        
        // Additional fields
        website: facilityData.website || null,
        notes: facilityData.notes || null
      };

      console.log('💾 Saving facility to database:', dbRecord);

      // Insert or update
      const { data, error } = await this.supabase
        .from('user_facilities')
        .insert(dbRecord)
        .select()
        .single();

      if (error) {
        console.error('❌ Database save failed:', error);
        throw error;
      }

      console.log('✅ Facility saved to database:', data);
      
      // Also save to localStorage for backward compatibility
      this.updateLocalStorage(data);
      
      return { success: true, data };
      
    } catch (error) {
      console.error('❌ Error saving facility:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }
  }

  /**
   * Load all facilities for current user
   */
  async loadFacilities() {
    try {
      const { data: { user }, error: authError } = await this.supabase.auth.getUser();
      if (authError || !user) {
        console.warn('⚠️ User not authenticated, using cache only');
        return this.loadFromCache();
      }

      const { data, error } = await this.supabase
        .from('user_facilities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('❌ Error loading facilities:', error);
        return this.loadFromCache();
      }

      console.log(`✅ Loaded ${data.length} facilities from database`);
      
      // Map DB records to form format
      const facilities = data.map(this.mapDbToForm);
      
      // Update cache
      localStorage.setItem('facilities', JSON.stringify(facilities));
      localStorage.setItem('facilities_source', 'database');
      
      return facilities;
      
    } catch (error) {
      console.error('❌ Unexpected error loading facilities:', error);
      return this.loadFromCache();
    }
  }

  /**
   * Update a facility
   */
  async updateFacility(facilityId, facilityData) {
    try {
      const { data: { user }, error: authError } = await this.supabase.auth.getUser();
      if (authError || !user) {
        throw new Error('User not authenticated');
      }

      const dbRecord = {
        facility_name: facilityData.name,
        street_address: facilityData.address,
        city: facilityData.city,
        state: facilityData.state,
        zip_code: facilityData.zipCode,
        phone_number: facilityData.phone,
        email: facilityData.administrator?.email || null,
        modalities: facilityData.equipment || [],
        equipment_brands: facilityData.equipmentDetails?.map(e => e.manufacturer) || [],
        primary_contact: facilityData.administrator?.name || null,
        contact_title: facilityData.administrator?.title || null,
        is_primary: facilityData.isPrimary || false,
        website: facilityData.website || null,
        notes: facilityData.notes || null,
        is_edited: true,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await this.supabase
        .from('user_facilities')
        .update(dbRecord)
        .eq('id', facilityId)
        .eq('user_id', user.id)  // Security: ensure user owns this facility
        .select()
        .single();

      if (error) throw error;

      console.log('✅ Facility updated:', data);
      
      // Update local storage
      await this.loadFacilities();  // Reload all to sync
      
      return { success: true, data };
      
    } catch (error) {
      console.error('❌ Error updating facility:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Delete a facility
   */
  async deleteFacility(facilityId) {
    try {
      const { data: { user }, error: authError } = await this.supabase.auth.getUser();
      if (authError || !user) {
        throw new Error('User not authenticated');
      }

      const { error } = await this.supabase
        .from('user_facilities')
        .delete()
        .eq('id', facilityId)
        .eq('user_id', user.id);  // Security check

      if (error) throw error;

      console.log('✅ Facility deleted:', facilityId);
      
      // Reload facilities
      await this.loadFacilities();
      
      return { success: true };
      
    } catch (error) {
      console.error('❌ Error deleting facility:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Map database record to form format
   */
  mapDbToForm(dbRecord) {
    return {
      id: dbRecord.id,
      name: dbRecord.facility_name,
      address: dbRecord.street_address || dbRecord.facility_address,
      city: dbRecord.city,
      state: dbRecord.state,
      zipCode: dbRecord.zip_code,
      phone: dbRecord.phone_number || dbRecord.facility_phone,
      equipment: dbRecord.modalities || [],
      equipmentDetails: dbRecord.equipment_brands?.map(brand => ({
        manufacturer: brand,
        // Add other equipment details if available
      })) || [],
      isPrimary: dbRecord.is_primary || false,
      administrator: {
        name: dbRecord.primary_contact,
        title: dbRecord.contact_title,
        email: dbRecord.email,
        phone: dbRecord.phone_number
      },
      website: dbRecord.website,
      notes: dbRecord.notes
    };
  }

  /**
   * Update localStorage for backward compatibility
   */
  updateLocalStorage(newFacility) {
    try {
      const facilities = JSON.parse(localStorage.getItem('facilities') || '[]');
      const formattedFacility = this.mapDbToForm(newFacility);
      
      // Check if updating existing
      const existingIndex = facilities.findIndex(f => f.id === newFacility.id);
      if (existingIndex >= 0) {
        facilities[existingIndex] = formattedFacility;
      } else {
        facilities.push(formattedFacility);
      }
      
      localStorage.setItem('facilities', JSON.stringify(facilities));
      localStorage.setItem('facilities_last_sync', new Date().toISOString());
    } catch (error) {
      console.warn('Failed to update localStorage:', error);
    }
  }

  /**
   * Load from cache when DB unavailable
   */
  loadFromCache() {
    const cached = localStorage.getItem('facilities');
    if (cached) {
      console.log('📦 Loading facilities from cache');
      return JSON.parse(cached);
    }
    return [];
  }
}