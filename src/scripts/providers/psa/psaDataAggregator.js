// src/scripts/providers/psa/psaDataAggregator.js
import { StorageHelpers } from '../shared/storage.js';

export class PSADataAggregator {
  static gatherAllData() {
    // Get organization data
    const orgData = StorageHelpers.load(StorageHelpers.KEYS.PROVIDER_ORGANIZATION) || {};
    
    // Get centers data
    const centers = StorageHelpers.load(StorageHelpers.KEYS.PROVIDER_CENTERS) || [];
    
    // Get pricing data
    const pricing = StorageHelpers.load('selected_rate_strategy') || {};
    
    // Get primary center (first center marked as primary or first in list)
    const primaryCenter = centers.find(c => c.isPrimary) || centers[0] || {};
    
    return {
      // Organization Information
      organization: {
        legalName: orgData.legalName || '',
        dba: orgData.dba || '',
        taxId: orgData.taxId || '',
        businessType: orgData.businessType || '',
        yearEstablished: orgData.yearEstablished || '',
        address: orgData.address || {}
      },
      
      // Signer Information
      signer: {
        firstName: orgData.signer?.firstName || '',
        lastName: orgData.signer?.lastName || '',
        fullName: orgData.signer?.fullName || '',
        title: orgData.signer?.title || '',
        email: orgData.signer?.email || '',
        phone: orgData.signer?.phone || ''
      },
      
      // Primary Facility Information
      primaryFacility: {
        name: primaryCenter.name || '',
        address: primaryCenter.address || '',
        city: primaryCenter.city || '',
        state: primaryCenter.state || '',
        zipCode: primaryCenter.zipCode || '',
        phone: primaryCenter.phone || '',
        administrator: primaryCenter.administrator || {}
      },
      
      // All Centers
      centers: centers,
      totalCenters: centers.length,
      
      // Pricing Information
      pricing: {
        percentage: pricing.percentage || 100,
        estimatedVolume: pricing.volume || '',
        estimatedRevenue: pricing.revenue || ''
      },
      
      // Agreement Details
      agreement: {
        effectiveDate: new Date().toISOString().split('T')[0],
        totalAuthorizedLocations: centers.length.toString()
      }
    };
  }

  static formatForDocuSeal() {
    const data = this.gatherAllData();
    
    // Format data specifically for DocuSeal fields
    return {
      // Provider Information
      provider_name: data.organization.legalName,
      provider_dba: data.organization.dba,
      provider_tax_id: data.organization.taxId,
      provider_type: data.organization.businessType,
      provider_year_established: data.organization.yearEstablished,
      
      // Provider Address
      provider_address: data.organization.address.street,
      provider_city: data.organization.address.city,
      provider_state: data.organization.address.state,
      provider_zip: data.organization.address.zip,
      
      // Signer Information
      signer_first_name: data.signer.firstName,
      signer_last_name: data.signer.lastName,
      signer_full_name: data.signer.fullName,
      signer_title: data.signer.title,
      signer_email: data.signer.email,
      signer_phone: data.signer.phone,
      
      // Primary Facility
      primary_facility_name: data.primaryFacility.name,
      primary_facility_address: data.primaryFacility.address,
      primary_facility_city: data.primaryFacility.city,
      primary_facility_state: data.primaryFacility.state,
      primary_facility_zip: data.primaryFacility.zipCode,
      primary_facility_phone: data.primaryFacility.phone,
      primary_facility_admin_name: data.primaryFacility.administrator.name,
      primary_facility_admin_email: data.primaryFacility.administrator.email,
      primary_facility_admin_phone: data.primaryFacility.administrator.phone,
      
      // Agreement Details
      agreement_date: data.agreement.effectiveDate,
      total_authorized_locations: data.agreement.totalAuthorizedLocations,
      
      // Pricing
      medicare_rate_percentage: data.pricing.percentage.toString()
    };
  }
}