// SignupBranding Web Component
class SignupBranding extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          position: relative;
          z-index: 1;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(20px);
          border-right: 1px solid rgba(0, 0, 0, 0.05);
        }

        .back-nav {
          position: absolute;
          top: 2rem;
          left: 2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #64748b;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
          padding: 0.5rem 1rem;
          border-radius: 8px;
        }

        .back-nav:hover {
          color: #667eea;
          background: rgba(102, 126, 234, 0.1);
        }

        .brand-content {
          max-width: 500px;
          text-align: center;
          animation: fadeInUp 0.8s ease-out;
        }

        .network-logo {
          width: 280px;
          height: auto;
          margin-bottom: 3rem;
          filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.1));
          transition: transform 0.3s ease;
        }

        .network-logo:hover {
          transform: scale(1.05);
        }

        /* Premium Revenue Display */
        .revenue-banner {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 24px;
          padding: 2rem;
          margin-bottom: 2rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.25);
          transform: translateY(0);
          transition: all 0.3s ease;
          cursor: help;
        }

        .revenue-banner:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 50px rgba(102, 126, 234, 0.3);
        }

        .revenue-banner::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
          animation: shimmer 3s infinite;
        }

        .revenue-tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: #1e293b;
          color: white;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 0.875rem;
          line-height: 1.5;
          width: 280px;
          margin-bottom: 8px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          z-index: 10;
        }

        .revenue-tooltip::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 8px solid transparent;
          border-top-color: #1e293b;
        }

        .revenue-banner:hover .revenue-tooltip {
          opacity: 1;
          visibility: visible;
        }

        .revenue-amount {
          font-size: 3.5rem;
          font-weight: 800;
          color: white;
          margin-bottom: 0.5rem;
          letter-spacing: -0.03em;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          position: relative;
          z-index: 1;
        }

        .revenue-description {
          color: rgba(255, 255, 255, 0.95);
          font-size: 1.1rem;
          font-weight: 500;
          position: relative;
          z-index: 1;
        }

        .revenue-context {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
          margin-top: 0.5rem;
          font-weight: 500;
          position: relative;
          z-index: 1;
        }

        .brand-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .brand-tagline {
          font-size: 1.25rem;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 3rem;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @media (max-width: 768px) {
          :host {
            padding: 2rem 1.5rem;
            min-height: auto;
            border-right: none;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          }

          .network-logo {
            width: 200px;
            margin-bottom: 2rem;
          }

          .revenue-amount {
            font-size: 2.25rem;
          }

          .brand-title {
            font-size: 1.75rem;
          }

          .brand-tagline {
            font-size: 1rem;
            margin-bottom: 2rem;
          }
        }
      </style>

      <a href="/providers" class="back-nav">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"></path>
        </svg>
        Back to provider info
      </a>

      <div class="brand-content">
        <img src="/logo/USRad-Logo-final.png" alt="USRad Network" class="network-logo" />

        <div class="revenue-banner">
          <div class="revenue-tooltip">
            Our founding team previously built AnciCare, delivering $180M+ in
            imaging revenue over 10 years. Now we're applying the same proven
            model direct to patients.
          </div>
          <div class="revenue-amount">$180+ Million</div>
          <div class="revenue-description">
            Delivered to imaging centers through AnciCare
          </div>
          <div class="revenue-context">
            Same proven team, new direct-to-patient model
          </div>
        </div>

        <h1 class="brand-title">Join the USRad Network</h1>
        <p class="brand-tagline">
          Be part of the healthcare revolution from the team that transformed
          imaging economics
        </p>
      </div>
    `;
  }
}

customElements.define('signup-branding', SignupBranding);