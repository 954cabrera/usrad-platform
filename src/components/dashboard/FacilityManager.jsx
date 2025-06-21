import React, { useState } from 'react';
import { 
  Search, Building, Users, CheckCircle, Zap, TrendingUp,
  Building2, Shield, FileText, Download, ArrowRight,
  MapPin, Edit3, Clock
} from 'lucide-react';

// Import extracted components (keeping the working ones)
import CorporateInfoForm from '../facility/CorporateInfoForm';
import FacilitySearch from '../facility/FacilitySearch';
import SelectedFacilitiesList from '../facility/SelectedFacilitiesList';
import ManualFacilityEntry from '../facility/ManualFacilityEntry';
import OrganizationTypeSelector from '../facility/OrganizationTypeSelector';

// Import custom hook
import { useFacilityManager } from '../../hooks/useFacilityManager';

const FacilityManager = () => {
  // PSA component state (moved back to parent)
  const [showFullFacilityList, setShowFullFacilityList] = useState(false);

  // Use custom hook for all state and logic
  const {
    currentStep,
    setCurrentStep,
    organizationType,
    setOrganizationType,
    corporateInfo,
    setCorporateInfo,
    showEIN,
    setShowEIN,
    selectedFacilities,
    searchTerm,
    setSearchTerm,
    searchResults,
    isSearching,
    showManualEntry,
    setShowManualEntry,
    manualFacility,
    setManualFacility,
    errors,
    filterBy,
    setFilterBy,
    isSaving,
    saveMessage,
    progress,
    selectFacility,
    addManualFacility,
    setPrimaryFacility,
    removeFacility,
    saveProgress,
    canProceedToNextStep
  } = useFacilityManager();

  // PSA-specific functions (moved back from separate component)
  const handleSignPSA = async () => {
    const checkbox = document.getElementById('signature-confirmation');
    if (!checkbox?.checked) {
      alert('Please confirm that you have reviewed the agreement and are authorized to sign.');
      return;
    }
    
    try {
      await saveProgress();
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            {/* Organization Type Selection - Using Extracted Component */}
            <OrganizationTypeSelector
              organizationType={organizationType}
              setOrganizationType={setOrganizationType}
            />

            {/* Corporate Information Form - Using Extracted Component */}
            {organizationType && (
              <CorporateInfoForm
                organizationType={organizationType}
                corporateInfo={corporateInfo}
                setCorporateInfo={setCorporateInfo}
                showEIN={showEIN}
                setShowEIN={setShowEIN}
              />
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            {/* Facility Search - Using Extracted Component */}
            <FacilitySearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchResults={searchResults}
              isSearching={isSearching}
              selectedFacilities={selectedFacilities}
              onFacilitySelect={selectFacility}
              onShowManualEntry={setShowManualEntry}
            />

            {/* Exhibit B Context Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-900 mb-2">
                    🏥 Facility Selection for Network Agreement
                  </h3>
                  <p className="text-blue-800 text-sm leading-relaxed mb-3">
                    Select all imaging facilities you want included in your USRad Provider Service Agreement. 
                    These locations will be added as <strong>"Exhibit B - Authorized Facilities"</strong> to your contract.
                  </p>
                  <div className="flex items-center space-x-6 text-xs text-blue-700">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span>Individual facilities supported</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span>Multiple locations under one agreement</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span>Add/remove facilities anytime</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Manual Entry Form - Using Extracted Component */}
            {showManualEntry && (
              <ManualFacilityEntry
                manualFacility={manualFacility}
                setManualFacility={setManualFacility}
                errors={errors}
                onAddFacility={addManualFacility}
                onCancel={() => setShowManualEntry(false)}
              />
            )}

            {/* Selected Facilities List - Using Extracted Component */}
            <SelectedFacilitiesList
              selectedFacilities={selectedFacilities}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              onSetPrimary={setPrimaryFacility}
              onRemoveFacility={removeFacility}
            />
          </div>
        );

      case 3:
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

                  {/* Facility List Display */}
                  {selectedFacilities.length <= 5 || showFullFacilityList ? (
                    <div className="space-y-3">
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
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {/* Condensed view for large lists */}
                      <div className="bg-white rounded-lg p-3 border border-green-200 border-dashed">
                        <div className="text-center">
                          <span className="text-sm font-medium text-gray-700">
                            {selectedFacilities.length} facilities selected
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            Click "▼ Show All Facilities" to view complete list
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Download/Export Option */}
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
                    onClick={() => setCurrentStep(2)}
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

      default:
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Step {currentStep} Coming Soon</h3>
            <p className="text-gray-600">This step is being built with the same enterprise quality you've experienced.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Enhanced Header with Progress */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full transform translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-full transform -translate-x-12 translate-y-12"></div>
          
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">USRad Network Enrollment</h1>
                <p className="text-gray-600 text-lg">Complete your facility registration to join the premier imaging network</p>
              </div>
              <div className="text-right">
                <div className="relative">
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    {progress.completionPercentage || 20}%
                  </div>
                  <div className="text-sm text-gray-500 font-semibold">COMPLETE</div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Progress Bar */}
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
                  style={{ width: `${progress.completionPercentage || 20}%` }}
                ></div>
              </div>
              <div className="absolute -top-2 transition-all duration-1000 ease-out" style={{ left: `calc(${progress.completionPercentage || 20}% - 12px)` }}>
                <div className="w-6 h-6 bg-white border-4 border-blue-500 rounded-full shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Step Navigation */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Organization', icon: Building2, color: 'blue' },
              { num: 2, label: 'Facilities', icon: Search, color: 'emerald' },
              { num: 3, label: 'PSA Review & Signing', icon: Shield, color: 'purple' },
              { num: 4, label: 'Integration', icon: Zap, color: 'orange' },
              { num: 5, label: 'Activation', icon: CheckCircle, color: 'green' }
            ].map((step, index) => {
              const IconComponent = step.icon;
              const isActive = currentStep >= step.num;
              const isCurrent = currentStep === step.num;
              
              return (
                <div key={step.num} className="flex items-center">
                  <div className="relative">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg transition-all duration-300 shadow-lg ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    } ${isCurrent ? 'ring-4 ring-blue-100 scale-110' : ''}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    {isCurrent && (
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  {index < 4 && (
                    <div className={`w-20 h-2 mx-3 rounded-full transition-all duration-500 ${
                      currentStep > step.num ? 'bg-gradient-to-r from-blue-500 to-emerald-500' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 flex justify-between text-sm font-semibold text-gray-600">
            <span>Organization</span>
            <span>Facilities</span>
            <span>PSA Review & Signing</span>
            <span>Integration</span>
            <span>Activation</span>
          </div>
        </div>

        {/* Enhanced Step Content */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 mb-8 min-h-[600px]">
          {renderStepContent()}
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex justify-between items-center bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="flex items-center px-8 py-4 text-gray-700 border-2 border-gray-300 rounded-2xl hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
          >
            <ArrowRight className="h-5 w-5 mr-2 transform rotate-180" />
            Previous
          </button>
          
          <div className="flex items-center space-x-4">
            {saveMessage && (
              <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
                saveMessage.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {saveMessage}
              </div>
            )}
            
            <button
              onClick={saveProgress}
              disabled={isSaving}
              className="flex items-center px-8 py-4 text-gray-700 border-2 border-gray-300 rounded-2xl hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 transition-all font-semibold"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500 mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Download className="h-5 w-5 mr-2" />
                  Save Progress
                </>
              )}
            </button>
            
            <button
              onClick={async () => {
                // Step 1: Always go to Step 2
                if (currentStep === 1) {
                  if (canProceedToNextStep()) {
                    setCurrentStep(2);
                  }
                }
                // Step 2: Handle facilities and navigation
                else if (currentStep === 2) {
                  if (selectedFacilities.length > 0) {
                    try {
                      await saveProgress();
                      
                      // Check if user came to edit facilities
                      const urlParams = new URLSearchParams(window.location.search);
                      const returnTo = urlParams.get('returnTo');
                      
                      if (returnTo) {
                        // User came back to edit, return them to where they were
                        window.location.href = returnTo;
                      } else {
                        // Normal flow - check localStorage flags
                        const marketEducationCompleted = localStorage.getItem('market_education_completed');
                        const contractTermsAccepted = localStorage.getItem('contract_terms_accepted');
                        const psaConfirmationCompleted = localStorage.getItem('psa_confirmation_completed');
                        
                        if (!marketEducationCompleted) {
                          window.location.href = '/dashboard/contract/market-education';
                        } else if (!contractTermsAccepted) {
                          window.location.href = '/dashboard/contract/terms';
                        } else if (!psaConfirmationCompleted) {
                          window.location.href = '/dashboard/contract/confirmation';
                        } else {
                          window.location.href = '/dashboard/onboarding/psa';
                        }
                      }
                    } catch (error) {
                      console.error('Error saving facilities:', error);
                      alert('Error saving facilities. Please try again.');
                    }
                  } else {
                    alert('Please select at least one facility before continuing.');
                  }
                }
                // Other steps: normal progression
                else {
                  setCurrentStep(Math.min(5, currentStep + 1));
                }
              }}
              disabled={currentStep === 5 || !canProceedToNextStep() || isSaving}
              className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg hover:shadow-xl"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="h-5 w-5 ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityManager;