// src/components/Providers/hooks/usePSAData.js
import { useState, useCallback } from 'react';
import { PSA_CONFIG } from '../../../scripts/providers/psa/psa.config';

export function usePSAData() {
  const [psaData, setPsaData] = useState(null);

  const loadOnboardingData = useCallback(() => {
    try {
      console.log('Loading onboarding data from localStorage...');

      const orgDataStr = localStorage.getItem(PSA_CONFIG.STORAGE_KEYS.ORGANIZATION);
      const orgData = orgDataStr ? JSON.parse(orgDataStr) : {};

      const centersStr = localStorage.getItem(PSA_CONFIG.STORAGE_KEYS.CENTERS);
      const centers = centersStr ? JSON.parse(centersStr) : [];

      const pricingStr = localStorage.getItem(PSA_CONFIG.STORAGE_KEYS.PRICING);
      const pricing = pricingStr ? JSON.parse(pricingStr) : {};

      const primaryCenter = centers.find(c => c.isPrimary) || centers[0] || {};

      const data = {
        organization: orgData,
        centers: centers,
        primaryCenter: primaryCenter,
        pricing: pricing,
        signer: orgData.signer || {}
      };

      console.log('📊 Loaded onboarding data:', data);
      setPsaData(data);
      return data;
    } catch (error) {
      console.error('Error loading onboarding data:', error);
      return null;
    }
  }, []);

  return { psaData, loadOnboardingData };
}