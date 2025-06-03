import React, { useState } from 'react';

const PatientBookingSystem = () => {
  const [selectedScanType, setSelectedScanType] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [searchLocation, setSearchLocation] = useState('Miramar, FL');
  const [activeStep, setActiveStep] = useState(1);

  // Mock scan types with pricing
  const scanTypes = [
    {
      id: 'brain-mri',
      name: 'Brain MRI',
      icon: '🧠',
      description: 'Detailed brain imaging for neurological conditions',
      duration: '45-60 minutes',
      usradPrice: '$450',
      hospitalPrice: '$1,650',
      savings: '$1,200',
      preparation: 'Remove all metal objects. Arrive 30 minutes early.',
      withContrast: true
    },
    {
      id: 'knee-mri',
      name: 'Knee MRI',
      icon: '🦵',
      description: 'Comprehensive knee joint and soft tissue imaging',
      duration: '30-45 minutes',
      usradPrice: '$380',
      hospitalPrice: '$1,330',
      savings: '$950',
      preparation: 'Wear comfortable clothing. No special preparation required.',
      withContrast: false
    },
    {
      id: 'chest-ct',
      name: 'Chest CT',
      icon: '🫁',
      description: 'High-resolution chest and lung imaging',
      duration: '15-30 minutes',
      usradPrice: '$320',
      hospitalPrice: '$1,170',
      savings: '$850',
      preparation: 'Fast for 4 hours if contrast is required.',
      withContrast: true
    },
    {
      id: 'spine-mri',
      name: 'Spine MRI',
      icon: '🦴',
      description: 'Complete spinal column imaging',
      duration: '60-90 minutes',
      usradPrice: '$520',
      hospitalPrice: '$2,000',
      savings: '$1,480',
      preparation: 'Remove all metal objects. Arrive 45 minutes early.',
      withContrast: true
    },
    {
      id: 'abdominal-ct',
      name: 'Abdominal CT',
      icon: '🫄',
      description: 'Comprehensive abdominal organ imaging',
      duration: '20-30 minutes',
      usradPrice: '$280',
      hospitalPrice: '$1,050',
      savings: '$770',
      preparation: 'Fast for 6 hours. Drink contrast solution as directed.',
      withContrast: true
    }
  ];

  // Mock providers
  const providers = [
    {
      id: 'advanced-davie',
      name: 'Advanced Imaging Center of Davie',
      address: '4350 Sheridan St, Davie, FL 33314',
      phone: '(954) 555-0123',
      distance: '2.3 miles',
      rating: 4.9,
      reviews: 247,
      equipment: ['3T Siemens Prisma MRI', '64-slice CT Scanner'],
      amenities: ['Valet Parking', 'WiFi', 'Refreshments', 'Extended Hours'],
      languages: ['English', 'Spanish', 'Portuguese'],
      nextAvailable: 'Today 3:30 PM',
      acceptsInsurance: true,
      image: '🏥'
    },
    {
      id: 'precision-coral',
      name: 'Precision Imaging Coral Springs',
      address: '2855 Coral Hills Dr, Coral Springs, FL 33065',
      phone: '(954) 555-0189',
      distance: '8.7 miles',
      rating: 4.8,
      reviews: 189,
      equipment: ['Wide Bore MRI', 'Low-Dose CT'],
      amenities: ['Free Parking', 'Anxiety Support', 'Music During Scan'],
      languages: ['English', 'Spanish'],
      nextAvailable: 'Tomorrow 10:00 AM',
      acceptsInsurance: true,
      image: '🏨'
    },
    {
      id: 'south-florida-diagnostic',
      name: 'South Florida Diagnostic Center',
      address: '7800 W Oakland Park Blvd, Sunrise, FL 33351',
      phone: '(954) 555-0167',
      distance: '12.1 miles',
      rating: 4.7,
      reviews: 156,
      equipment: ['Open MRI', 'Ultra-Fast CT'],
      amenities: ['Same-Day Results', 'Senior Discounts', 'Family Viewing'],
      languages: ['English', 'Spanish', 'Creole'],
      nextAvailable: 'Wed 2:00 PM',
      acceptsInsurance: false,
      image: '🏢'
    }
  ];

  const selectedScan = scanTypes.find(scan => scan.id === selectedScanType);
  const selectedProviderData = providers.find(provider => provider.id === selectedProvider);

  const handleBookAppointment = () => {
    if (selectedScan && selectedProviderData) {
      alert(`Booking ${selectedScan.name} at ${selectedProviderData.name}\n\nThis would normally open the booking calendar with available time slots!`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress Steps */}
      <div className="usrad-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Book Your Imaging Appointment</h2>
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className={`flex items-center ${step < 3 ? 'mr-4' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  activeStep >= step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-1 ${
                    activeStep > step ? 'bg-blue-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span className={activeStep >= 1 ? 'text-blue-600 font-medium' : ''}>Select Scan Type</span>
          <span className={activeStep >= 2 ? 'text-blue-600 font-medium' : ''}>Choose Provider</span>
          <span className={activeStep >= 3 ? 'text-blue-600 font-medium' : ''}>Book Appointment</span>
        </div>
      </div>

      {/* Step 1: Scan Type Selection */}
      {activeStep === 1 && (
        <div className="space-y-6">
          <div className="usrad-card p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Your Imaging Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scanTypes.map((scan) => (
                <div
                  key={scan.id}
                  onClick={() => setSelectedScanType(scan.id)}
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                    selectedScanType === scan.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="text-4xl mb-4 text-center">{scan.icon}</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{scan.name}</h4>
                  <p className="text-gray-600 text-sm mb-4">{scan.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{scan.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">USRad Price:</span>
                      <span className="font-semibold text-green-600">{scan.usradPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hospital Price:</span>
                      <span className="text-red-500 line-through">{scan.hospitalPrice}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-medium text-gray-900">You Save:</span>
                      <span className="font-bold text-green-600">{scan.savings}</span>
                    </div>
                  </div>

                  {scan.withContrast && (
                    <div className="mt-3 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      Contrast available if needed
                    </div>
                  )}
                </div>
              ))}
            </div>

            {selectedScan && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-blue-900 mb-2">Preparation Instructions</h5>
                <p className="text-blue-800 text-sm">{selectedScan.preparation}</p>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => selectedScan && setActiveStep(2)}
                disabled={!selectedScan}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedScan
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue to Provider Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Provider Selection */}
      {activeStep === 2 && (
        <div className="space-y-6">
          <div className="usrad-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Choose Your Provider</h3>
              <button
                onClick={() => setActiveStep(1)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Change Scan Type
              </button>
            </div>

            {/* Selected Scan Summary */}
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{selectedScan?.icon}</div>
                <div>
                  <h4 className="font-semibold text-blue-900">{selectedScan?.name}</h4>
                  <p className="text-blue-700 text-sm">Price: {selectedScan?.usradPrice} • You save: {selectedScan?.savings}</p>
                </div>
              </div>
            </div>

            {/* Location Search */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search near:
              </label>
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter city, state, or zip code"
              />
            </div>

            {/* Providers List */}
            <div className="space-y-6">
              {providers.map((provider) => (
                <div
                  key={provider.id}
                  onClick={() => setSelectedProvider(provider.id)}
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                    selectedProvider === provider.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{provider.image}</div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{provider.name}</h4>
                        <p className="text-gray-600">{provider.address}</p>
                        <p className="text-sm text-gray-500">{provider.distance} away • {provider.phone}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <span className="text-yellow-400 text-lg">★</span>
                        <span className="font-semibold">{provider.rating}</span>
                        <span className="text-gray-500 text-sm">({provider.reviews})</span>
                      </div>
                      <div className="text-sm text-green-600 font-medium">
                        Next: {provider.nextAvailable}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Equipment</h5>
                      <ul className="space-y-1">
                        {provider.equipment.map((item, index) => (
                          <li key={index} className="text-gray-600">• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Amenities</h5>
                      <ul className="space-y-1">
                        {provider.amenities.map((amenity, index) => (
                          <li key={index} className="text-gray-600">• {amenity}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Languages</h5>
                      <div className="flex flex-wrap gap-1">
                        {provider.languages.map((lang, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {lang}
                          </span>
                        ))}
                      </div>
                      <div className="mt-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          provider.acceptsInsurance 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {provider.acceptsInsurance ? 'Accepts Insurance' : 'Cash Pay Only'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setActiveStep(1)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Back to Scan Selection
              </button>
              <button
                onClick={() => selectedProviderData && setActiveStep(3)}
                disabled={!selectedProviderData}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedProviderData
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue to Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Booking Confirmation */}
      {activeStep === 3 && (
        <div className="space-y-6">
          <div className="usrad-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Confirm Your Appointment</h3>
              <button
                onClick={() => setActiveStep(2)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Change Provider
              </button>
            </div>

            {/* Booking Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Appointment Summary</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-900 mb-3">Scan Details</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{selectedScan?.icon}</span>
                      <span className="font-medium">{selectedScan?.name}</span>
                    </div>
                    <p className="text-gray-600">Duration: {selectedScan?.duration}</p>
                    <p className="text-gray-600">{selectedScan?.description}</p>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-3">Provider Details</h5>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">{selectedProviderData?.name}</p>
                    <p className="text-gray-600">{selectedProviderData?.address}</p>
                    <p className="text-gray-600">{selectedProviderData?.phone}</p>
                    <p className="text-green-600 font-medium">Next Available: {selectedProviderData?.nextAvailable}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600">Your Price:</p>
                    <p className="text-2xl font-bold text-green-600">{selectedScan?.usradPrice}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600">You Save:</p>
                    <p className="text-xl font-bold text-green-600">{selectedScan?.savings}</p>
                    <p className="text-sm text-gray-500">vs. hospital price</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Preparation Reminder */}
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
              <h5 className="font-medium text-yellow-900 mb-2">📋 Preparation Instructions</h5>
              <p className="text-yellow-800 text-sm">{selectedScan?.preparation}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => setActiveStep(2)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Back to Provider Selection
              </button>
              <button
                onClick={handleBookAppointment}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="usrad-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">📞</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Call for Help</h4>
                <p className="text-sm text-gray-500">Speak with a booking specialist</p>
              </div>
            </div>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">💬</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Live Chat</h4>
                <p className="text-sm text-gray-500">Get instant answers</p>
              </div>
            </div>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">📚</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Preparation Guide</h4>
                <p className="text-sm text-gray-500">Learn how to prepare</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientBookingSystem;