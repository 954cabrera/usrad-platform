import React from 'react';
import { Building, Users, CheckCircle, Clock, TrendingUp, Building2 } from 'lucide-react';

const OrganizationTypeSelector = ({
  organizationType,
  setOrganizationType
}) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 rounded-2xl border border-blue-100 shadow-sm">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
          <Building2 className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Organization Structure</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose your organization type to customize your onboarding experience and unlock the right tools for your business structure.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div 
          className={`group relative p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
            organizationType === 'single' 
              ? 'border-blue-500 bg-blue-50 shadow-xl ring-4 ring-blue-100' 
              : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 hover:shadow-lg'
          }`}
          onClick={() => setOrganizationType('single')}
        >
          <div className="absolute -top-3 -right-3">
            {organizationType === 'single' && (
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
            )}
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <Building className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Single Practice</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Independent imaging center or single location practice. Perfect for individual facilities looking to join our network.
            </p>
            <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500">
              <Clock className="h-4 w-4" />
              <span>5-minute setup</span>
            </div>
          </div>
        </div>

        <div 
          className={`group relative p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
            organizationType === 'corporate' 
              ? 'border-purple-500 bg-purple-50 shadow-xl ring-4 ring-purple-100' 
              : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50 hover:shadow-lg'
          }`}
          onClick={() => setOrganizationType('corporate')}
        >
          <div className="absolute -top-3 -right-3">
            {organizationType === 'corporate' && (
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
            )}
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Multi-Location Corporate</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Corporate entity with multiple imaging facilities. Designed for imaging chains and large healthcare organizations.
            </p>
            <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500">
              <TrendingUp className="h-4 w-4" />
              <span>Enterprise tools</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationTypeSelector;