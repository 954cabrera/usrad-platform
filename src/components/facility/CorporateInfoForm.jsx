import React from 'react';
import { Eye, EyeOff, FileText, Globe } from 'lucide-react';
import { formatEIN, formatPhoneNumber } from '../../lib/facilityManager.js';

const CorporateInfoForm = ({
  organizationType,
  corporateInfo,
  setCorporateInfo,
  showEIN,
  setShowEIN,
}) => {
  if (!organizationType) return null;

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl flex items-center justify-center mr-4">
          <FileText className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {organizationType === 'single' ? 'Practice Information' : 'Corporate Information'}
          </h3>
          <p className="text-gray-600 text-sm">
            {organizationType === 'single' 
              ? 'Basic information about your imaging practice' 
              : 'Legal entity information for your corporate structure'
            }
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Legal Business Name *
          </label>
          <input
            type="text"
            value={corporateInfo.legalName}
            onChange={(e) =>
              setCorporateInfo({ ...corporateInfo, legalName: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
            placeholder="Enter legal business name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            DBA Name (if different)
          </label>
          <input
            type="text"
            value={corporateInfo.legalEntityName}
            onChange={(e) =>
              setCorporateInfo({ ...corporateInfo, legalEntityName: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
            placeholder="Doing business as..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Federal Tax ID (EIN) *
          </label>
          <div className="relative">
            <input
              type={showEIN ? 'text' : 'password'}
              value={corporateInfo.taxId}
              onChange={(e) =>
                setCorporateInfo({ ...corporateInfo, taxId: formatEIN(e.target.value) })
              }
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
              placeholder="XX-XXXXXXX"
              maxLength={10}
            />
            <button
              type="button"
              onClick={() => setShowEIN(!showEIN)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showEIN ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Business Phone *
          </label>
          <input
            type="tel"
            value={corporateInfo.phone}
            onChange={(e) =>
              setCorporateInfo({ ...corporateInfo, phone: formatPhoneNumber(e.target.value) })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
            placeholder="(XXX) XXX-XXXX"
            maxLength={14}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Business Email *
          </label>
          <input
            type="email"
            value={corporateInfo.email}
            onChange={(e) =>
              setCorporateInfo({ ...corporateInfo, email: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
            placeholder="contact@business.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="url"
              value={corporateInfo.website}
              onChange={(e) =>
                setCorporateInfo({ ...corporateInfo, website: e.target.value })
              }
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
              placeholder="www.yourwebsite.com"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Authorized Signer *
          </label>
          <input
            type="text"
            value={corporateInfo.signerName}
            onChange={(e) =>
              setCorporateInfo({ ...corporateInfo, signerName: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
            placeholder="Full name of person authorized to sign PSA"
          />
        </div>
      </div>
    </div>
  );
};

export default CorporateInfoForm;