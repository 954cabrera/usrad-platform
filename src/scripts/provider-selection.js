// ===========================================
// src/scripts/provider-selection.js
// Provider selection and booking functionality extraction
// Handles booking modals, selection state, and booking flow
// ===========================================

class ProviderSelectionManager {
    constructor() {
      this.selectedProvider = null;
      this.selectedProviderIndex = -1;
      this.bookingModal = null;
      this.bookingStep = 'selection'; // selection, details, confirmation
      this.bookingData = {};
      this.onProviderSelected = null;
      this.onBookingCompleted = null;
      
      // Initialize modal and event handlers
      this.initializeModal();
      this.setupEventHandlers();
    }
  
    // ===========================================
    // Provider Selection
    // ===========================================
  
    selectProvider(providerId, providerIndex) {
      try {
        // Find provider data
        const provider = this.findProviderById(providerId);
        
        if (!provider) {
          console.error('Provider not found:', providerId);
          return;
        }
  
        this.selectedProvider = provider;
        this.selectedProviderIndex = providerIndex;
  
        // Update UI to show selection
        this.highlightSelectedProvider(providerIndex);
        
        // Show booking modal
        this.showBookingModal();
  
        // Call external callback
        if (this.onProviderSelected) {
          this.onProviderSelected(provider, providerIndex);
        }
  
        // Analytics tracking
        this.trackProviderSelection(provider);
  
        console.log('✅ Provider selected:', provider.facility_name);
  
      } catch (error) {
        console.error('❌ Error selecting provider:', error);
        this.showError('Failed to select provider. Please try again.');
      }
    }
  
    findProviderById(providerId) {
      // Get providers from global search engine or window
      const searchEngine = window.searchEngine || window.USRadSearchEngine;
      
      if (searchEngine && searchEngine.getResults) {
        const providers = searchEngine.getResults();
        return providers.find(p => p.id === providerId);
      }
  
      // Fallback: search in DOM data attributes
      const providerElements = document.querySelectorAll('[data-provider-id]');
      for (const element of providerElements) {
        if (element.dataset.providerId === providerId) {
          try {
            return JSON.parse(element.dataset.providerData);
          } catch (e) {
            console.warn('Invalid provider data in DOM element');
          }
        }
      }
  
      return null;
    }
  
    highlightSelectedProvider(index) {
      // Remove existing selection highlights
      document.querySelectorAll('.provider-card').forEach(card => {
        card.classList.remove('ring-4', 'ring-green-500', 'bg-green-50');
      });
  
      // Highlight selected provider
      const selectedCard = document.querySelector(`[data-provider-index="${index}"]`);
      if (selectedCard) {
        selectedCard.classList.add('ring-4', 'ring-green-500', 'bg-green-50');
      }
  
      // Update map marker if map manager exists
      if (window.mapManager && window.mapManager.highlightMarkerByIndex) {
        window.mapManager.highlightMarkerByIndex(index);
      }
    }
  
    // ===========================================
    // Booking Modal Management
    // ===========================================
  
    initializeModal() {
      // Create modal if it doesn't exist
      if (!document.getElementById('bookingModal')) {
        this.createBookingModal();
      }
      
      this.bookingModal = document.getElementById('bookingModal');
    }
  
