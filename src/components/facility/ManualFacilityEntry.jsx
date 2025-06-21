import React from 'react';
import { Edit3 } from 'lucide-react';
import { formatPhoneNumber } from '../../lib/facilityManager.js';

const ManualFacilityEntry = ({
  manualFacility,
  setManualFacility,
  errors,
  onAddFacility,
  onCancel
}) => {
  const handleInputChange = (field, value) => {
    setManualFacility(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
            <Edit3 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-gray-900">Add Facility Manually</h4>
            <p className="text-gray-600 text-sm">Enter facility details for non-ACR facilities</p>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors text-xl"
        >
          ×
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Facility Name *
          </label>
          <input
            type="text"
            value={manualFacility.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter facility name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Address *
          </label>
          <input
            type="text"
            value={manualFacility.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Street address"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            value={manualFacility.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="City"
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            State *
          </label>
          <select
            value={manualFacility.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md ${
              errors.state ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select state</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="AL">Alabama</option>
            <option value="SC">South Carolina</option>
            <option value="NC">North Carolina</option>
            <option value="TN">Tennessee</option>
            <option value="VA">Virginia</option>
            <option value="TX">Texas</option>
            <option value="CA">California</option>
            <option value="NY">New York</option>
            <option value="NJ">New Jersey</option>
            <option value="PA">Pennsylvania</option>
            <option value="OH">Ohio</option>
            <option value="MI">Michigan</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="WI">Wisconsin</option>
            <option value="MN">Minnesota</option>
            <option value="IA">Iowa</option>
            <option value="MO">Missouri</option>
            <option value="AR">Arkansas</option>
            <option value="LA">Louisiana</option>
            <option value="MS">Mississippi</option>
            <option value="KY">Kentucky</option>
            <option value="WV">West Virginia</option>
            <option value="MD">Maryland</option>
            <option value="DE">Delaware</option>
            <option value="CT">Connecticut</option>
            <option value="RI">Rhode Island</option>
            <option value="MA">Massachusetts</option>
            <option value="VT">Vermont</option>
            <option value="NH">New Hampshire</option>
            <option value="ME">Maine</option>
          </select>
          {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ZIP Code
          </label>
          <input
            type="text"
            value={manualFacility.zip}
            onChange={(e) => handleInputChange('zip', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
            placeholder="ZIP code"
            maxLength={5}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={manualFacility.phone}
            onChange={(e) => handleInputChange('phone', formatPhoneNumber(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
            placeholder="(XXX) XXX-XXXX"
            maxLength={14}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Website
          </label>
          <input
            type="url"
            value={manualFacility.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
            placeholder="https://www.facility.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Primary Contact
          </label>
          <input
            type="text"
            value={manualFacility.primaryContact}
            onChange={(e) => handleInputChange('primaryContact', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
            placeholder="Contact person name"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            value={manualFacility.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
            placeholder="Additional notes about this facility (optional)"
            rows={3}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-8">
        <button
          onClick={onCancel}
          className="px-6 py-3 text-gray-700 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all font-medium"
        >
          Cancel
        </button>
        <button
          onClick={onAddFacility}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-lg hover:shadow-xl"
        >
          Add Facility
        </button>
      </div>
    </div>
  );
};

export default ManualFacilityEntry;