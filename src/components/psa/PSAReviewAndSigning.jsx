import React, { useState } from 'react';
import { 
  FileText, Shield, Building, MapPin, CheckCircle, Download, Edit3, 
  Clock, ArrowRight
} from 'lucide-react';

const PSAReviewAndSigning = ({
  corporateInfo,
  selectedFacilities,
  organizationType,
  isSaving,
  onSave,
  onBackToFacilities
}) => {
  const [showFullFacilityList, setShowFullFacilityList] = useState(false);

  const handleSignPSA = async () => {
    const checkbox = document.getElementById('signature-confirmation');
    if (!checkbox?.checked) {
      alert('Please confirm that you have reviewed the agreement and are authorized to sign.');
      return;
    }
    
    try {
      await onSave();
      // Here you would integrate with your existing DocuSeal PSA system
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('PSA generated successfully! You would now be redirected to the signing interface.');
    } catch (error) {
      console.error('PSA generation error:', error);
      alert('Error generating PSA. Please try again.');
    }
  };

  const exportFacilityList = () => {
    const csvContent = selectedFacilities.map((f, i) => 
      `${i + 1},"${f.name}","${f.address}","${f.city}","${f.state}","${f.zip || ''}","${f.isPrimary ? 'Primary' : ''}","${f.acrVerified ? 'ACR' : ''}"`
    ).join('\n');
    const header = 'Number,Facility Name,Address,City,State,ZIP,Primary,Accreditation\n';
    const blob = new Blob([header + csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `USRad_Facilities_Exhibit_B_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-8">
      {/* PSA Review Header */}
      <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 p-8 rounded-2xl border border-purple-100 shadow-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Provider Service Agreement (PSA) Review</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Review your information and digitally sign your Provider Service Agreement to join the USRad network. 
            This will officially authorize your facilities to participate in our imaging network.
          </p>
        </div>

        {/* Agreement Status */}
        <div className="bg-white rounded-xl p-6 border border-purple-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">USRad Provider Service Agreement</h4>
                <p className="text-sm text-gray-600">Ready for your digital signature</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-purple-600">Status: Ready to Sign</div>
              <div className="text-xs text-gray-500">Agreement ID: PSA-{Date.now().toString().slice(-6)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Agreement Preview */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="bg-gray-50 px-8 py-4 border-b border-gray-200">
          <h4 className="text-lg font-bold text-gray-900">Agreement Preview</h4>
          <p className="text-sm text-gray-600">Review the key terms that will be included in your PSA</p>
        </div>

        <div className="p-8 space-y-6">
          {/* Provider Information Summary */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h5 className="font-bold text-blue-900 mb-4 flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Provider Information
            </h5>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Legal Business Name:</span>
                <span className="ml-2 font-semibold text-gray-900">{corporateInfo.legalName || 'Not provided'}</span>
              </div>
              <div>
                <span className="text-gray-600">Federal Tax ID:</span>
                <span className="ml-2 font-semibold text-gray-900">{corporateInfo.taxId || 'Not provided'}</span>
              </div>
              <div>
                <span className="text-gray-600">Authorized Signer:</span>
                <span className="ml-2 font-semibold text-gray-900">{corporateInfo.signerName || 'Not provided'}</span>
              </div>
              <div>
                <span className="text-gray-600">Business Email:</span>
                <span className="ml-2 font-semibold text-gray-900">{corporateInfo.email || 'Not provided'}</span>
              </div>
            </div>
          </div>

          {/* Facilities Summary - Exhibit B */}
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-bold text-green-900 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Exhibit B - Authorized Facilities ({selectedFacilities.length})
              </h5>
              
              {/* View Toggle for Large Lists */}
              {selectedFacilities.length > 5 && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowFullFacilityList(!showFullFacilityList)}
                    className="text-sm text-green-700 hover:text-green-800 font-medium flex items-center"
                  >
                    {showFullFacilityList ? "▲ Show Summary" : "▼ Show All Facilities"}
                  </button>
                </div>
              )}
            </div>

            {/* Summary Stats for Large Lists */}
            {selectedFacilities.length > 5 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-white rounded-lg p-3 border border-green-200">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-700">{selectedFacilities.length}</div>
                    <div className="text-xs text-green-600">Total Facilities</div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-green-200">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-700">
                      {selectedFacilities.filter(f => f.acrVerified).length}
                    </div>
                    <div className="text-xs text-blue-600">ACR Accredited</div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-green-200">
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-700">
                      {new Set(selectedFacilities.map(f => f.state)).size}
                    </div>
                    <div className="text-xs text-purple-600">States</div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-green-200">
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-700">
                      {selectedFacilities.filter(f => f.isPrimary).length}
                    </div>
                    <div className="text-xs text-orange-600">Primary</div>
                  </div>
                </div>
              </div>
            )}

            {/* Facility List - Conditional Display */}
            {selectedFacilities.length <= 5 || showFullFacilityList ? (
              /* Full List View */
              <div className="space-y-3">
                {selectedFacilities.length > 10 && (
                  <div className="bg-white rounded-lg p-3 border border-green-200 mb-3">
                    <div className="text-sm text-gray-600 text-center">
                      Showing all {selectedFacilities.length} facilities
                      {selectedFacilities.length > 20 && (
                        <span className="ml-2 text-green-600 font-medium">
                          (Large facility network detected)
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                <div className={`space-y-2 ${selectedFacilities.length > 15 ? 'max-h-96 overflow-y-auto' : ''}`}>
                  {selectedFacilities.map((facility, index) => (
                    <div key={facility.id} className="bg-white rounded-lg p-3 border border-green-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center mb-1">
                            <span className="text-sm font-semibold text-gray-900 mr-2">
                              {index + 1}. {facility.name}
                            </span>
                            <div className="flex items-center space-x-1">
                              {facility.isPrimary && (
                                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium">
                                  PRIMARY
                                </span>
                              )}
                              {facility.acrVerified && (
                                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">
                                  ACR
                                </span>
                              )}
                              {facility.isManualEntry && (
                                <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded text-xs font-medium">
                                  MANUAL
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 truncate">
                            {facility.address}, {facility.city}, {facility.state} {facility.zip}
                          </p>
                          {facility.modalities && facility.modalities.length > 0 && (
                            <p className="text-xs text-gray-500 mt-1 truncate">
                              Services: {facility.modalities.slice(0, 3).join(', ')}
                              {facility.modalities.length > 3 && ` +${facility.modalities.length - 3} more`}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {selectedFacilities.length > 15 && (
                  <div className="text-center pt-2">
                    <span className="text-xs text-gray-500">
                      Scroll to view all facilities • {selectedFacilities.length} total
                    </span>
                  </div>
                )}
              </div>
            ) : (
              /* Condensed Summary View */
              <div className="space-y-3">
                {/* Show Primary Facility */}
                {selectedFacilities.find(f => f.isPrimary) && (
                  <div className="bg-white rounded-lg p-3 border border-green-200">
                    <div className="flex items-center">
                      <span className="text-sm font-semibold text-gray-900 mr-2">
                        Primary: {selectedFacilities.find(f => f.isPrimary).name}
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium">
                        PRIMARY
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {selectedFacilities.find(f => f.isPrimary).city}, {selectedFacilities.find(f => f.isPrimary).state}
                    </p>
                  </div>
                )}
                
                {/* Show First 3 Additional Facilities */}
                {selectedFacilities.filter(f => !f.isPrimary).slice(0, 3).map((facility, index) => (
                  <div key={facility.id} className="bg-white rounded-lg p-3 border border-green-200">
                    <div className="flex items-center">
                      <span className="text-sm font-semibold text-gray-900 mr-2">
                        {facility.name}
                      </span>
                      <div className="flex items-center space-x-1">
                        {facility.acrVerified && (
                          <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">
                            ACR
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">
                      {facility.city}, {facility.state}
                    </p>
                  </div>
                ))}
                
                {/* Show Remaining Count */}
                {selectedFacilities.length > 4 && (
                  <div className="bg-white rounded-lg p-3 border border-green-200 border-dashed">
                    <div className="text-center">
                      <span className="text-sm font-medium text-gray-700">
                        + {selectedFacilities.length - 4} additional facilities
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        Located in: {[...new Set(selectedFacilities.slice(4).map(f => f.state))].join(', ')}
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="text-center pt-2">
                  <button
                    onClick={() => setShowFullFacilityList(true)}
                    className="text-sm text-green-700 hover:text-green-800 font-medium"
                  >
                    Click "▼ Show All Facilities" above to view complete list
                  </button>
                </div>
              </div>
            )}

            {/* Download/Export Option for Large Lists */}
            {selectedFacilities.length > 20 && (
              <div className="mt-4 pt-4 border-t border-green-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-700">
                    Large facility network detected ({selectedFacilities.length} locations)
                  </span>
                  <button
                    onClick={exportFacilityList}
                    className="text-sm text-green-700 hover:text-green-800 font-medium flex items-center"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Export List
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Key Agreement Terms */}
          <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
            <h5 className="font-bold text-purple-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Key Agreement Terms
            </h5>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600">Agreement Type:</span>
                  <span className="ml-2 font-semibold text-gray-900">
                    {organizationType === 'single' ? 'Single Practice' : 'Multi-Location Corporate'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Network Participation:</span>
                  <span className="ml-2 font-semibold text-gray-900">USRad Imaging Network</span>
                </div>
                <div>
                  <span className="text-gray-600">Effective Date:</span>
                  <span className="ml-2 font-semibold text-gray-900">Upon Execution</span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600">Commission Structure:</span>
                  <span className="ml-2 font-semibold text-gray-900">Per Fee Schedule</span>
                </div>
                <div>
                  <span className="text-gray-600">Payment Terms:</span>
                  <span className="ml-2 font-semibold text-gray-900">Net 30 Days</span>
                </div>
                <div>
                  <span className="text-gray-600">Territory:</span>
                  <span className="ml-2 font-semibold text-gray-900">Authorized Facility Locations</span>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notices */}
          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <h5 className="font-bold text-amber-900 mb-3 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Important Information
            </h5>
            <div className="space-y-2 text-sm text-amber-800">
              <div className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-amber-600" />
                <span>By signing this agreement, you authorize all facilities listed in Exhibit B to participate in the USRad network</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-amber-600" />
                <span>You can add or remove facilities from your agreement at any time through your dashboard</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-amber-600" />
                <span>This agreement will be legally binding once both parties have provided digital signatures</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-amber-600" />
                <span>You will receive a fully executed copy via email within 24 hours of completion</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Digital Signing Section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xl font-bold">Ready to Sign Your Agreement</h4>
              <p className="text-blue-100">Click below to proceed to secure digital signing</p>
            </div>
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <Edit3 className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h5 className="font-semibold text-gray-900 mb-2">Secure Process</h5>
              <p className="text-sm text-gray-600">Bank-level encryption and legal compliance ensure your signature is protected</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <h5 className="font-semibold text-gray-900 mb-2">Quick Signing</h5>
              <p className="text-sm text-gray-600">Digital signing typically takes less than 2 minutes to complete</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <h5 className="font-semibold text-gray-900 mb-2">Immediate Access</h5>
              <p className="text-sm text-gray-600">Start receiving referrals as soon as both parties have signed</p>
            </div>
          </div>

          {/* Signature Confirmation */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="flex items-start space-x-4">
              <input
                type="checkbox"
                id="signature-confirmation"
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="signature-confirmation" className="text-sm text-gray-700 leading-relaxed">
                I confirm that I have reviewed all information above and that I am authorized to sign this Provider Service Agreement on behalf of{' '}
                <strong>{corporateInfo.legalName || 'the organization'}</strong>. I understand that this will create a legally binding agreement between my organization and USRad.
              </label>
            </div>
          </div>

          {/* Signing Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSignPSA}
              disabled={isSaving}
              className="flex-1 flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg hover:shadow-xl"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Generating PSA...
                </>
              ) : (
                <>
                  <Edit3 className="h-5 w-5 mr-3" />
                  Proceed to Digital Signing
                </>
              )}
            </button>
            
            <button
              onClick={onBackToFacilities}
              className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all font-medium"
            >
              Back to Edit Facilities
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need help? Contact our support team at{' '}
              <a href="mailto:support@usradiology.com" className="text-blue-600 hover:text-blue-700 font-medium">
                support@usradiology.com
              </a>{' '}
              or call{' '}
              <a href="tel:+1-954-555-0123" className="text-blue-600 hover:text-blue-700 font-medium">
                (954) 555-0123
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PSAReviewAndSigning;