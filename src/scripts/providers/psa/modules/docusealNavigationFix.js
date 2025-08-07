// src/scripts/providers/psa/modules/docusealNavigationFix.js
export class DocuSealNavigationFix {
  constructor() {
    this.isNavigating = false;
    this.observer = null;
  }

  initialize() {
    console.log('🔧 Initializing DocuSeal navigation fix...');
    
    // Wait for DocuSeal iframe to be ready
    this.waitForDocuSeal();
  }

  waitForDocuSeal() {
    const checkInterval = setInterval(() => {
      const docusealForm = document.querySelector('docuseal-form');
      const iframe = docusealForm?.querySelector('iframe');
      
      if (iframe) {
        console.log('✅ DocuSeal iframe detected');
        clearInterval(checkInterval);
        this.setupNavigationFix(iframe);
      }
    }, 500);

    // Stop checking after 30 seconds
    setTimeout(() => clearInterval(checkInterval), 30000);
  }

  setupNavigationFix(iframe) {
    // Ensure iframe can receive focus
    iframe.setAttribute('tabindex', '0');
    
    // Allow iframe to handle its own scrolling
    iframe.style.overflow = 'auto';
    iframe.style.webkitOverflowScrolling = 'touch';
    
    // Prevent our scroll handlers from interfering
    this.disableScrollInterference();
    
    // Monitor for DocuSeal navigation events
    this.monitorDocuSealNavigation(iframe);
    
    // Ensure proper focus handling
    this.setupFocusHandling(iframe);
    
    // Enable iframe scroll passthrough
    this.enableIframeScrollPassthrough(iframe);
  }

  disableScrollInterference() {
    // Temporarily disable any scroll event listeners when DocuSeal is navigating
    const originalAddEventListener = window.addEventListener;
    
    window.addEventListener = function(type, listener, options) {
      if (type === 'scroll' && document.querySelector('docuseal-form')) {
        // Wrap scroll listeners to check if we should ignore them
        const wrappedListener = function(event) {
          const docusealNavigating = window.docusealNavigating || false;
          if (!docusealNavigating) {
            listener.call(this, event);
          }
        };
        return originalAddEventListener.call(this, type, wrappedListener, options);
      }
      return originalAddEventListener.call(this, type, listener, options);
    };
  }

  monitorDocuSealNavigation(iframe) {
    // Listen for messages from DocuSeal
    window.addEventListener('message', (event) => {
      // Check if message is from DocuSeal iframe
      if (event.source === iframe.contentWindow) {
        console.log('📨 DocuSeal message:', event.data);
        
        // Handle field navigation
        if (event.data?.type === 'field-navigation' || 
            event.data?.action === 'navigate' ||
            event.data?.event === 'field-focus') {
          this.handleFieldNavigation();
        }
      }
    });

    // Monitor iframe for navigation attempts
    this.observeIframeChanges(iframe);
  }

  handleFieldNavigation() {
    console.log('🧭 DocuSeal field navigation detected');
    
    // Set flag to prevent interference
    window.docusealNavigating = true;
    
    // Allow DocuSeal to handle its own scrolling
    setTimeout(() => {
      window.docusealNavigating = false;
    }, 1000);
    
    // Ensure iframe has focus
    const iframe = document.querySelector('docuseal-form iframe');
    if (iframe) {
      iframe.focus();
    }
  }

  setupFocusHandling(iframe) {
    // Ensure iframe maintains focus during navigation
    iframe.addEventListener('blur', () => {
      if (window.docusealNavigating) {
        setTimeout(() => iframe.focus(), 0);
      }
    });

    // Prevent focus theft from other elements
    document.addEventListener('focusin', (event) => {
      if (window.docusealNavigating && !event.target.closest('docuseal-form')) {
        event.preventDefault();
        iframe.focus();
      }
    });
  }

  observeIframeChanges(iframe) {
    // Use MutationObserver to detect when DocuSeal is navigating
    const config = { attributes: true, attributeFilter: ['src', 'data-field', 'data-page'] };
    
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          console.log('🔄 DocuSeal iframe attribute changed:', mutation.attributeName);
          this.handleFieldNavigation();
        }
      });
    });

    this.observer.observe(iframe, config);
  }

  enableIframeScrollPassthrough(iframe) {
    // Create a wrapper to handle scroll events properly
    const docusealForm = iframe.closest('docuseal-form');
    if (!docusealForm) return;

    // Prevent parent scroll when iframe is being scrolled
    let isIframeScrolling = false;
    
    iframe.addEventListener('mouseenter', () => {
      isIframeScrolling = true;
      document.body.style.overflow = 'hidden';
    });
    
    iframe.addEventListener('mouseleave', () => {
      isIframeScrolling = false;
      document.body.style.overflow = '';
    });

    // Handle touch events for mobile
    iframe.addEventListener('touchstart', () => {
      isIframeScrolling = true;
      document.body.style.overflow = 'hidden';
    }, { passive: true });
    
    iframe.addEventListener('touchend', () => {
      setTimeout(() => {
        isIframeScrolling = false;
        document.body.style.overflow = '';
      }, 100);
    }, { passive: true });

    // Intercept scroll to field commands
    this.interceptScrollCommands(iframe);
  }

  interceptScrollCommands(iframe) {
    // Listen for DocuSeal's internal navigation commands
    const originalPostMessage = iframe.contentWindow.postMessage;
    
    if (iframe.contentWindow) {
      // Monitor for scroll-to-field messages
      window.addEventListener('message', (event) => {
        if (event.source === iframe.contentWindow) {
          console.log('📍 DocuSeal internal message:', event.data);
          
          // Check for field navigation or scroll commands
          if (event.data?.type === 'scroll-to-field' || 
              event.data?.command === 'focusField' ||
              event.data?.action === 'navigateToField') {
            this.handleScrollToField(iframe, event.data);
          }
        }
      });
    }

    // Also try to detect programmatic scrolling
    this.detectProgrammaticScroll(iframe);
  }

  handleScrollToField(iframe, data) {
    console.log('📍 Attempting to scroll to field:', data);
    
    // Set navigation flag
    window.docusealNavigating = true;
    
    // Ensure iframe has focus and can scroll
    iframe.focus();
    iframe.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Allow iframe's internal scrolling
    setTimeout(() => {
      // Try to trigger iframe's internal scroll
      if (iframe.contentWindow) {
        try {
          // Send message back to iframe to continue scrolling
          iframe.contentWindow.postMessage({
            type: 'continue-scroll',
            allowScroll: true
          }, '*');
        } catch (e) {
          console.log('Could not post message to iframe:', e);
        }
      }
      
      window.docusealNavigating = false;
    }, 500);
  }

  detectProgrammaticScroll(iframe) {
    // Create an observer to detect when DocuSeal tries to scroll
    let lastScrollTop = 0;
    let scrollCheckInterval;
    
    iframe.addEventListener('load', () => {
      console.log('🔍 DocuSeal iframe loaded, setting up scroll detection');
      
      // Try to access iframe's document (may fail due to cross-origin)
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const scrollElement = iframeDoc.documentElement || iframeDoc.body;
        
        scrollCheckInterval = setInterval(() => {
          if (scrollElement.scrollTop !== lastScrollTop) {
            console.log('📜 DocuSeal internal scroll detected');
            lastScrollTop = scrollElement.scrollTop;
            window.docusealNavigating = true;
            setTimeout(() => {
              window.docusealNavigating = false;
            }, 1000);
          }
        }, 100);
      } catch (e) {
        console.log('Cannot access iframe document (cross-origin), using alternative method');
        this.useAlternativeScrollDetection(iframe);
      }
    });
  }

  useAlternativeScrollDetection(iframe) {
    // Alternative: Monitor iframe position changes
    let lastIframeRect = iframe.getBoundingClientRect();
    
    const checkPosition = () => {
      const currentRect = iframe.getBoundingClientRect();
      
      if (currentRect.top !== lastIframeRect.top) {
        console.log('📍 Iframe position changed, likely scrolling to field');
        window.docusealNavigating = true;
        setTimeout(() => {
          window.docusealNavigating = false;
        }, 1500);
      }
      
      lastIframeRect = currentRect;
    };
    
    // Check position periodically when DocuSeal is active
    const positionInterval = setInterval(checkPosition, 200);
    
    // Stop checking after 5 minutes to prevent memory leaks
    setTimeout(() => clearInterval(positionInterval), 300000);
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    // Reset body overflow
    document.body.style.overflow = '';
  }
}

// Auto-initialize when module loads
const docusealFix = new DocuSealNavigationFix();
export default docusealFix;