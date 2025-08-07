// PSA Mobile Enhancements - Add this script to improve mobile experience
// This can be added as a separate script without modifying existing code

document.addEventListener('DOMContentLoaded', function() {
  // Detect mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isSmallScreen = window.innerWidth <= 768;

  if (isMobile || isSmallScreen) {
    // Add mobile class to body for additional styling hooks
    document.body.classList.add('psa-mobile');

    // Improve floating guide visibility on mobile
    const improveFloatingGuide = () => {
      const guide = document.getElementById('floating-progress-guide');
      if (guide) {
        // Make guide collapsible on mobile
        const header = guide.querySelector('div[style*="font-weight: bold"]');
        if (header && !header.dataset.enhanced) {
          header.dataset.enhanced = 'true';
          header.style.cursor = 'pointer';
          header.innerHTML += ' <span style="float: right; font-size: 10px;">▼</span>';
          
          let isCollapsed = false;
          const steps = guide.querySelectorAll('[id^="floating-step"]');
          
          header.addEventListener('click', () => {
            isCollapsed = !isCollapsed;
            steps.forEach(step => {
              step.style.display = isCollapsed ? 'none' : 'block';
            });
            header.querySelector('span').textContent = isCollapsed ? '▶' : '▼';
          });
        }
      }
    };

    // Check periodically for the floating guide
    const guideInterval = setInterval(() => {
      if (document.getElementById('floating-progress-guide')) {
        improveFloatingGuide();
        clearInterval(guideInterval);
      }
    }, 1000);

    // Improve button visibility on mobile
    const improveButtonVisibility = () => {
      const buttons = ['signed-check-button', 'ready-to-continue-button'];
      buttons.forEach(id => {
        const button = document.getElementById(id);
        if (button && !button.dataset.enhanced) {
          button.dataset.enhanced = 'true';
          
          // Add subtle shadow for better visibility
          button.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.1)';
          
          // Ensure button is always visible on scroll
          let hideTimeout;
          window.addEventListener('scroll', () => {
            button.style.transform = 'translateY(0)';
            clearTimeout(hideTimeout);
            hideTimeout = setTimeout(() => {
              if (window.scrollY > 100) {
                button.style.transform = 'translateY(0)';
              }
            }, 100);
          });
        }
      });
    };

    // Monitor for button creation
    const buttonObserver = new MutationObserver(() => {
      improveButtonVisibility();
    });

    buttonObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Improve DocuSeal iframe handling on mobile
    const improveDocuSealEmbed = () => {
      const embedContainer = document.querySelector('.docuseal-embed');
      if (embedContainer) {
        // Add pinch-to-zoom support
        embedContainer.style.touchAction = 'pan-x pan-y pinch-zoom';
        
        // Monitor iframe creation
        const iframeObserver = new MutationObserver(() => {
          const iframe = embedContainer.querySelector('iframe');
          if (iframe && !iframe.dataset.enhanced) {
            iframe.dataset.enhanced = 'true';
            
            // Ensure iframe is responsive
            iframe.style.width = '100%';
            iframe.style.maxWidth = '100%';
            iframe.style.minHeight = '600px';
            
            // Add loading indicator for slow connections
            if (!embedContainer.querySelector('.loading-indicator')) {
              const loadingDiv = document.createElement('div');
              loadingDiv.className = 'loading-indicator';
              loadingDiv.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 1;
                display: none;
              `;
              loadingDiv.innerHTML = '<div class="spinner"></div><p>Loading document...</p>';
              embedContainer.appendChild(loadingDiv);
              
              // Show loading indicator if iframe takes time
              setTimeout(() => {
                if (!iframe.contentWindow || iframe.contentWindow.length === 0) {
                  loadingDiv.style.display = 'block';
                }
              }, 2000);
              
              iframe.addEventListener('load', () => {
                loadingDiv.style.display = 'none';
              });
            }
          }
        });

        iframeObserver.observe(embedContainer, {
          childList: true,
          subtree: true
        });
      }
    };

    // Start monitoring for DocuSeal embed
    const embedInterval = setInterval(() => {
      if (document.querySelector('.docuseal-embed')) {
        improveDocuSealEmbed();
        clearInterval(embedInterval);
      }
    }, 1000);

    // Handle orientation changes
    let previousOrientation = window.orientation;
    window.addEventListener('orientationchange', () => {
      if (window.orientation !== previousOrientation) {
        previousOrientation = window.orientation;
        
        // Adjust floating guide position after orientation change
        setTimeout(() => {
          const guide = document.getElementById('floating-progress-guide');
          if (guide) {
            guide.style.transition = 'all 0.3s ease';
            setTimeout(() => {
              guide.style.transition = '';
            }, 300);
          }
        }, 100);
      }
    });

    // Improve scroll behavior on mobile
    let touchStartY = 0;
    document.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
      const touchY = e.touches[0].clientY;
      const scrollingUp = touchY > touchStartY;
      
      // Hide/show floating elements based on scroll direction
      const floatingElements = [
        document.getElementById('floating-progress-guide'),
        document.getElementById('signed-check-button'),
        document.getElementById('ready-to-continue-button')
      ].filter(Boolean);
      
      floatingElements.forEach(el => {
        if (scrollingUp) {
          el.style.opacity = '1';
          el.style.pointerEvents = 'auto';
        } else if (window.scrollY > 200) {
          el.style.opacity = '0.3';
          el.style.pointerEvents = 'none';
        }
      });
    }, { passive: true });

    document.addEventListener('touchend', () => {
      // Restore full visibility when scrolling stops
      setTimeout(() => {
        const floatingElements = [
          document.getElementById('floating-progress-guide'),
          document.getElementById('signed-check-button'),
          document.getElementById('ready-to-continue-button')
        ].filter(Boolean);
        
        floatingElements.forEach(el => {
          el.style.opacity = '1';
          el.style.pointerEvents = 'auto';
        });
      }, 300);
    }, { passive: true });
  }

  // Viewport height fix for mobile browsers
  const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  setViewportHeight();
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', setViewportHeight);
});