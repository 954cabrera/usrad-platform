// src/pages/patient-dashboard/components/AdvancedBookingSystem.jsx
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Clock, 
  Star, 
  Heart, 
  Wifi, 
  Car, 
  Shield, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  X, 
  Check, 
  AlertCircle, 
  Navigation, 
  Phone, 
  Globe, 
  Building, 
  Users, 
  Award, 
  Stethoscope, 
  Activity, 
  Eye, 
  Brain, 
  CheckCircle2,
  ArrowRight,
  DollarSign,
  Info,
  FileText,
  Camera,
  Sparkles,
  TrendingUp
} from 'lucide-react';

import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../../../components/ui/alert';

const AdvancedBookingSystem = ({ userData = {} }) => {
  // Component state
  const [currentStep, setCurrentStep] = useState('search');
  const [searchCriteria, setSearchCriteria] = useState({
    procedure: 'MRI without Contrast',
    location: 'Los Angeles, CA',
    date: '',
    insurance: '',
    radius: 25
  });
  
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('price');

  // Mock data for procedures (in real app, this would come from API)
  const procedures = [
    { id: 1, name: 'MRI without Contrast', avgPrice: 550, savings: 850 },
    { id: 2, name: 'MRI with Contrast', avgPrice: 750, savings: 1200 },
    { id: 3, name: 'CT Scan', avgPrice: 350, savings: 600 },
    { id: 4, name: 'Ultrasound', avgPrice: 200, savings: 300 },
    { id: 5, name: 'X-Ray', avgPrice: 150, savings: 200 }
  ];

  // Mock data for providers (in real app, this would come from API)
  const providers = [
    {
      id: 1,
      name: "SimonMed Imaging - Beverly Hills",
      address: "9201 Sunset Blvd, West Hollywood, CA 90069",
      distance: 3.2,
      price: 454,
      originalPrice: 1304,
      savings: 850,
      rating: 4.9,
      reviews: 247,
      type: "Premium Imaging Center",
      equipment: ["3T MRI", "Wide Bore", "Silent MRI"],
      amenities: ["Valet Parking", "Luxury Waiting", "Same Day Results", "WiFi", "Refreshments"],
      insurance: ["Aetna", "Blue Cross", "Cigna", "United Healthcare"],
      hours: "Mon-Fri 7AM-9PM, Sat-Sun 8AM-6PM",
      phone: "(310) 555-0123",
      website: "simonmed.com",
      accreditation: ["ACR Accredited", "AHRA Certified"],
      nextAvailable: "Today 2:30 PM",
      totalSlots: 8,
      availableSlots: [
        { time: "2:30 PM", available: true },
        { time: "4:00 PM", available: true },
        { time: "5:30 PM", available: false },
        { time: "7:00 PM", available: true }
      ],
      specialties: ["Neurological Imaging", "Cardiac MRI", "Sports Medicine"],
      languages: ["English", "Spanish", "French"],
      featured: true
    },
    {
      id: 2,
      name: "Advanced Imaging Center",
      address: "2680 Saturn Ave, Huntington Park, CA 90255",
      distance: 6.7,
      price: 623,
      originalPrice: 1473,
      savings: 850,
      rating: 4.6,
      reviews: 189,
      type: "Community Imaging Center",
      equipment: ["1.5T MRI", "Open MRI", "Digital X-Ray"],
      amenities: ["Free Parking", "Wheelchair Access", "Pediatric Friendly", "WiFi"],
      insurance: ["Blue Cross", "Cigna", "Medicare", "Medicaid"],
      hours: "Mon-Fri 6AM-8PM, Sat 8AM-4PM",
      phone: "(323) 555-0456",
      website: "advancedimaging.com",
      accreditation: ["ACR Accredited"],
      nextAvailable: "Tomorrow 9:00 AM",
      totalSlots: 6,
      availableSlots: [
        { time: "9:00 AM", available: true },
        { time: "11:30 AM", available: true },
        { time: "2:00 PM", available: true },
        { time: "4:30 PM", available: false }
      ],
      specialties: ["General Imaging", "Preventive Screening"],
      languages: ["English", "Spanish"],
      featured: false
    }
  ];

  // Initialize patient info with user data
  const [patientInfo, setPatientInfo] = useState({
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    email: userData.email || '',
    phone: '',
    dateOfBirth: ''
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getEquipmentBadgeColor = (equipment) => {
    if (equipment.includes('3T')) return 'bg-purple-100 text-purple-800';
    if (equipment.includes('Wide Bore')) return 'bg-blue-100 text-blue-800';
    if (equipment.includes('Open')) return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  // Search Step Component
  const SearchStep = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Your Medical Imaging</h1>
        <p className="text-xl text-gray-600 mb-8">Find the perfect imaging center with transparent pricing and instant booking</p>
      </div>

      <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Procedure Selection */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Procedure</label>
              <select 
                value={searchCriteria.procedure}
                onChange={(e) => setSearchCriteria({...searchCriteria, procedure: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white"
              >
                {procedures.map(proc => (
                  <option key={proc.id} value={proc.name}>{proc.name}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input 
                  type="text"
                  value={searchCriteria.location}
                  onChange={(e) => setSearchCriteria({...searchCriteria, location: e.target.value})}
                  placeholder="City, State or ZIP"
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Preferred Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input 
                  type="date"
                  value={searchCriteria.date}
                  onChange={(e) => setSearchCriteria({...searchCriteria, date: e.target.value})}
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">&nbsp;</label>
              <Button 
                onClick={() => setCurrentStep('results')}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Search className="w-5 h-5 mr-2" />
                Find Centers
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">65%</div>
              <div className="text-sm text-green-700">Average Savings vs Hospitals</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">500+</div>
              <div className="text-sm text-blue-700">Certified Imaging Centers</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">24hrs</div>
              <div className="text-sm text-purple-700">Average Scheduling Time</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Results Step Component
  const ResultsStep = () => (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Available Imaging Centers</h1>
          <p className="text-gray-600 mt-1">
            {providers.length} centers found for {searchCriteria.procedure} near {searchCriteria.location}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="price">Sort by Price</option>
            <option value="rating">Sort by Rating</option>
            <option value="distance">Sort by Distance</option>
            <option value="availability">Sort by Availability</option>
          </select>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-6">
        {providers.map((provider, index) => (
          <Card key={provider.id} className={`hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] ${provider.featured ? 'ring-2 ring-purple-500 bg-gradient-to-r from-purple-50 to-blue-50' : ''}`}>
            <CardContent className="p-6">
              {provider.featured && (
                <div className="flex items-center mb-4">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Featured Provider
                  </Badge>
                </div>
              )}
              
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{provider.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{provider.type}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{provider.distance} miles</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-500" />
                          <span className="font-medium">{provider.rating}</span>
                          <span className="text-gray-500 ml-1">({provider.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-green-500" />
                          <span className="text-green-600 font-medium">{provider.nextAvailable}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{provider.address}</p>

                  {/* Equipment Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {provider.equipment.map((eq, idx) => (
                      <Badge key={idx} className={getEquipmentBadgeColor(eq)}>
                        {eq}
                      </Badge>
                    ))}
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    {provider.amenities.slice(0, 4).map((amenity, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        {amenity.includes('Parking') && <Car className="w-3 h-3 mr-1" />}
                        {amenity.includes('WiFi') && <Wifi className="w-3 h-3 mr-1" />}
                        {amenity.includes('Luxury') && <Award className="w-3 h-3 mr-1" />}
                        {amenity.includes('Results') && <Zap className="w-3 h-3 mr-1" />}
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Specialties */}
                  <div className="text-sm text-gray-600 mb-4">
                    <span className="font-medium">Specialties: </span>
                    {provider.specialties.join(', ')}
                  </div>
                </div>

                {/* Pricing & Booking */}
                <div className="ml-8 text-right">
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {formatPrice(provider.price)}
                    </div>
                    <div className="text-sm text-gray-500 line-through mb-1">
                      Hospital: {formatPrice(provider.originalPrice)}
                    </div>
                    <div className="text-green-600 font-bold text-lg">
                      Save {formatPrice(provider.savings)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {Math.round((provider.savings / provider.originalPrice) * 100)}% savings
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setSelectedProvider(provider);
                        setCurrentStep('details');
                      }}
                    >
                      View Details
                    </Button>
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      onClick={() => {
                        setSelectedProvider(provider);
                        setCurrentStep('booking');
                      }}
                    >
                      Book Now
                    </Button>
                  </div>

                  {/* Availability Indicator */}
                  <div className="mt-3 text-xs">
                    <div className="flex items-center justify-center text-green-600">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      <span>{provider.availableSlots.filter(slot => slot.available).length} slots available today</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Booking Step Component (simplified for integration)
  const BookingStep = () => (
    <div className="max-w-4xl mx-auto p-6">
      <Button 
        variant="outline" 
        onClick={() => setCurrentStep('results')}
        className="mb-6"
      >
        ← Back to Results
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Booking Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Provider Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Booking at {selectedProvider?.name}</span>
                <Badge className="bg-green-100 text-green-800">
                  Available Today
                </Badge>
              </CardTitle>
              <CardDescription>
                {searchCriteria.procedure} • {selectedProvider?.address}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Time Slot Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Select Appointment Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {selectedProvider?.availableSlots.map((slot, idx) => (
                  <button
                    key={idx}
                    disabled={!slot.available}
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedTimeSlot?.time === slot.time
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : slot.available
                        ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                        : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <div className="font-medium">{slot.time}</div>
                    <div className="text-xs">
                      {slot.available ? 'Available' : 'Booked'}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input 
                    type="text"
                    value={patientInfo.firstName}
                    onChange={(e) => setPatientInfo({...patientInfo, firstName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input 
                    type="text"
                    value={patientInfo.lastName}
                    onChange={(e) => setPatientInfo({...patientInfo, lastName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email"
                  value={patientInfo.email}
                  onChange={(e) => setPatientInfo({...patientInfo, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input 
                  type="tel"
                  value={patientInfo.phone}
                  onChange={(e) => setPatientInfo({...patientInfo, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input 
                  type="date"
                  value={patientInfo.dateOfBirth}
                  onChange={(e) => setPatientInfo({...patientInfo, dateOfBirth: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Prescription Reminder */}
          <Alert>
            <FileText className="h-4 w-4" />
            <AlertTitle>Physician's Order Required</AlertTitle>
            <AlertDescription>
              Please bring your physician's order/referral to your appointment. If you don't have one, 
              <a href="#" className="text-blue-600 hover:text-blue-700 ml-1">find a doctor near you</a>.
            </AlertDescription>
          </Alert>
        </div>

        {/* Right Column - Booking Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Procedure:</span>
                  <span className="font-medium">{searchCriteria.procedure}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Provider:</span>
                  <span className="font-medium text-sm">{selectedProvider?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time:</span>
                  <span className="font-medium">{selectedTimeSlot?.time || 'Select time'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Distance:</span>
                  <span className="font-medium">{selectedProvider?.distance} miles</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Procedure Cost:</span>
                  <span className="font-medium">{formatPrice(selectedProvider?.price)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Your Savings:</span>
                  <span className="font-bold">{formatPrice(selectedProvider?.savings)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                  <span>Total:</span>
                  <span>{formatPrice(selectedProvider?.price)}</span>
                </div>
              </div>

              <Button 
                onClick={() => setCurrentStep('confirmation')}
                disabled={!selectedTimeSlot}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 mt-6"
              >
                Confirm Booking
              </Button>

              <div className="text-xs text-gray-500 text-center">
                By booking, you agree to our Terms & Privacy Policy
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  // Confirmation Step Component
  const ConfirmationStep = () => (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed! 🎉</h1>
        <p className="text-gray-600">Your imaging appointment has been successfully scheduled.</p>
      </div>

      <Card className="text-left mb-8">
        <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <CardTitle>Appointment Details</CardTitle>
          <CardDescription className="text-green-100">
            Confirmation #USR-{Date.now()}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-600 text-sm">Procedure</span>
              <div className="font-medium">{searchCriteria.procedure}</div>
            </div>
            <div>
              <span className="text-gray-600 text-sm">Date & Time</span>
              <div className="font-medium">{selectedTimeSlot?.time}</div>
            </div>
          </div>
          
          <div>
            <span className="text-gray-600 text-sm">Location</span>
            <div className="font-medium">{selectedProvider?.name}</div>
            <div className="text-sm text-gray-500">{selectedProvider?.address}</div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Amount Paid:</span>
              <span className="text-xl font-bold">{formatPrice(selectedProvider?.price)}</span>
            </div>
            <div className="flex justify-between items-center text-green-600 mt-1">
              <span className="font-medium">You Saved:</span>
              <span className="text-lg font-bold">{formatPrice(selectedProvider?.savings)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertTitle>Important Reminders</AlertTitle>
        <AlertDescription className="text-left">
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Bring a valid photo ID and your physician's order</li>
            <li>Arrive 15 minutes early for check-in</li>
            <li>Avoid metal objects and jewelry</li>
            <li>Contact the facility if you need to reschedule</li>
          </ul>
        </AlertDescription>
      </Alert>

      <div className="flex space-x-4">
        <Button 
          onClick={() => {
            setCurrentStep('search');
            setSelectedProvider(null);
            setSelectedTimeSlot(null);
          }}
          variant="outline"
          className="flex-1"
        >
          Book Another
        </Button>
        <Button 
          onClick={() => window.location.href = '/patient-dashboard'}
          className="flex-1 bg-blue-600 hover:bg-blue-700"
        >
          View in Dashboard
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {currentStep === 'search' && <SearchStep />}
      {currentStep === 'results' && <ResultsStep />}
      {currentStep === 'booking' && <BookingStep />}
      {currentStep === 'confirmation' && <ConfirmationStep />}
    </div>
  );
};

export default AdvancedBookingSystem;