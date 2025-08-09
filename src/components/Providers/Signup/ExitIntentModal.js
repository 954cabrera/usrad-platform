// ExitIntentModal Web Component
class ExitIntentModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        @import '/src/styles/providers/exit-intent-modal.css';
      </style>

      <div class="exit-modal" id="exit-modal">
        <div class="exit-content">
          <button class="exit-close" id="exit-close">×</button>

          <h3 class="exit-title">
            Wait! You're one step away from guaranteed revenue
          </h3>

          <div class="exit-revenue">
            <div class="exit-revenue-amount">$180+ Million</div>
            <div class="exit-revenue-text">
              Already delivered to imaging centers like yours
            </div>
          </div>

          <div class="exit-benefits">
            <div class="exit-benefit">
              <span class="icon">✓</span>
              <span>Get paid in 10 days, not 90</span>
            </div>
            <div class="exit-benefit">
              <span class="icon">✓</span>
              <span>No insurance hassles or denials</span>
            </div>
            <div class="exit-benefit">
              <span class="icon">✓</span>
              <span>Start receiving patients this week</span>
            </div>
          </div>

          <div class="exit-actions">
            <button class="exit-button primary" id="complete-signup">
              Complete Signup (60 seconds)
            </button>
            <button class="exit-button secondary" id="learn-more">
              Learn More About USRad
            </button>
          </div>
        </div>
      </div>
    `;

    this.initializeModal();
  }

  initializeModal() {
    const modal = this.shadowRoot.getElementById('exit-modal');
    const closeBtn = this.shadowRoot.getElementById('exit-close');
    const completeBtn = this.shadowRoot.getElementById('complete-signup');
    const learnBtn = this.shadowRoot.getElementById('learn-more');

    closeBtn.addEventListener('click', () => this.close());
    completeBtn.addEventListener('click', () => this.close());
    learnBtn.addEventListener('click', () => {
      window.location.href = '/providers';
    });

    // Listen for show/hide events
    this.addEventListener('show', () => this.show());
    this.addEventListener('hide', () => this.close());
  }

  show() {
    const modal = this.shadowRoot.getElementById('exit-modal');
    modal.classList.add('show');
  }

  close() {
    const modal = this.shadowRoot.getElementById('exit-modal');
    modal.classList.remove('show');
    
    // Dispatch close event
    this.dispatchEvent(new CustomEvent('modalClosed', { bubbles: true }));
  }
}

customElements.define('exit-intent-modal', ExitIntentModal);