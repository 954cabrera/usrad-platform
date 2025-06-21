// dashboard-mobile-menu.js - Mobile Menu Management
export class DashboardMobileMenu {
    constructor() {
      this.isOpen = false;
      this.overlay = null;
      this.sidebar = null;
      this.menuToggle = null;
    }
  
    initialize() {
      this.overlay = document.getElementById('mobile-overlay');
      this.sidebar = document.getElementById('sidebar');
      this.menuToggle = document.getElementById('menu-toggle');
  
      if (this.menuToggle) {
        this.menuToggle.addEventListener('click', () => this.toggleMenu());
      }
  
      if (this.overlay) {
        this.overlay.addEventListener('click', () => this.closeMenu());
      }
  
      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.closeMenu();
        }
      });
  
      // Close menu on window resize to desktop size
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && this.isOpen) {
          this.closeMenu();
        }
      });
    }
  
    toggleMenu() {
      if (this.isOpen) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    }
  
    openMenu() {
      this.isOpen = true;
      
      if (this.overlay) {
        this.overlay.classList.remove('hidden');
        this.overlay.classList.add('opacity-50');
      }
      
      if (this.sidebar) {
        this.sidebar.classList.remove('-translate-x-full');
        this.sidebar.classList.add('translate-x-0');
      }
  
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }
  
    closeMenu() {
      this.isOpen = false;
      
      if (this.overlay) {
        this.overlay.classList.add('hidden');
        this.overlay.classList.remove('opacity-50');
      }
      
      if (this.sidebar) {
        this.sidebar.classList.add('-translate-x-full');
        this.sidebar.classList.remove('translate-x-0');
      }
  
      // Restore body scroll
      document.body.style.overflow = '';
    }
  
    // Auto-close menu when navigation occurs
    handleNavigation() {
      if (this.isOpen) {
        this.closeMenu();
      }
    }
  }