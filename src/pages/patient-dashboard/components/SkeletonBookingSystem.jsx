// /src/pages/patient-dashboard/components/SkeletonBookingSystem.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, DollarSign, Star, Shield, Zap, Users, Search } from 'lucide-react';

const SkeletonLoader = () => (
  <div className="max-w-6xl mx-auto">
    {/* Hero Section Skeleton */}
    <div className="bg-gradient-to-r from-gray-200 to-gray-100 rounded-2xl p-8 mb-8 relative overflow-hidden">
      <div className="text-center">
        <div className="h-10 bg-gray-300 rounded-lg w-2/3 mx-auto mb-4 animate-pulse"></div>
        <div className="h-6 bg-gray-300 rounded-lg w-1/2 mx-auto animate-pulse"></div>
      </div>
    </div>

    {/* Booking Form Card Skeleton */}
    <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
      {/* Search Form Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i}>
            <div className="h-4 bg-gray-300 rounded w-24 mb-3 animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded-xl border-2 border-gray-300 animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 bg-gray-100 rounded-xl border border-gray-200">
            <div className="text-center">
              <div className="h-8 bg-gray-300 rounded w-16 mx-auto mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-32 mx-auto mb-1 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-24 mx-auto animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* How It Works Skeleton */}
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <div className="h-6 bg-gray-300 rounded w-64 mx-auto mb-8 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
            <div className="h-5 bg-gray-300 rounded w-32 mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mx-auto animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>

    {/* Advanced Features Skeleton */}
    <div className="bg-gray-100 rounded-2xl p-8 border border-gray-200">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-200 rounded mx-auto mb-4 animate-pulse"></div>
        <div className="h-6 bg-gray-300 rounded w-80 mx-auto mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-6 animate-pulse"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="w-8 h-8 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
              <div className="h-3 bg-gray-300 rounded w-20 mx-auto animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <style jsx>{`
      @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
      }
      
      .animate-pulse {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200px 100%;
        animation: shimmer 1.5s ease-in-out infinite;
      }
    `}</style>
  </div>
);

const SkeletonBookingSystem = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProcedure, setSelectedProcedure] = useState('MRI without Contrast');
  const [location, setLocation] = useState('Los Angeles, CA');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    // Simulate loading time for premium feel
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const searchCenters = () => {
    alert(`🚀 Searching for ${selectedProcedure} centers near ${location}${selectedDate ? ` on ${selectedDate}` : ''}...\n\nAdvanced booking system with real provider data coming soon!\n\nThis will show:\n• Real-time availability\n• Transparent pricing\n• Instant booking\n• Provider details`);
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Book Your Medical Imaging</h1>
          <p className="text-xl text-blue-100">Find the perfect imaging center with transparent pricing and instant booking</p>
        </div>
      </div>

      {/* Booking Form Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
        {/* Search Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Procedure Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Procedure Type</label>
            <select 
              value={selectedProcedure}
              onChange={(e) => setSelectedProcedure(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white"
            >
              <option>MRI without Contrast</option>
              <option>MRI with Contrast</option>
              <option>CT Scan</option>
              <option>Ultrasound</option>
              <option>X-Ray</option>
              <option>Mammography</option>
              <option>DEXA Scan</option>
            </select>
          </div>

          {/* Location Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="City, State or ZIP Code" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Date Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Preferred Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Search Button */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Find Centers</label>
            <button 
              onClick={searchCenters}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Search className="w-5 h-5 inline mr-2" />
              Search Now
            </button>
          </div>
        </div>

        {/* Value Proposition Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <div className="text-3xl font-bold text-green-600 mb-2">65%</div>
            <div className="text-green-700 font-medium">Average Savings vs Hospitals</div>
            <div className="text-green-600 text-sm mt-1">Save $800+ on typical MRI</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-blue-700 font-medium">Certified Imaging Centers</div>
            <div className="text-blue-600 text-sm mt-1">All ACR accredited facilities</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-100">
            <div className="text-3xl font-bold text-purple-600 mb-2">24hrs</div>
            <div className="text-purple-700 font-medium">Average Scheduling Time</div>
            <div className="text-purple-600 text-sm mt-1">Most appointments same week</div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">How USRad Booking Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Search & Compare</h3>
            <p className="text-gray-600">Find imaging centers near you with transparent pricing and real-time availability</p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Book Instantly</h3>
            <p className="text-gray-600">Select your preferred time slot and complete your booking in minutes</p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600">3</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Your Scan</h3>
            <p className="text-gray-600">Arrive with your physician's order and receive high-quality imaging</p>
          </div>
        </div>
      </div>

      {/* Advanced Features Coming Soon */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
        <div className="text-center">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Booking Features Coming Soon</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We're building the most advanced imaging booking platform with real-time provider availability, 
            detailed facility profiles, instant confirmations, and integrated payment processing.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">📅</div>
              <div className="text-sm font-medium text-gray-700">Real-time Availability</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">🏥</div>
              <div className="text-sm font-medium text-gray-700">Provider Profiles</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">💳</div>
              <div className="text-sm font-medium text-gray-700">Instant Payment</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">📱</div>
              <div className="text-sm font-medium text-gray-700">Mobile Optimized</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonBookingSystem;