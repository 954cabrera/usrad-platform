// ===========================================
// src/scripts/ui-manager.js
// UI state management and interactions extraction
// Handles loading states, modals, animations, and general UI behavior
// ===========================================

class UIManager {
    constructor() {
      this.loadingStates = new Map();
      this.activeModals = [];
      this.animationQueue = [];
      this.observers = new Map();
      
      // UI state
      this.currentView = 'search'; // search, results, loading
      this.isMobile = window.innerWidth < 768;
      
      // Setup global event listeners
      this.setupGlobalEventListeners();
      this.setupIntersectionObservers();
    }
  
    // ===========================================
    // Loading State Management
    // ===========================================
  
    showLoading(elementId, message = 'Loading...', options = {}) {
      const element = document.getElementById(elementId);
      if (!element) {
        console.warn(`Loading element '${elementId}' not found`);
        return;
      }
  
      // Store original content if not already stored
      if (!this.loadingStates.has(elementId)) {
        this.loadingStates.set(elementId, {
          originalContent: element.innerHTML,
          originalClasses: element.className
        });
      }
  
      // Create loading content
      const loadingContent = this.createLoadingContent(message, options);
      
      // Apply loading state
      element.innerHTML = loadingContent;
      element.classList.add('loading-state');
      
      // Add loading animation class
      if (options.animate !== false) {
        element.classList.add('fade-in');
      }
  
      console.log(`✅ Loading state shown for: ${elementId}`);
    }
  
    hideLoading(elementId, options = {}) {
      const element = document.getElementById(elementId);
      if (!element) {
        console.warn(`Loading element '${elementId}' not found`);
        return;
      }
  
      const storedState = this.loadingStates.get(elementId);
      if (!storedState) {
        console.warn(`No stored state found for: ${elementId}`);
        return;
      }
  
      // Restore original content with animation
      if (options.animate !== false) {
        element.classList.add('fade-out');
        
        setTimeout(() => {
          element.innerHTML = storedState.originalContent;
          element.className = storedState.originalClasses;
          element.classList.add('fade-in');
          
          // Clean up animation class
          setTimeout(() => {
            element.classList.remove('fade-in');
          }, 300);
          
        }, 150);
      } else {
        element.innerHTML = storedState.originalContent;
        element.className = storedState.originalClasses;
      }
  
      // Clean up stored state
      this.loadingStates.delete(elementId);
  
      console.log(`✅ Loading state hidden for: ${elementId}`);
    }
  
    createLoadingContent(message, options = {}) {
      const spinnerType = options.spinner || 'default';
      const showMessage = options.showMessage !== false;
      const size = options.size || 'medium';
      
      const sizeClasses = {
        small: 'h-4 w-4',
        medium: 'h-8 w-8',
        large: 'h-12 w-12'
      };
  
      const spinners = {
        default: `<div class="animate-spin rounded-full ${sizeClasses[size]} border-b-2 border-blue-600"></div>`,
        dots: `<div class="flex space-x-1">
          <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
          <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
        </div>`,
        pulse: `<div class="${sizeClasses[size]} bg-blue-600 rounded-full animate-pulse"></div>`
      };
  
      return `
        <div class="flex flex-col items-center justify-center py-8 space-y-4">
          ${spinners[spinnerType]}
          ${showMessage ? `<span class="text-gray-600 font-medium">${message}</span>` : ''}
          ${options.subMessage ? `<p class="text-sm text-gray-500 text-center">${options.subMessage}</p>` : ''}
        </div>
      `;
    }
  
    // ===========================================
    // Search State Management
    // ===========================================
  
    showSearchLoading() {
      this.showLoading('loadingState', '🔍 Searching providers', {
        subMessage: 'Analyzing Medicare rates across our network of 1,500+ centers',
        animate: true
      });
      
      this.hideElement('resultsContainer');
      this.showElement('loadingState');
    }
  
    showSearchResults(results) {
      this.hideLoading('loadingState');
      this.hideElement('loadingState');
      this.showElement('resultsContainer');
      
      // Update results summary
      this.updateSearchSummary(results);
      
      // Add entrance animation to results
      this.animateElementsIn('.provider-card', { delay: 100 });
    }
  
    updateSearchSummary(results) {
      const summaryElement = document.getElementById('summaryText');
      const networkBadge = document.getElementById('networkBadge');
      
      if (summaryElement && results) {
        const count = results.results?.length || 0;
        const avgSavings = results.averageSavings || 0;
        
        summaryElement.textContent = `Found ${count} providers • Average savings: ${avgSavings}% vs hospitals`;
      }
      
      if (networkBadge) {
        networkBadge.classList.add('animate-pulse');
        setTimeout(() => {
          networkBadge.classList.remove('animate-pulse');
        }, 2000);
      }
    }
  
    // ===========================================
    // Element Visibility Management
    // ===========================================
  
    showElement(elementId, animation = 'fade') {
      const element = document.getElementById(elementId);
      if (!element) return;
  
      element.classList.remove('hidden');
      
      if (animation === 'fade') {
        element.classList.add('fade-in');
      } else if (animation === 'slide') {
        element.classList.add('slide-in-up');
      }
    }
  
    hideElement(elementId, animation = 'fade') {
      const element = document.getElementById(elementId);
      if (!element) return;
  
      if (animation === 'fade') {
        element.classList.add('fade-out');
        setTimeout(() => {
          element.classList.add('hidden');
          element.classList.remove('fade-out');
        }, 300);
      } else {
        element.classList.add('hidden');
      }
    }
  
    toggleElement(elementId, animation = 'fade') {
      const element = document.getElementById(elementId);
      if (!element) return;
  
      if (element.classList.contains('hidden')) {
        this.showElement(elementId, animation);
      } else {
        this.hideElement(elementId, animation);
      }
    }
  
    // ===========================================
    // Animation Management
    // ===========================================
  
    animateElementsIn(selector, options = {}) {
      const elements = document.querySelectorAll(selector);
      const delay = options.delay || 100;
      const animation = options.animation || 'fade-in-up';
      
      elements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add(animation);
        }, index * delay);
      });
    }
  
    animateCounter(elementId, targetValue, options = {}) {
      const element = document.getElementById(elementId);
      if (!element) return;
  
      const duration = options.duration || 1000;
      const startValue = options.startValue || 0;
      const suffix = options.suffix || '';
      const prefix = options.prefix || '';
      
      let currentValue = startValue;
      const increment = (targetValue - startValue) / (duration / 16);
      
      const updateCounter = () => {
        currentValue += increment;
        
        if (currentValue >= targetValue) {
          element.textContent = prefix + Math.round(targetValue) + suffix;
        } else {
          element.textContent = prefix + Math.round(currentValue) + suffix;
          requestAnimationFrame(updateCounter);
        }
      };
      
      updateCounter();
    }
  
    // ===========================================
    // Modal Management
    // ===========================================
  
    showModal(modalId, options = {}) {
      const modal = document.getElementById(modalId);
      if (!modal) {
        console.warn(`Modal '${modalId}' not found`);
        return;
      }
  
      // Add to active modals
      this.activeModals.push(modalId);
      
      // Show modal
      modal.classList.remove('hidden');
      
      // Prevent body scroll
      if (options.preventScroll !== false) {
        document.body.classList.add('overflow-hidden');
      }
      
      // Add entrance animation
      const modalContent = modal.querySelector('[class*="modal-content"], .modal-dialog, [role="dialog"]');
      if (modalContent) {
        modalContent.classList.add('modal-enter');
      }
      
      // Setup ESC key handler
      this.setupModalEscapeHandler();
      
      console.log(`✅ Modal shown: ${modalId}`);
    }
  
    hideModal(modalId, options = {}) {
      const modal = document.getElementById(modalId);
      if (!modal) return;
  
      const modalContent = modal.querySelector('[class*="modal-content"], .modal-dialog, [role="dialog"]');
      
      // Add exit animation
      if (modalContent && options.animate !== false) {
        modalContent.classList.add('modal-exit');
        
        setTimeout(() => {
          modal.classList.add('hidden');
          modalContent.classList.remove('modal-enter', 'modal-exit');
          this.cleanupModal(modalId);
        }, 300);
      } else {
        modal.classList.add('hidden');
        this.cleanupModal(modalId);
      }
    }
  
    cleanupModal(modalId) {
      // Remove from active modals
      this.activeModals = this.activeModals.filter(id => id !== modalId);
      
      // Restore body scroll if no modals are open
      if (this.activeModals.length === 0) {
        document.body.classList.remove('overflow-hidden');
      }
    }
  
    setupModalEscapeHandler() {
      if (!this.escapeHandlerSetup) {
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && this.activeModals.length > 0) {
            const topModal = this.activeModals[this.activeModals.length - 1];
            this.hideModal(topModal);
          }
        });
        this.escapeHandlerSetup = true;
      }
    }
  
    // ===========================================
    // Toast Notifications
    // ===========================================
  
    showToast(message, type = 'info', options = {}) {
      const duration = options.duration || 5000;
      const position = options.position || 'top-right';
      
      const toast = this.createToastElement(message, type, options);
      
      // Position the toast
      this.positionToast(toast, position);
      
      // Add to page
      document.body.appendChild(toast);
      
      // Show with animation
      setTimeout(() => {
        toast.classList.add('toast-enter');
      }, 10);
      
      // Auto-hide
      setTimeout(() => {
        this.hideToast(toast);
      }, duration);
      
      return toast;
    }
  
    createToastElement(message, type, options) {
      const toast = document.createElement('div');
      toast.className = `toast toast-${type} fixed z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full opacity-0`;
      
      const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
      };
  
      const colors = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        warning: 'bg-yellow-500 text-black',
        info: 'bg-blue-500 text-white'
      };
      
      toast.classList.add(...colors[type].split(' '));
      
      toast.innerHTML = `
        <div class="flex items-center space-x-3">
          <span class="text-lg">${icons[type]}</span>
          <span class="font-medium">${message}</span>
          ${options.closeable !== false ? `
            <button class="ml-2 hover:opacity-75" onclick="this.parentElement.parentElement.remove()">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
          ` : ''}
        </div>
      `;
      
      return toast;
    }
  
    positionToast(toast, position) {
      const positions = {
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
        'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
      };
      
      toast.classList.add(...positions[position].split(' '));
    }
  
    hideToast(toast) {
      toast.classList.remove('toast-enter');
      toast.classList.add('toast-exit', 'translate-x-full', 'opacity-0');
      
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }
  
    // ===========================================
    // Intersection Observers
    // ===========================================
  
    setupIntersectionObservers() {
      // Lazy loading observer
      this.lazyLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.handleLazyLoad(entry.target);
          }
        });
      }, { threshold: 0.1 });
  
      // Animation observer
      this.animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.handleScrollAnimation(entry.target);
          }
        });
      }, { threshold: 0.2 });
    }
  
    observeElement(element, type = 'lazy') {
      if (type === 'lazy' && this.lazyLoadObserver) {
        this.lazyLoadObserver.observe(element);
      } else if (type === 'animate' && this.animationObserver) {
        this.animationObserver.observe(element);
      }
    }
  
    handleLazyLoad(element) {
      // Handle lazy loading of images, components, etc.
      if (element.dataset.src) {
        element.src = element.dataset.src;
        element.removeAttribute('data-src');
      }
      
      if (element.dataset.lazyComponent) {
        // Load component dynamically
        this.loadLazyComponent(element);
      }
      
      this.lazyLoadObserver.unobserve(element);
    }
  
    handleScrollAnimation(element) {
      element.classList.add('animate-in');
      this.animationObserver.unobserve(element);
    }
  
    // ===========================================
    // Responsive Utilities
    // ===========================================
  
    setupGlobalEventListeners() {
      // Resize handler
      window.addEventListener('resize', () => {
        this.handleResize();
      });
  
      // Scroll handler with throttling
      let scrollTimer = null;
      window.addEventListener('scroll', () => {
        if (scrollTimer) clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          this.handleScroll();
        }, 16); // ~60fps
      });
  
      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        this.handleKeyNavigation(e);
      });
    }
  
    handleResize() {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth < 768;
      
      if (wasMobile !== this.isMobile) {
        // Mobile/desktop transition
        this.handleResponsiveTransition();
      }
      
      // Trigger resize event for components
      window.dispatchEvent(new CustomEvent('uiResize', {
        detail: { isMobile: this.isMobile }
      }));
    }
  
    handleScroll() {
      const scrollY = window.scrollY;
      
      // Update scroll-based animations
      this.updateScrollAnimations(scrollY);
      
      // Trigger scroll event for components
      window.dispatchEvent(new CustomEvent('uiScroll', {
        detail: { scrollY }
      }));
    }
  
    handleKeyNavigation(e) {
      // Handle keyboard shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault();
            this.focusSearch();
            break;
        }
      }
    }
  
    handleResponsiveTransition() {
      // Handle mobile/desktop layout changes
      console.log(`📱 Responsive transition: ${this.isMobile ? 'Mobile' : 'Desktop'} mode`);
    }
  
    updateScrollAnimations(scrollY) {
      // Update elements based on scroll position
      const elements = document.querySelectorAll('[data-scroll-animation]');
      
      elements.forEach(element => {
        const animationType = element.dataset.scrollAnimation;
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
          this.applyScrollAnimation(element, animationType, scrollY);
        }
      });
    }
  
    applyScrollAnimation(element, type, scrollY) {
      switch (type) {
        case 'parallax':
          const speed = element.dataset.parallaxSpeed || 0.5;
          element.style.transform = `translateY(${scrollY * speed}px)`;
          break;
        case 'fade':
          const rect = element.getBoundingClientRect();
          const opacity = Math.max(0, Math.min(1, 1 - (rect.top / window.innerHeight)));
          element.style.opacity = opacity;
          break;
      }
    }
  
    // ===========================================
    // Utility Functions
    // ===========================================
  
    focusSearch() {
      const searchInput = document.getElementById('zipCode') || document.querySelector('input[type="search"]');
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    }
  
    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
  
    throttle(func, limit) {
      let inThrottle;
      return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    }
  
    // ===========================================
    // Public API
    // ===========================================
  
    getCurrentView() {
      return this.currentView;
    }
  
    setCurrentView(view) {
      this.currentView = view;
      document.body.setAttribute('data-view', view);
    }
  
    isMobileDevice() {
      return this.isMobile;
    }
  
    showSuccess(message, options = {}) {
      return this.showToast(message, 'success', options);
    }
  
    showError(message, options = {}) {
      return this.showToast(message, 'error', options);
    }
  
    showWarning(message, options = {}) {
      return this.showToast(message, 'warning', options);
    }
  
    showInfo(message, options = {}) {
      return this.showToast(message, 'info', options);
    }
  
    destroy() {
      // Clean up observers
      if (this.lazyLoadObserver) {
        this.lazyLoadObserver.disconnect();
      }
      if (this.animationObserver) {
        this.animationObserver.disconnect();
      }
      
      // Clear states
      this.loadingStates.clear();
      this.activeModals = [];
      this.animationQueue = [];
    }
  }
  
  // Export for use in components
  export default UIManager;
  
  // Also make available globally for Astro components
  if (typeof window !== 'undefined') {
    window.UIManager = UIManager;
    window.uiManager = new UIManager();
  }