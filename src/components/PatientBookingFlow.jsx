import React, { useState, useEffect } from 'react';

const PatientBookingFlow = ({ facilityId, procedure, cptCode, price }) => {
  const [currentStep, setCurrentStep] = useState('patient-info');
  const [appointmentData, setAppointmentData] = useState({
    patient: {},
    appointment: {},
    payment: {},
    prescription: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [facilityData, setFacilityData] = useState(null);
  const [showTestButton, setShowTestButton] = useState(true);
  
  // Test data for quick population
  const testData = {
    patient: {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      dateOfBirth: '1985-06-15',
      address: '123 Main Street',
      city: 'Miami',
      state: 'FL',
      zipCode: '33101'
    },
    appointment: {
      preferredDate1: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
      preferredTime1: 'morning',
      preferredDate2: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 8 days from now
      preferredTime2: 'afternoon',
      preferredDate3: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 9 days from now
      preferredTime3: 'evening',
      specialRequests: 'Please call to confirm appointment time',
      hasSymptoms: false,
      symptomDescription: ''
    },
    payment: {
      nameOnCard: 'John Smith',
      cardNumber: '4111 1111 1111 1111',
      expiryDate: '12/26',
      cvv: '123'
    },
    prescription: 'test-file'
  };

  const fillTestData = () => {
    setAppointmentData({
      patient: testData.patient,
      appointment: testData.appointment,
      payment: testData.payment,
      prescription: testData.prescription
    });
    
    // Set test mode flag
    localStorage.setItem('usrad_test_mode', 'true');
    
    setShowTestButton(false);
    alert('✅ Test data populated! You can now quickly navigate through all steps.');
    
    // Trigger a re-render of current step components
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  
  // Fetch real facility data
  useEffect(() => {
    const fetchFacilityData = async () => {
      try {
        const response = await fetch(`/api/facilities/${facilityId}`);
        if (response.ok) {
          const data = await response.json();
          setFacilityData(data);
        }
      } catch (error) {
        console.error('Failed to fetch facility data:', error);
      }
    };
    
    if (facilityId) {
      fetchFacilityData();
    }
  }, [facilityId]);

  // Format complete address
  const formatAddress = (facilityData) => {
    if (!facilityData) return 'Loading address...';
    
    const parts = [];
    if (facilityData.address) parts.push(facilityData.address);
    if (facilityData.city) parts.push(facilityData.city);
    if (facilityData.state) parts.push(facilityData.state);
    if (facilityData.zip_code) parts.push(facilityData.zip_code);
    
    return parts.length > 0 ? parts.join(', ') : 'Address not available';
  };

  const selectedProvider = {
    id: facilityId,
    name: facilityData?.name || 'Loading facility...',
    address: formatAddress(facilityData),
    phone: '1-866-USRad-24 (1-866-877-2324)',
    procedure: procedure || 'MRI Brain without contrast',
    cpt_code: cptCode || '70551',
    usrad_price: parseFloat(price) || 323.63,
  };

  const steps = [
    { id: 'patient-info', title: 'Patient Information' },
    { id: 'appointment-details', title: 'Appointment Preferences' },
    { id: 'prescription-upload', title: 'Prescription/Referral' },
    { id: 'payment', title: 'Payment Information' },
    { id: 'confirmation', title: 'Confirmation' }
  ];

  const handleStepComplete = (stepData) => {
    setAppointmentData(prev => ({
      ...prev,
      ...stepData
    }));
    
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const submitBookingRequest = async () => {
    setIsLoading(true);
    
    try {
      // Check if we're in test mode
      const isTestMode = localStorage.getItem('usrad_test_mode') === 'true';
      
      if (isTestMode) {
        // Simulate API call for testing
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep('confirmation');
        setIsLoading(false);
        return;
      }
      
      const bookingData = {
        facilityId: facilityId,
        cptCode: cptCode,
        procedureName: procedure,
        paymentAmount: selectedProvider.usrad_price,
        patient: appointmentData.patient,
        appointment: appointmentData.appointment,
        payment: appointmentData.payment,
        prescription: appointmentData.prescription
      };

      const response = await fetch('/api/booking/create-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });

      const result = await response.json();
      
      if (result.success) {
        setCurrentStep('confirmation');
      } else {
        alert('Booking failed: ' + result.error);
      }
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed: ' + error.message + '\n\nTip: Make sure your API endpoint exists at /api/booking/create-request.js');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', position: 'relative' }}>
      
      {/* Test Data Button - Fixed Position */}
      {showTestButton && (
        <button
          onClick={fillTestData}
          style={{
            position: 'fixed',
            top: '50%',
            right: '20px',
            transform: 'translateY(-50%)',
            backgroundColor: '#f59e0b',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)',
            zIndex: 1000,
            transition: 'all 0.2s ease',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#d97706';
            e.target.style.transform = 'translateY(-50%) scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#f59e0b';
            e.target.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          🧪 Fill Test Data
        </button>
      )}

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
          Book Your Appointment
        </h1>
        <p style={{ color: '#6b7280' }}>Complete your booking in just a few simple steps</p>
        
        {!showTestButton && (
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: '#fef3c7',
            border: '1px solid #fbbf24',
            borderRadius: '6px',
            fontSize: '0.875rem',
            color: '#92400e'
          }}>
            🧪 <strong>Test Mode:</strong> Forms are pre-filled with dummy data for quick testing
          </div>
        )}
      </div>

      {/* Progress Indicator */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
            
            return (
              <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isCompleted ? '#10b981' : isActive ? '#3b82f6' : '#d1d5db',
                  color: 'white',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 'bold'
                }}>
                  {index + 1}
                </div>
                <span style={{
                  fontSize: '0.75rem',
                  textAlign: 'center',
                  color: isActive ? '#3b82f6' : '#6b7280',
                  fontWeight: isActive ? '600' : 'normal'
                }}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Provider Summary */}
      <div style={{ 
        backgroundColor: '#eff6ff', 
        border: '1px solid #bfdbfe', 
        borderRadius: '8px', 
        padding: '1rem', 
        marginBottom: '1.5rem' 
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <div>
            <h3 style={{ fontWeight: '600', color: '#1f2937' }}>
              <span style={{ color: '#003087', fontWeight: 'bold' }}>USRad</span>/{selectedProvider.name}
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0.25rem 0' }}>
              📍 {selectedProvider.address}
            </p>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0.25rem 0' }}>
              📞 {selectedProvider.phone}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#10b981' }}>
              ${selectedProvider.usrad_price}
            </p>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>You save $876</p>
          </div>
        </div>
        <div style={{ marginTop: '0.75rem' }}>
          <p style={{ fontWeight: '500', color: '#1f2937' }}>{selectedProvider.procedure}</p>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>CPT Code: {selectedProvider.cpt_code}</p>
        </div>
      </div>

      {/* Step Content */}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1.5rem' }}>
        {currentStep === 'patient-info' && (
          <PatientInfoStep onComplete={handleStepComplete} />
        )}
        
        {currentStep === 'appointment-details' && (
          <AppointmentDetailsStep onComplete={handleStepComplete} />
        )}
        
        {currentStep === 'prescription-upload' && (
          <PrescriptionUploadStep onComplete={handleStepComplete} />
        )}
        
        {currentStep === 'payment' && (
          <PaymentStep 
            provider={selectedProvider} 
            onComplete={submitBookingRequest}
            isLoading={isLoading}
          />
        )}
        
        {currentStep === 'confirmation' && (
          <ConfirmationStep appointmentData={appointmentData} provider={selectedProvider} />
        )}
      </div>
    </div>
  );
};

// Patient Info Step - WORKING
const PatientInfoStep = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: 'FL',
    zipCode: ''
  });

  // Auto-populate if test data exists in parent
  useEffect(() => {
    const testPatientData = {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      dateOfBirth: '1985-06-15',
      address: '123 Main Street',
      city: 'Miami',
      state: 'FL',
      zipCode: '33101'
    };
    
    // Check if we're in test mode by looking for specific test values
    if (window.location.search.includes('test=true') || localStorage.getItem('usrad_test_mode') === 'true') {
      setFormData(testPatientData);
    }
  }, []);

  const handleSubmit = () => {
    if (formData.firstName && formData.lastName && formData.email && formData.phone && formData.dateOfBirth) {
      onComplete({ patient: formData });
    } else {
      alert('Please fill in all required fields');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '0.875rem'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '0.25rem'
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
        Patient Information
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={labelStyle}>First Name *</label>
          <input
            type="text"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            style={inputStyle}
          />
        </div>
        
        <div>
          <label style={labelStyle}>Last Name *</label>
          <input
            type="text"
            required
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            style={inputStyle}
          />
        </div>
        
        <div>
          <label style={labelStyle}>Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            style={inputStyle}
          />
        </div>
        
        <div>
          <label style={labelStyle}>Phone *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            style={inputStyle}
            placeholder="(555) 123-4567"
          />
        </div>
        
        <div>
          <label style={labelStyle}>Date of Birth *</label>
          <input
            type="date"
            required
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
            style={inputStyle}
          />
        </div>
        
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Street Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            style={inputStyle}
          />
        </div>
        
        <div>
          <label style={labelStyle}>City</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({...formData, city: e.target.value})}
            style={inputStyle}
          />
        </div>
        
        <div>
          <label style={labelStyle}>State</label>
          <select
            value={formData.state}
            onChange={(e) => setFormData({...formData, state: e.target.value})}
            style={inputStyle}
          >
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
          </select>
        </div>
        
        <div>
          <label style={labelStyle}>ZIP Code</label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
            style={inputStyle}
          />
        </div>
      </div>
      
      <button
        onClick={handleSubmit}
        style={{
          width: '100%',
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '6px',
          border: 'none',
          fontWeight: '500',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        Continue to Appointment Details
      </button>
    </div>
  );
};

// Appointment Details Step - WORKING
const AppointmentDetailsStep = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    preferredDate1: '',
    preferredTime1: '',
    preferredDate2: '',
    preferredTime2: '',
    preferredDate3: '',
    preferredTime3: '',
    specialRequests: '',
    hasSymptoms: false,
    symptomDescription: ''
  });

  const fillAppointmentTestData = () => {
    const testAppointmentData = {
      preferredDate1: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
      preferredTime1: 'morning',
      preferredDate2: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 8 days from now
      preferredTime2: 'afternoon',
      preferredDate3: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 9 days from now
      preferredTime3: 'evening',
      specialRequests: 'Please call to confirm appointment time',
      hasSymptoms: false,
      symptomDescription: ''
    };
    
    setFormData(testAppointmentData);
  };

  const handleSubmit = () => {
    if (formData.preferredDate1 && formData.preferredTime1) {
      onComplete({ appointment: formData });
    } else {
      alert('Please select at least one preferred date and time');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '0.875rem'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '0.25rem'
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Step-specific test data button */}
      <button
        onClick={fillAppointmentTestData}
        style={{
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          backgroundColor: '#10b981',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '6px',
          border: 'none',
          fontSize: '0.75rem',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
          zIndex: 100,
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#059669';
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#10b981';
          e.target.style.transform = 'scale(1)';
        }}
      >
        📅 Fill Dates
      </button>

      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
        Appointment Preferences
      </h2>
      
      <div style={{ backgroundColor: '#fef3c7', border: '1px solid #fbbf24', borderRadius: '6px', padding: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.875rem', color: '#92400e' }}>
          <strong>Response Time:</strong> We'll confirm your appointment within 4 hours. 
          Please provide multiple preferred times to ensure we can accommodate your schedule.
        </p>
      </div>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '500', color: '#1f2937', marginBottom: '1rem' }}>
          Preferred Appointment Times
        </h3>
        
        {[1, 2, 3].map((num) => (
          <div key={num} style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '1rem', 
            padding: '1rem', 
            border: '1px solid #e5e7eb', 
            borderRadius: '6px', 
            marginBottom: '1rem' 
          }}>
            <div>
              <label style={labelStyle}>
                Option {num} - Preferred Date {num === 1 ? '*' : ''}
              </label>
              <input
                type="date"
                required={num === 1}
                min={new Date().toISOString().split('T')[0]}
                value={formData[`preferredDate${num}`]}
                onChange={(e) => setFormData({...formData, [`preferredDate${num}`]: e.target.value})}
                style={inputStyle}
              />
            </div>
            
            <div>
              <label style={labelStyle}>
                Preferred Time {num === 1 ? '*' : ''}
              </label>
              <select
                required={num === 1}
                value={formData[`preferredTime${num}`]}
                onChange={(e) => setFormData({...formData, [`preferredTime${num}`]: e.target.value})}
                style={inputStyle}
              >
                <option value="">Select Time</option>
                <option value="early-morning">Early Morning (7:00 AM - 9:00 AM)</option>
                <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                <option value="afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                <option value="evening">Evening (4:00 PM - 7:00 PM)</option>
                <option value="flexible">Flexible - Any time</option>
              </select>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Special Requests or Accommodations</label>
        <textarea
          value={formData.specialRequests}
          onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
          rows={3}
          style={{...inputStyle, resize: 'vertical'}}
          placeholder="Wheelchair access, language interpreter, specific positioning needs, etc."
        />
      </div>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <input
            type="checkbox"
            checked={formData.hasSymptoms}
            onChange={(e) => setFormData({...formData, hasSymptoms: e.target.checked})}
            style={{ marginRight: '0.5rem' }}
          />
          <label style={{ fontSize: '0.875rem', color: '#374151' }}>
            I have claustrophobia or anxiety about enclosed spaces
          </label>
        </div>
        
        {formData.hasSymptoms && (
          <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px', padding: '1rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#1e40af', marginBottom: '0.5rem' }}>
              <strong>No problem!</strong> Please let the imaging center know about your claustrophobia when scheduling. 
              Many centers offer:
            </p>
            <ul style={{ fontSize: '0.875rem', color: '#1e40af', margin: '0', paddingLeft: '1.25rem' }}>
              <li>Open MRI machines (if available for your procedure)</li>
              <li>Relaxation techniques and coaching</li>
              <li>Sedation options (discuss with your doctor)</li>
              <li>Bringing a support person</li>
            </ul>
          </div>
        )}
      </div>
      
      <button
        onClick={handleSubmit}
        style={{
          width: '100%',
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '6px',
          border: 'none',
          fontWeight: '500',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        Continue to Prescription Upload
      </button>
    </div>
  );
};

// Prescription Upload Step - WORKING
const PrescriptionUploadStep = ({ onComplete }) => {
  const [hasPrescription, setHasPrescription] = useState(true);
  const [uploadedFile, setUploadedFile] = useState(null);

  const fillPrescriptionTestData = () => {
    setHasPrescription(true);
    // Create a mock file object for testing
    const mockFile = new File(['test content'], 'test-prescription.pdf', { type: 'application/pdf' });
    setUploadedFile(mockFile);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSubmit = () => {
    onComplete({ 
      prescription: hasPrescription ? uploadedFile : null,
      noPrescriptionReason: !hasPrescription ? 'patient-obtaining' : null
    });
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Step-specific test data button */}
      <button
        onClick={fillPrescriptionTestData}
        style={{
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          backgroundColor: '#8b5cf6',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '6px',
          border: 'none',
          fontSize: '0.75rem',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)',
          zIndex: 100,
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#7c3aed';
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#8b5cf6';
          e.target.style.transform = 'scale(1)';
        }}
      >
        📄 Add File
      </button>

      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
        Prescription or Referral
      </h2>
      
      <div style={{ backgroundColor: '#dbeafe', border: '1px solid #93c5fd', borderRadius: '6px', padding: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.875rem', color: '#1e40af' }}>
          <strong>Required:</strong> Most imaging procedures require a prescription or referral from a healthcare provider. 
          The imaging center will verify your prescription before your appointment.
        </p>
      </div>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="radio"
              name="prescriptionStatus"
              checked={hasPrescription}
              onChange={() => setHasPrescription(true)}
              style={{ marginRight: '0.5rem' }}
            />
            <span style={{ fontSize: '0.875rem', color: '#374151' }}>
              I have a prescription/referral to upload
            </span>
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="radio"
              name="prescriptionStatus"
              checked={!hasPrescription}
              onChange={() => setHasPrescription(false)}
              style={{ marginRight: '0.5rem' }}
            />
            <span style={{ fontSize: '0.875rem', color: '#374151' }}>
              I will obtain a prescription
            </span>
          </label>
        </div>
        
        {hasPrescription ? (
          <div style={{
            border: '2px dashed #d1d5db',
            borderRadius: '8px',
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: '#f9fafb'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
            <div>
              <label htmlFor="prescription-upload" style={{ cursor: 'pointer' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>
                  Upload your prescription or referral
                </span>
                <span style={{ display: 'block', fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                  PDF, JPG, PNG up to 10MB
                </span>
              </label>
              <input
                id="prescription-upload"
                name="prescription-upload"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </div>
            
            {uploadedFile && (
              <div style={{
                marginTop: '1rem',
                padding: '0.75rem',
                backgroundColor: '#d1fae5',
                border: '1px solid #a7f3d0',
                borderRadius: '6px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#065f46', marginRight: '0.5rem' }}>✓</span>
                  <span style={{ fontSize: '0.875rem', color: '#065f46' }}>{uploadedFile.name}</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div style={{
            backgroundColor: '#fef3c7',
            border: '1px solid #fbbf24',
            borderRadius: '6px',
            padding: '1rem'
          }}>
            <p style={{ fontSize: '0.875rem', color: '#92400e' }}>
              <strong>Note:</strong> You can still book your appointment, but you'll need to provide a valid prescription 
              before your scheduled imaging appointment. We recommend contacting your doctor now to request the referral.
            </p>
          </div>
        )}
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={hasPrescription && !uploadedFile}
        style={{
          width: '100%',
          backgroundColor: (hasPrescription && !uploadedFile) ? '#9ca3af' : '#3b82f6',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '6px',
          border: 'none',
          fontWeight: '500',
          cursor: (hasPrescription && !uploadedFile) ? 'not-allowed' : 'pointer',
          fontSize: '1rem'
        }}
      >
        Continue to Payment
      </button>
    </div>
  );
};

// Payment Step - WORKING
const PaymentStep = ({ provider, onComplete, isLoading }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const fillPaymentTestData = () => {
    setCardData({
      nameOnCard: 'John Smith',
      cardNumber: '4111 1111 1111 1111',
      expiryDate: '12/26',
      cvv: '123'
    });
    setPaymentMethod('card');
  };

  const handleSubmit = () => {
    if (cardData.nameOnCard && cardData.cardNumber && cardData.expiryDate && cardData.cvv) {
      onComplete({ payment: { method: paymentMethod, ...cardData } });
    } else {
      alert('Please fill in all payment details');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '0.875rem'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '0.25rem'
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Step-specific test data button */}
      <button
        onClick={fillPaymentTestData}
        style={{
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          backgroundColor: '#ef4444',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '6px',
          border: 'none',
          fontSize: '0.75rem',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
          zIndex: 100,
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#dc2626';
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#ef4444';
          e.target.style.transform = 'scale(1)';
        }}
      >
        💳 Fill Card
      </button>

      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
        Payment Information
      </h2>
      
      {/* Pricing Summary */}
      <div style={{
        backgroundColor: '#f9fafb',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ fontWeight: '500', color: '#1f2937', marginBottom: '0.75rem' }}>Pricing Summary</h3>
        <div style={{ marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{provider.procedure}</span>
            <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>${provider.usrad_price}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#10b981' }}>
            <span>Hospital Price</span>
            <span style={{ textDecoration: 'line-through' }}>$1,200.00</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#10b981', fontWeight: '500' }}>
            <span>Your Savings</span>
            <span>$876 (73% off)</span>
          </div>
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: '500', color: '#1f2937' }}>Total Due Today</span>
              <span style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#1f2937' }}>
                ${provider.usrad_price}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Payment Method Selection */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontWeight: '500', color: '#1f2937', marginBottom: '0.75rem' }}>Payment Method</h3>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{ marginRight: '0.5rem' }}
            />
            <span style={{ fontSize: '0.875rem', color: '#374151' }}>Credit/Debit Card</span>
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="radio"
              name="paymentMethod"
              value="hsa"
              checked={paymentMethod === 'hsa'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{ marginRight: '0.5rem' }}
            />
            <span style={{ fontSize: '0.875rem', color: '#374151' }}>HSA/FSA Card</span>
          </label>
        </div>
      </div>
      
      {/* Card Details */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Name on Card *</label>
          <input
            type="text"
            required
            value={cardData.nameOnCard}
            onChange={(e) => setCardData({...cardData, nameOnCard: e.target.value})}
            style={inputStyle}
          />
        </div>
        
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Card Number *</label>
          <input
            type="text"
            required
            value={cardData.cardNumber}
            onChange={(e) => setCardData({...cardData, cardNumber: e.target.value})}
            placeholder="1234 5678 9012 3456"
            style={inputStyle}
          />
        </div>
        
        <div>
          <label style={labelStyle}>Expiry Date *</label>
          <input
            type="text"
            required
            value={cardData.expiryDate}
            onChange={(e) => setCardData({...cardData, expiryDate: e.target.value})}
            placeholder="MM/YY"
            style={inputStyle}
          />
        </div>
        
        <div>
          <label style={labelStyle}>CVV *</label>
          <input
            type="text"
            required
            value={cardData.cvv}
            onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
            placeholder="123"
            style={inputStyle}
          />
        </div>
      </div>
      
      {/* Terms and Conditions */}
      <div style={{
        fontSize: '0.75rem',
        color: '#6b7280',
        backgroundColor: '#f9fafb',
        padding: '0.75rem',
        borderRadius: '6px',
        marginBottom: '1.5rem'
      }}>
        <p style={{ marginBottom: '0.5rem' }}>
          <strong>Payment Policy:</strong> Payment is required to secure your appointment. 
          Your card will be charged immediately upon booking confirmation.
        </p>
        <p>
          <strong>Cancellation Policy:</strong> Full refund if cancelled more than 24 hours before appointment. 
          Cancellations within 24 hours may be subject to a cancellation fee.
        </p>
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        style={{
          width: '100%',
          backgroundColor: isLoading ? '#9ca3af' : '#3b82f6',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '6px',
          border: 'none',
          fontWeight: '500',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isLoading ? (
          <>
            <div style={{
              width: '1.25rem',
              height: '1.25rem',
              border: '2px solid #ffffff',
              borderTop: '2px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginRight: '0.5rem'
            }}></div>
            Processing Payment...
          </>
        ) : (
          `Pay $${provider.usrad_price} & Complete Booking`
        )}
      </button>
    </div>
  );
};

// Confirmation Step - WORKING
const ConfirmationStep = ({ appointmentData, provider }) => {
    const bookingId = 'USR-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '64px',
          height: '64px',
          backgroundColor: '#10b981',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem',
          color: 'white',
          fontSize: '2rem'
        }}>
          ✓
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
            Booking Request Submitted!
          </h2>
          <p style={{ color: '#6b7280' }}>
            Your appointment request has been sent to <span style={{ color: '#003087', fontWeight: '600' }}>USRad</span>. 
            We'll confirm your appointment with {provider.name} within 4 hours.
          </p>
        </div>
        
        <div style={{
          backgroundColor: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '8px',
          padding: '1.5rem',
          textAlign: 'left',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>Booking Details</h3>
          <div style={{ fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: '#6b7280' }}>Booking ID:</span>
              <span style={{ fontWeight: '500' }}>{bookingId}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: '#6b7280' }}>Patient:</span>
              <span style={{ fontWeight: '500' }}>{appointmentData.patient?.firstName} {appointmentData.patient?.lastName}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: '#6b7280' }}>Procedure:</span>
              <span style={{ fontWeight: '500' }}>{provider.procedure}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: '#6b7280' }}>Location:</span>
              <span style={{ fontWeight: '500' }}>
                <span style={{ color: '#003087', fontWeight: '600' }}>USRad</span> via {provider.name}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6b7280' }}>Amount Paid:</span>
              <span style={{ fontWeight: '500' }}>${provider.usrad_price}</span>
            </div>
          </div>
        </div>
        
        <div style={{
          backgroundColor: '#fef3c7',
          border: '1px solid #fbbf24',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.25rem', marginRight: '0.5rem' }}>🕐</span>
            <div style={{ fontSize: '0.875rem', color: '#92400e', textAlign: 'left' }}>
              <p style={{ fontWeight: '500', marginBottom: '0.25rem' }}>Next Steps:</p>
              <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                <li>USRad will contact you within 4 hours to confirm your appointment time</li>
                <li>We'll coordinate directly with {provider.name.replace(/^(Cleveland Clinic Indian River Hospital|.*?)/, provider.name.includes('Cleveland Clinic') ? 'the imaging center' : provider.name)}</li>
                <li>Check your email for detailed appointment instructions</li>
                <li>Bring a valid ID and your insurance card to your appointment</li>
                <li>Arrive 15 minutes early for check-in</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button 
            onClick={() => {
              // Auto-populate parameters for my-bookings page
              const params = new URLSearchParams({
                bookingId: bookingId,
                email: appointmentData.patient?.email || '',
                autoLookup: 'true' // Flag to trigger automatic search
              });
              window.location.href = `/my-bookings?${params.toString()}`;
            }}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              border: 'none',
              fontWeight: '500',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            View My Bookings
          </button>
          <button 
            onClick={() => window.location.href = '/search-test'}
            style={{
              backgroundColor: '#e5e7eb',
              color: '#374151',
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              border: 'none',
              fontWeight: '500',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  };
  
  export default PatientBookingFlow;