    createBookingModal() {
      const modalHtml = `
        <div id="bookingModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden">
          <div class="flex items-center justify-center min-h-screen p-4">
            <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
              <div id="modalHeader" class="flex items-center justify-between p-6 border-b">
                <h3 class="text-lg font-semibold text-gray-900">Book Your Appointment</h3>
                <button id="closeModal" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div id="modalContent" class="p-6">
                <!-- Dynamic content will be inserted here -->
              </div>
            </div>
          </div>
        </div>
      `;
  
      document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
  
    showBookingModal() {
      if (!this.selectedProvider) {
        console.error('No provider selected');
        return;
      }
  
      this.bookingStep = 'selection';
      this.updateModalContent();
      this.bookingModal.classList.remove('hidden');
      
      // Prevent body scroll
      document.body.classList.add('overflow-hidden');
    }
  
    hideBookingModal() {
      this.bookingModal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
      
      // Clear selection highlighting after modal closes
      setTimeout(() => {
        this.clearProviderHighlighting();
      }, 300);
    }
  
    updateModalContent() {
      const modalContent = document.getElementById('modalContent');
      
      switch (this.bookingStep) {
        case 'selection':
          modalContent.innerHTML = this.createSelectionStepContent();
          break;
        case 'details':
          modalContent.innerHTML = this.createDetailsStepContent();
          break;
        case 'confirmation':
          modalContent.innerHTML = this.createConfirmationStepContent();
          break;
      }
  
      // Setup step-specific event handlers
      this.setupStepEventHandlers();
    }
  
    // ===========================================
    // Modal Content Steps
    // ===========================================
  
    createSelectionStepContent() {
      const provider = this.selectedProvider;
      const pricing = provider.pricing;
      const savings = Math.round(pricing.patient_savings);
  
      return `
        <div class="space-y-6">
          <!-- Provider Summary -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 class="font-semibold text-blue-900 mb-2">${provider.facility_name}</h4>
            <p class="text-sm text-blue-800 mb-1">📍 ${provider.address}</p>
            ${provider.phone ? `<p class="text-sm text-blue-800">📞 ${provider.phone}</p>` : ''}
          </div>
  
          <!-- Pricing Summary -->
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <div class="flex justify-between items-center mb-3">
              <span class="text-lg font-semibold text-gray-900">Your Price:</span>
              <span class="text-2xl font-bold text-green-600">$${Math.round(pricing.patient_price)}</span>
            </div>
            
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Medicare Rate:</span>
                <span class="font-medium">$${Math.round(pricing.medicare_rate)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">USRad Service Fee:</span>
                <span class="font-medium">$${Math.round(pricing.patient_price - pricing.medicare_rate)}</span>
              </div>
              <div class="border-t pt-2 flex justify-between font-semibold text-green-600">
                <span>You Save:</span>
                <span>$${savings} (${pricing.savings_percentage}%)</span>
              </div>
            </div>
          </div>
  
          <!-- What You Get -->
          <div class="space-y-3">
            <h5 class="font-semibold text-gray-900">What's Included:</h5>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-center">
                <span class="text-green-500 mr-2">✓</span>
                Professional radiology scan
              </li>
              <li class="flex items-center">
                <span class="text-green-500 mr-2">✓</span>
                Board-certified radiologist review
              </li>
              <li class="flex items-center">
                <span class="text-green-500 mr-2">✓</span>
                Digital report delivery within 24-48 hours
              </li>
              <li class="flex items-center">
                <span class="text-green-500 mr-2">✓</span>
                Images and report accessible in your portal
              </li>
              <li class="flex items-center">
                <span class="text-green-500 mr-2">✓</span>
                Direct physician sharing if needed
              </li>
            </ul>
          </div>
  
          <!-- Next Steps -->
          <div class="space-y-4">
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h6 class="font-medium text-gray-900 mb-2">Next Steps:</h6>
              <ol class="text-sm text-gray-600 space-y-1">
                <li>1. Provide your contact information</li>
                <li>2. Secure payment processing</li>
                <li>3. Receive booking confirmation</li>
                <li>4. Center will contact you for scheduling</li>
              </ol>
            </div>
          </div>
  
          <!-- Action Buttons -->
          <div class="flex space-x-3 pt-4">
            <button id="cancelBooking" class="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button id="continueBooking" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
              Continue to Book - Save $${savings}
            </button>
          </div>
        </div>
      `;
    }
  
    createDetailsStepContent() {
      return `
        <div class="space-y-6">
          <!-- Progress Indicator -->
          <div class="flex items-center space-x-2 mb-6">
            <div class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
            <div class="h-1 bg-green-500 flex-1"></div>
            <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
            <div class="h-1 bg-gray-200 flex-1"></div>
            <div class="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">3</div>
          </div>
  
          <!-- Contact Information Form -->
          <div class="space-y-4">
            <h4 class="font-semibold text-gray-900">Contact Information</h4>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input type="text" id="firstName" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" id="lastName" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              </div>
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" id="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              <p class="text-xs text-gray-500 mt-1">We'll send confirmation and results here</p>
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="tel" id="phone" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              <p class="text-xs text-gray-500 mt-1">Center will contact you to schedule</p>
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input type="date" id="dateOfBirth" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            </div>
          </div>
  
          <!-- Insurance Information -->
          <div class="space-y-4">
            <h4 class="font-semibold text-gray-900">Insurance Information (Optional)</h4>
            <p class="text-sm text-gray-600">While you're paying directly for savings, providing insurance info helps with medical records.</p>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Insurance Provider</label>
              <input type="text" id="insuranceProvider" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Blue Cross, Aetna, Medicare">
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Member ID</label>
              <input type="text" id="memberId" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
          </div>
  
          <!-- Action Buttons -->
          <div class="flex space-x-3 pt-4">
            <button id="backToSelection" class="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
              Back
            </button>
            <button id="proceedToPayment" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
              Proceed to Payment
            </button>
          </div>
        </div>
      `;
    }
  
    createConfirmationStepContent() {
      const provider = this.selectedProvider;
      const pricing = provider.pricing;
  
      return `
        <div class="space-y-6">
          <!-- Progress Indicator -->
          <div class="flex items-center space-x-2 mb-6">
            <div class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
            <div class="h-1 bg-green-500 flex-1"></div>
            <div class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
            <div class="h-1 bg-green-500 flex-1"></div>
            <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
          </div>
  
          <!-- Success Message -->
          <div class="text-center py-6">
            <div class="text-6xl mb-4">✅</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Booking Confirmed!</h3>
            <p class="text-gray-600">Your appointment request has been submitted successfully.</p>
          </div>
  
          <!-- Booking Summary -->
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
            <h4 class="font-semibold text-gray-900">Booking Summary</h4>
            
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Provider:</span>
                <span class="font-medium">${provider.facility_name}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Procedure:</span>
                <span class="font-medium">MRI Brain without contrast</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Amount Paid:</span>
                <span class="font-medium text-green-600">$${Math.round(pricing.patient_price)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Savings:</span>
                <span class="font-medium text-green-600">$${Math.round(pricing.patient_savings)}</span>
              </div>
            </div>
          </div>
  
          <!-- Next Steps -->
          <div class="space-y-4">
            <h4 class="font-semibold text-gray-900">What Happens Next:</h4>
            
            <div class="space-y-3">
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">1</div>
                <div>
                  <p class="font-medium text-gray-900">Center Contact (Within 24 hours)</p>
                  <p class="text-sm text-gray-600">${provider.facility_name} will call you to schedule your appointment at a convenient time.</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">2</div>
                <div>
                  <p class="font-medium text-gray-900">Attend Your Appointment</p>
                  <p class="text-sm text-gray-600">Arrive 15 minutes early with a valid ID. The procedure typically takes 30-45 minutes.</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">3</div>
                <div>
                  <p class="font-medium text-gray-900">Receive Your Results (24-48 hours)</p>
                  <p class="text-sm text-gray-600">Your report will be available in your USRad portal and can be shared with your physician.</p>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Contact Information -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 class="font-medium text-blue-900 mb-2">Need Help?</h5>
            <div class="space-y-1 text-sm text-blue-800">
              <p>📧 Email: support@usrad.com</p>
              <p>📞 Phone: 1-800-USRAD-01</p>
              <p>💬 Live chat available 8am-8pm EST</p>
            </div>
          </div>
  
          <!-- Action Button -->
          <div class="pt-4">
            <button id="closeBookingModal" class="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium">
              View My Dashboard
            </button>
          </div>
        </div>
      `;
    }
  
    // ===========================================
    // Event Handlers
    // ===========================================
  
    setupEventHandlers() {
      // Modal close button
      document.addEventListener('click', (e) => {
        if (e.target.id === 'closeModal' || e.target.closest('#closeModal')) {
          this.hideBookingModal();
        }
      });
  
      // Click outside modal to close
      document.addEventListener('click', (e) => {
        if (e.target.id === 'bookingModal') {
          this.hideBookingModal();
        }
      });
  
      // Escape key to close
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !this.bookingModal.classList.contains('hidden')) {
          this.hideBookingModal();
        }
      });
    }
  
    setupStepEventHandlers() {
      // Selection step handlers
      const cancelBooking = document.getElementById('cancelBooking');
      const continueBooking = document.getElementById('continueBooking');
      
      if (cancelBooking) {
        cancelBooking.addEventListener('click', () => this.hideBookingModal());
      }
      
      if (continueBooking) {
        continueBooking.addEventListener('click', () => this.goToDetailsStep());
      }
  
      // Details step handlers
      const backToSelection = document.getElementById('backToSelection');
      const proceedToPayment = document.getElementById('proceedToPayment');
      
      if (backToSelection) {
        backToSelection.addEventListener('click', () => this.goToSelectionStep());
      }
      
      if (proceedToPayment) {
        proceedToPayment.addEventListener('click', () => this.processPayment());
      }
  
      // Confirmation step handlers
      const closeBookingModal = document.getElementById('closeBookingModal');
      
      if (closeBookingModal) {
        closeBookingModal.addEventListener('click', () => this.completeBooking());
      }
    }
  
    // ===========================================
    // Step Navigation
    // ===========================================
  
    goToSelectionStep() {
      this.bookingStep = 'selection';
      this.updateModalContent();
    }
  
    goToDetailsStep() {
      this.bookingStep = 'details';
      this.updateModalContent();
    }
  
    goToConfirmationStep() {
      this.bookingStep = 'confirmation';
      this.updateModalContent();
    }
  
    // ===========================================
    // Payment Processing
    // ===========================================
  
    async processPayment() {
      try {
        // Collect form data
        const formData = this.collectBookingFormData();
        
        if (!this.validateBookingData(formData)) {
          return;
        }
  
        // Show loading state
        this.showPaymentLoading();
  
        // Process payment (integrate with Stripe)
        const paymentResult = await this.processStripePayment(formData);
        
        if (paymentResult.success) {
          // Save booking data
          await this.saveBookingData(formData, paymentResult);
          
          // Go to confirmation
          this.goToConfirmationStep();
          
          // Track successful booking
          this.trackBookingCompleted(formData);
        } else {
          throw new Error(paymentResult.error || 'Payment failed');
        }
  
      } catch (error) {
        console.error('❌ Payment processing error:', error);
        this.showPaymentError(error.message);
      }
    }
  
    collectBookingFormData() {
      return {
        provider: this.selectedProvider,
        firstName: document.getElementById('firstName')?.value || '',
        lastName: document.getElementById('lastName')?.value || '',
        email: document.getElementById('email')?.value || '',
        phone: document.getElementById('phone')?.value || '',
        dateOfBirth: document.getElementById('dateOfBirth')?.value || '',
        insuranceProvider: document.getElementById('insuranceProvider')?.value || '',
        memberId: document.getElementById('memberId')?.value || '',
        procedure: 'MRI Brain without contrast',
        procedureCode: '70551',
        amount: Math.round(this.selectedProvider.pricing.patient_price)
      };
    }
  
    validateBookingData(data) {
      const required = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth'];
      
      for (const field of required) {
        if (!data[field]) {
          this.showFieldError(field, 'This field is required');
          return false;
        }
      }
  
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        this.showFieldError('email', 'Please enter a valid email address');
        return false;
      }
  
      return true;
    }
  
    showFieldError(fieldId, message) {
      const field = document.getElementById(fieldId);
      if (field) {
        field.classList.add('border-red-500');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
          existingError.remove();
        }
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error text-sm text-red-600 mt-1';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
        
        // Focus the field
        field.focus();
      }
    }
  
    async processStripePayment(formData) {
      // Mock payment processing - replace with actual Stripe integration
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            paymentIntentId: 'pi_mock_' + Date.now(),
            receiptUrl: 'https://stripe.com/receipts/mock'
          });
        }, 2000);
      });
    }
  
    async saveBookingData(formData, paymentResult) {
      // Save booking to your database
      const bookingData = {
        ...formData,
        paymentIntentId: paymentResult.paymentIntentId,
        bookingId: 'usrad_' + Date.now(),
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };
  
      this.bookingData = bookingData;
      
      // In a real implementation, save to Supabase
      console.log('📝 Booking saved:', bookingData);
    }
  
    // ===========================================
    // UI State Management
    // ===========================================
  
    showPaymentLoading() {
      const proceedButton = document.getElementById('proceedToPayment');
      if (proceedButton) {
        proceedButton.innerHTML = `
          <div class="flex items-center justify-center">
            <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Processing Payment...
          </div>
        `;
        proceedButton.disabled = true;
      }
    }
  
    showPaymentError(message) {
      this.showError(`Payment failed: ${message}`);
      
      // Reset button
      const proceedButton = document.getElementById('proceedToPayment');
      if (proceedButton) {
        proceedButton.innerHTML = 'Proceed to Payment';
        proceedButton.disabled = false;
      }
    }
  
    showError(message) {
      // Create or update error display in modal
      let errorDiv = document.getElementById('modalError');
      if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = 'modalError';
        errorDiv.className = 'bg-red-50 border border-red-200 rounded-lg p-3 mb-4';
        
        const modalContent = document.getElementById('modalContent');
        modalContent.insertBefore(errorDiv, modalContent.firstChild);
      }
      
      errorDiv.innerHTML = `
        <div class="flex items-center">
          <div class="text-red-500 mr-2">⚠️</div>
          <div class="text-red-800 text-sm">${message}</div>
        </div>
      `;
      
      errorDiv.classList.remove('hidden');
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        errorDiv.classList.add('hidden');
      }, 5000);
    }
  
    clearProviderHighlighting() {
      document.querySelectorAll('.provider-card').forEach(card => {
        card.classList.remove('ring-4', 'ring-green-500', 'bg-green-50', 'ring-2', 'ring-blue-500', 'shadow-lg');
      });
    }
  
    completeBooking() {
      this.hideBookingModal();
      
      // Call external callback
      if (this.onBookingCompleted) {
        this.onBookingCompleted(this.bookingData);
      }
      
      // Redirect to dashboard or show success page
      this.showBookingSuccess();
    }
  
    showBookingSuccess() {
      // Show a temporary success notification
      const successNotification = document.createElement('div');
      successNotification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      successNotification.innerHTML = `
        <div class="flex items-center">
          <span class="mr-2">✅</span>
          <span>Booking confirmed! Check your email for details.</span>
        </div>
      `;
      
      document.body.appendChild(successNotification);
      
      // Auto-remove after 5 seconds
      setTimeout(() => {
        successNotification.remove();
      }, 5000);
    }
  
    // ===========================================
    // Analytics and Tracking
    // ===========================================
  
    trackProviderSelection(provider) {
      if (window.gtag) {
        window.gtag('event', 'provider_selected', {
          provider_id: provider.id,
          provider_name: provider.facility_name,
          price: provider.pricing.patient_price,
          savings: provider.pricing.patient_savings
        });
      }
    }
  
    trackBookingCompleted(formData) {
      if (window.gtag) {
        window.gtag('event', 'booking_completed', {
          provider_id: formData.provider.id,
          provider_name: formData.provider.facility_name,
          amount: formData.amount,
          procedure: formData.procedure
        });
      }
    }
  
    // ===========================================
    // Public API
    // ===========================================
  
    getSelectedProvider() {
      return this.selectedProvider;
    }
  
    getBookingData() {
      return this.bookingData;
    }
  
    setOnProviderSelected(callback) {
      this.onProviderSelected = callback;
    }
  
    setOnBookingCompleted(callback) {
      this.onBookingCompleted = callback;
    }
  
    reset() {
      this.selectedProvider = null;
      this.selectedProviderIndex = -1;
      this.bookingStep = 'selection';
      this.bookingData = {};
      this.clearProviderHighlighting();
    }
  }
  
  // Export for use in components
  export default ProviderSelectionManager;
  
  // Also make available globally for Astro components
  if (typeof window !== 'undefined') {
    window.ProviderSelectionManager = ProviderSelectionManager;
    window.providerSelectionManager = new ProviderSelectionManager();
  }