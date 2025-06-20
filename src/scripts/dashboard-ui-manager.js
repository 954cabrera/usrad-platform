// dashboard-ui-manager.js - Dashboard UI State Management
export class DashboardUIManager {
    constructor() {
      this.currentUser = null;
      this.hasCompletedPSA = false;
      this.onboardingProgress = 0;
    }
  
    async initialize(authManager) {
      this.authManager = authManager;
      await this.updateUIState();
      this.bindEventListeners();
    }
  
    async updateUIState() {
      if (!this.authManager) return;
  
      this.currentUser = this.authManager.user;
      this.hasCompletedPSA = this.authManager.profile?.psa_signed || 
                            this.authManager.user?.user_metadata?.psa_signed || false;
      this.onboardingProgress = this.authManager.calculateOnboardingProgress();
  
      // Update UI elements
      this.updateUserProfile();
      this.updateNavigationLocks();
      this.updateProgressIndicator();
      this.updatePSABanner();
    }
  
    updateUserProfile() {
      const userNameElement = document.getElementById('user-display-name');
      const userEmailElement = document.getElementById('user-email');
      const userAvatarElement = document.getElementById('user-avatar');
  
      if (userNameElement) {
        userNameElement.textContent = this.authManager.getUserDisplayName();
      }
  
      if (userEmailElement && this.currentUser?.email) {
        userEmailElement.textContent = this.currentUser.email;
      }
  
      if (userAvatarElement && this.authManager.getUserDisplayName()) {
        userAvatarElement.textContent = this.authManager.getUserDisplayName().charAt(0).toUpperCase();
      }
    }
  
    updateNavigationLocks() {
      const lockedItems = document.querySelectorAll('[data-requires-psa]');
      
      lockedItems.forEach(item => {
        if (this.hasCompletedPSA) {
          item.classList.remove('locked-nav-item');
          item.removeAttribute('data-locked');
          
          // Remove lock icon if present
          const lockIcon = item.querySelector('.lock-icon');
          if (lockIcon) lockIcon.remove();
        } else {
          item.classList.add('locked-nav-item');
          item.setAttribute('data-locked', 'true');
          
          // Add lock icon if not present
          if (!item.querySelector('.lock-icon')) {
            const lockIcon = document.createElement('span');
            lockIcon.className = 'lock-icon text-yellow-500 ml-2';
            lockIcon.innerHTML = '🔒';
            item.appendChild(lockIcon);
          }
        }
      });
    }
  
    updateProgressIndicator() {
      const progressBar = document.getElementById('onboarding-progress-bar');
      const progressText = document.getElementById('onboarding-progress-text');
  
      if (progressBar) {
        progressBar.style.width = `${this.onboardingProgress}%`;
      }
  
      if (progressText) {
        progressText.textContent = `${this.onboardingProgress}% Complete`;
      }
    }
  
    updatePSABanner() {
      const psaBanner = document.getElementById('psa-completion-banner');
      
      if (psaBanner) {
        if (!this.hasCompletedPSA && this.onboardingProgress >= 75) {
          psaBanner.classList.remove('hidden');
          this.animatePSABanner();
        } else {
          psaBanner.classList.add('hidden');
        }
      }
    }
  
    animatePSABanner() {
      const banner = document.getElementById('psa-completion-banner');
      if (!banner) return;
  
      // Add pulse animation
      banner.classList.add('animate-pulse');
      
      // Remove animation after 3 seconds
      setTimeout(() => {
        banner.classList.remove('animate-pulse');
      }, 3000);
    }
  
    bindEventListeners() {
      // Handle locked navigation clicks
      document.addEventListener('click', (e) => {
        const lockedItem = e.target.closest('[data-locked="true"]');
        if (lockedItem) {
          e.preventDefault();
          this.showLockedFeatureModal();
        }
      });
  
      // Handle logout clicks
      const logoutButtons = document.querySelectorAll('[data-action="logout"]');
      logoutButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          this.handleLogout();
        });
      });
    }
  
    showLockedFeatureModal() {
      // Create or show a modal explaining the feature is locked
      const modal = document.getElementById('locked-feature-modal') || this.createLockedFeatureModal();
      modal.classList.remove('hidden');
    }
  
    createLockedFeatureModal() {
      const modal = document.createElement('div');
      modal.id = 'locked-feature-modal';
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden';
      
      modal.innerHTML = `
        <div class="bg-white rounded-xl p-6 max-w-md mx-4">
          <div class="text-center">
            <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">🔒</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Feature Locked</h3>
            <p class="text-gray-600 mb-4">
              Complete your PSA signing to unlock all dashboard features.
            </p>
            <div class="flex space-x-3">
              <button class="btn-secondary" onclick="document.getElementById('locked-feature-modal').classList.add('hidden')">
                Close
              </button>
              <button class="btn-primary" onclick="window.location.href='/dashboard/onboarding/psa'">
                Complete PSA
              </button>
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      return modal;
    }
  
    async handleLogout() {
      if (this.authManager) {
        await this.authManager.signOut();
      }
    }
  }