const equipmentOptions = [
    'MRI 1.5T', 'MRI 3T', 'CT Scan', 'X-Ray', 'Ultrasound', 
    'Mammography', 'Nuclear Medicine', 'PET Scan', 'Bone Density', 
    'Fluoroscopy', 'Interventional Radiology'
  ];import React, { useState, useEffect } from 'react';

const EnterpriseOnboarding = () => {
  const [supabase, setSupabase] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState(null);
  const [companyData, setCompanyData] = useState({
    legalName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    federalTaxId: '',
    agreementType: 'single' // 'single' or 'multi'
  });
  const [centers, setCenters] = useState([{
    id: 1,
    centerName: '',
    address: '',
    city: '',
    state: 'FL',
    zipCode: '',
    phone: '',
    equipment: [],
    contactName: '',
    contactEmail: ''
  }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [debugInfo, setDebugInfo] = useState('');

  // Initialize Supabase client
  useEffect(() => {
    const initSupabase = async () => {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabaseClient = createClient(
          import.meta.env.PUBLIC_SUPABASE_URL,
          import.meta.env.PUBLIC_SUPABASE_ANON_KEY
        );
        setSupabase(supabaseClient);

        // Get current user
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session) {
          window.location.href = '/providers/join';
          return;
        }
        setUser(session.user);
        
        // Pre-populate with user data
        setCompanyData(prev => ({
          ...prev,
          contactEmail: session.user.email,
          contactName: session.user.user_metadata?.contact_name || ''
        }));
      } catch (error) {
        console.error('Error initializing Supabase:', error);
        window.location.href = '/providers/join';
      }
    };

    initSupabase();
  }, []);

  const handleCompanyChange = (field, value) => {
    setCompanyData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleCenterChange = (index, field, value) => {
    setCenters(prev => prev.map((center, i) => 
      i === index ? { ...center, [field]: value } : center
    ));
  };

  const handleEquipmentToggle = (centerIndex, equipment) => {
    setCenters(prev => prev.map((center, i) => 
      i === centerIndex ? {
        ...center,
        equipment: center.equipment.includes(equipment)
          ? center.equipment.filter(e => e !== equipment)
          : [...center.equipment, equipment]
      } : center
    ));
  };

  const addCenter = () => {
    setCenters(prev => [...prev, {
      id: prev.length + 1,
      centerName: '',
      address: '',
      city: '',
      state: 'FL',
      zipCode: '',
      phone: '',
      equipment: [],
      contactName: companyData.contactName, // Pre-fill with company contact
      contactEmail: companyData.contactEmail
    }]);
  };

  const removeCenter = (index) => {
    if (centers.length > 1) {
      setCenters(prev => prev.filter((_, i) => i !== index));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!companyData.legalName) newErrors.legalName = 'Legal name required';
      if (!companyData.contactName) newErrors.contactName = 'Contact name required';
      if (!companyData.contactEmail) newErrors.contactEmail = 'Email required';
      if (!companyData.contactPhone) newErrors.contactPhone = 'Phone required';
      if (!companyData.federalTaxId) newErrors.federalTaxId = 'Federal Tax ID required';
    }
    
    if (step === 2) {
      centers.forEach((center, index) => {
        if (!center.centerName) newErrors[`center_${index}_name`] = 'Center name required';
        if (!center.address) newErrors[`center_${index}_address`] = 'Address required';
        if (!center.city) newErrors[`center_${index}_city`] = 'City required';
        if (!center.zipCode) newErrors[`center_${index}_zip`] = 'ZIP required';
        if (!center.phone) newErrors[`center_${index}_phone`] = 'Phone required';
        if (center.equipment.length === 0) newErrors[`center_${index}_equipment`] = 'Select at least one equipment type';
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(2) || !supabase) return;
    
    setIsSubmitting(true);
    setDebugInfo('Starting database operations...');
    
    try {
      console.log('Attempting to save company data:', companyData);
      setDebugInfo('Saving company information...');
      
      // Save company and centers to database
      const { data: company, error: companyError } = await supabase
        .from('provider_companies')
        .insert([{
          user_id: user.id,
          legal_name: companyData.legalName,
          contact_name: companyData.contactName,
          contact_email: companyData.contactEmail,
          contact_phone: companyData.contactPhone,
          federal_tax_id: companyData.federalTaxId,
          total_centers: centers.length,
          status: 'pending_psa'
        }])
        .select()
        .single();

      if (companyError) {
        console.error('Company creation error:', companyError);
        setDebugInfo(`Company error: ${companyError.message}`);
        throw companyError;
      }

      console.log('Company saved successfully:', company);
      setDebugInfo('Company saved. Now saving centers...');

      // Save all centers
      const centersData = centers.map(center => ({
        company_id: company.id,
        center_name: center.centerName,
        address: center.address,
        city: center.city,
        state: center.state,
        zip_code: center.zipCode,
        phone: center.phone,
        equipment: center.equipment,
        contact_name: center.contactName,
        contact_email: center.contactEmail
      }));

      console.log('Attempting to save centers:', centersData);

      const { error: centersError } = await supabase
        .from('provider_centers')
        .insert(centersData);

      if (centersError) {
        console.error('Centers creation error:', centersError);
        setDebugInfo(`Centers error: ${centersError.message}`);
        throw centersError;
      }

      console.log('Centers saved successfully');
      setDebugInfo('All data saved successfully!');
      
      // Small delay to show success message
      setTimeout(() => {
        setCurrentStep(3);
        setDebugInfo('');
      }, 1000);

    } catch (error) {
      console.error('Error saving data:', error);
      setDebugInfo(`Error: ${error.message}`);
      alert(`Error saving data: ${error.message}. Please check the console for details.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const proceedToSigning = async () => {
    try {
      // Create DocuSeal submission with all company and center data
      const response = await fetch('/api/docuseal/create-enterprise-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          template_id: 1,
          company: companyData,
          centers: centers,
          user_id: user.id
        })
      });

      const result = await response.json();
      
      if (response.ok && result.signingUrl) {
        window.location.href = result.signingUrl;
      } else {
        throw new Error(result.error || 'Failed to create signing session');
      }
    } catch (error) {
      console.error('Error creating PSA:', error);
      alert('Error processing request. Please try again.');
    }
  };

  const steps = [
    { number: 1, title: 'Company Info', desc: 'Legal entity details' },
    { number: 2, title: 'Register Centers', desc: 'Add your imaging locations' },
    { number: 3, title: 'Review & Sign', desc: 'Provider service agreement' }
  ];

  // Don't render until Supabase is initialized
  if (!supabase || !user) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#003087]"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="flex-1">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                  currentStep >= step.number ? 'bg-[#003087] text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.number ? '✓' : step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    currentStep > step.number ? 'bg-[#003087]' : 'bg-gray-200'
                  }`} />
                )}
              </div>
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-900">{step.title}</p>
                <p className="text-xs text-gray-500">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Company Information */}
      {currentStep === 1 && (
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Company Information</h2>
            <p className="text-gray-600">Legal entity that will sign the provider agreement</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Legal Company Name *
                </label>
                <input
                  type="text"
                  value={companyData.legalName}
                  onChange={(e) => handleCompanyChange('legalName', e.target.value)}
                  placeholder="Advanced Imaging Services, LLC"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003087] ${
                    errors.legalName ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.legalName && <p className="text-sm text-red-600 mt-1">{errors.legalName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Contact Name *
                </label>
                <input
                  type="text"
                  value={companyData.contactName}
                  onChange={(e) => handleCompanyChange('contactName', e.target.value)}
                  placeholder="Dr. Sarah Johnson"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003087] ${
                    errors.contactName ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.contactName && <p className="text-sm text-red-600 mt-1">{errors.contactName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email *
                </label>
                <input
                  type="email"
                  value={companyData.contactEmail}
                  onChange={(e) => handleCompanyChange('contactEmail', e.target.value)}
                  placeholder="admin@advancedimaging.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003087] ${
                    errors.contactEmail ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.contactEmail && <p className="text-sm text-red-600 mt-1">{errors.contactEmail}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Phone *
                </label>
                <input
                  type="tel"
                  value={companyData.contactPhone}
                  onChange={(e) => handleCompanyChange('contactPhone', e.target.value)}
                  placeholder="(954) 555-0123"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003087] ${
                    errors.contactPhone ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.contactPhone && <p className="text-sm text-red-600 mt-1">{errors.contactPhone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Federal Tax ID (EIN) *
                </label>
                <input
                  type="text"
                  value={companyData.federalTaxId}
                  onChange={(e) => handleCompanyChange('federalTaxId', e.target.value)}
                  placeholder="12-3456789"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003087] ${
                    errors.federalTaxId ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.federalTaxId && <p className="text-sm text-red-600 mt-1">{errors.federalTaxId}</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Register Centers */}
      {currentStep === 2 && (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Register Your Centers</h2>
            <p className="text-gray-600">Add all imaging centers that will be part of this agreement</p>
            <div className="mt-4 inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
              <span className="text-blue-600 font-medium">{centers.length} Centers Registered</span>
            </div>
          </div>

          {centers.map((center, index) => (
            <div key={center.id} className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Center {index + 1}
                  {center.centerName && <span className="text-[#003087]"> - {center.centerName}</span>}
                </h3>
                {centers.length > 1 && (
                  <button
                    onClick={() => removeCenter(index)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Center Name *
                  </label>
                  <input
                    type="text"
                    value={center.centerName}
                    onChange={(e) => handleCenterChange(index, 'centerName', e.target.value)}
                    placeholder="Advanced Imaging Center - Downtown"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003087] ${
                      errors[`center_${index}_name`] ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors[`center_${index}_name`] && (
                    <p className="text-sm text-red-600 mt-1">{errors[`center_${index}_name`]}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    value={center.address}
                    onChange={(e) => handleCenterChange(index, 'address', e.target.value)}
                    placeholder="123 Medical Plaza Dr, Suite 100"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003087] ${
                      errors[`center_${index}_address`] ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors[`center_${index}_address`] && (
                    <p className="text-sm text-red-600 mt-1">{errors[`center_${index}_address`]}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <input
                    type="text"
                    value={center.city}
                    onChange={(e) => handleCenterChange(index, 'city', e.target.value)}
                    placeholder="Miami"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003087] ${
                      errors[`center_${index}_city`] ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors[`center_${index}_city`] && (
                    <p className="text-sm text-red-600 mt-1">{errors[`center_${index}_city`]}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                  <input
                    type="text"
                    value={center.zipCode}
                    onChange={(e) => handleCenterChange(index, 'zipCode', e.target.value)}
                    placeholder="33101"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003087] ${
                      errors[`center_${index}_zip`] ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors[`center_${index}_zip`] && (
                    <p className="text-sm text-red-600 mt-1">{errors[`center_${index}_zip`]}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={center.phone}
                    onChange={(e) => handleCenterChange(index, 'phone', e.target.value)}
                    placeholder="(954) 555-0123"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003087] ${
                      errors[`center_${index}_phone`] ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors[`center_${index}_phone`] && (
                    <p className="text-sm text-red-600 mt-1">{errors[`center_${index}_phone`]}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Center Contact Name
                  </label>
                  <input
                    type="text"
                    value={center.contactName}
                    onChange={(e) => handleCenterChange(index, 'contactName', e.target.value)}
                    placeholder="Site Manager Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003087]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Equipment Available * <span className="text-gray-500">(Select all that apply)</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {equipmentOptions.map((equipment) => (
                      <label key={equipment} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={center.equipment.includes(equipment)}
                          onChange={() => handleEquipmentToggle(index, equipment)}
                          className="w-4 h-4 text-[#003087] focus:ring-[#003087] border-gray-300 rounded"
                        />
                        <span className="text-sm font-medium text-gray-700">{equipment}</span>
                      </label>
                    ))}
                  </div>
                  {errors[`center_${index}_equipment`] && (
                    <p className="text-sm text-red-600 mt-2">{errors[`center_${index}_equipment`]}</p>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="text-center">
            <button
              onClick={addCenter}
              className="inline-flex items-center px-6 py-3 border-2 border-dashed border-[#003087] text-[#003087] rounded-lg hover:bg-[#003087] hover:text-white transition-all"
            >
              <span className="text-xl mr-2">+</span>
              Add Another Center
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review & Sign */}
      {currentStep === 3 && (
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Review & Sign Agreement</h2>
            <p className="text-gray-600">Review your information and proceed to digital signature</p>
          </div>

          {/* Company Summary */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Company Information</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div><span className="text-gray-600">Legal Name:</span> <span className="font-medium ml-2">{companyData.legalName}</span></div>
              <div><span className="text-gray-600">Contact:</span> <span className="font-medium ml-2">{companyData.contactName}</span></div>
              <div><span className="text-gray-600">Email:</span> <span className="font-medium ml-2">{companyData.contactEmail}</span></div>
              <div><span className="text-gray-600">Phone:</span> <span className="font-medium ml-2">{companyData.contactPhone}</span></div>
              <div><span className="text-gray-600">Tax ID:</span> <span className="font-medium ml-2">{companyData.federalTaxId}</span></div>
              <div><span className="text-gray-600">Total Centers:</span> <span className="font-medium ml-2">{centers.length}</span></div>
            </div>
          </div>

          {/* Centers Summary */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Registered Centers</h3>
            <div className="space-y-4">
              {centers.map((center, index) => (
                <div key={index} className="border-l-4 border-[#003087] pl-4">
                  <h4 className="font-medium text-gray-900">{center.centerName}</h4>
                  <p className="text-sm text-gray-600">{center.address}, {center.city}, {center.state} {center.zipCode}</p>
                  <p className="text-sm text-gray-600">Equipment: {center.equipment.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Agreement Preview */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Provider Service Agreement Preview</h3>
            <p className="text-gray-600 mb-4">
              This agreement covers all {centers.length} registered centers under {companyData.legalName}. 
              The complete agreement will be available for review and signature in the next step.
            </p>
            <div className="bg-white p-4 rounded border">
              <p className="text-sm text-gray-700">
                ✓ Network partnership terms<br/>
                ✓ Service standards and quality requirements<br/>
                ✓ Technology integration and platform access<br/>
                ✓ Patient referral and scheduling protocols<br/>
                ✓ Billing and payment terms<br/>
                ✓ Multi-location coverage for all registered centers
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={proceedToSigning}
              className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-all transform hover:scale-105"
            >
              Proceed to Digital Signature →
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center mt-12 pt-6 border-t">
        <div>
          {currentStep > 1 && (
            <button onClick={prevStep} className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium">
              ← Back
            </button>
          )}
        </div>

        <div>
          {currentStep < 3 && (
            <button
              onClick={currentStep === 2 ? handleSubmit : nextStep}
              disabled={isSubmitting}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                isSubmitting
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#003087] text-white hover:bg-[#002266]'
              }`}
            >
              {isSubmitting ? 'Saving...' : currentStep === 2 ? 'Save & Continue' : 'Continue →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnterpriseOnboarding;