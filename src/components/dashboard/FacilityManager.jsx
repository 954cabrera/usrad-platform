import React from 'react';
import { 
  Search, Building, Users, CheckCircle, Zap, TrendingUp,
  Building2, Shield, FileText, Download, ArrowRight
} from 'lucide-react';

// Import extracted components
import CorporateInfoForm from '../facility/CorporateInfoForm';
import FacilitySearch from '../facility/FacilitySearch';
import SelectedFacilitiesList from '../facility/SelectedFacilitiesList';
import ManualFacilityEntry from '../facility/ManualFacilityEntry';
import PSAReviewAndSigning from '../psa/PSAReviewAndSigning';
import OrganizationTypeSelector from '../facility/OrganizationTypeSelector';

// Import custom hook
import { useFacilityManager } from '../../hooks/useFacilityManager';

const FacilityManager = () => {
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
          <PSAReviewAndSigning
            corporateInfo={corporateInfo}
            selectedFacilities={selectedFacilities}
            organizationType={organizationType}
            isSaving={isSaving}
            onSave={saveProgress}
            onBackToFacilities={() => setCurrentStep(2)}
          />
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