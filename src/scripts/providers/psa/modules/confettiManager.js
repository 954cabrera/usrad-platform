// src/scripts/providers/psa/modules/confettiManager.js
import { PSA_CONFIG } from '../psa.config.js';

export class ConfettiManager {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.confetti = [];
  }

  celebrate() {
    this.createCanvas();
    this.generateConfetti();
    this.animate();
    this.scheduleCleanup();
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'confetti-canvas';
    this.canvas.style.cssText = `
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      z-index: 999999 !important;
      pointer-events: none !important;
    `;

    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  generateConfetti() {
    this.confetti = [];
    
    for (let i = 0; i < PSA_CONFIG.CONFETTI.PARTICLE_COUNT; i++) {
      this.confetti.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height - this.canvas.height,
        vx: (Math.random() - 0.5) * 10,
        vy: Math.random() * 4 + 2,
        color: PSA_CONFIG.CONFETTI.COLORS[Math.floor(Math.random() * PSA_CONFIG.CONFETTI.COLORS.length)],
        size: Math.random() * 10 + 6,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
        shape: Math.random() > 0.5 ? 'square' : 'circle',
        gravity: 0.15 + Math.random() * 0.1
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.confetti.length - 1; i >= 0; i--) {
      const particle = this.confetti[i];

      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += particle.gravity;
      particle.rotation += particle.rotationSpeed;
      particle.vx *= 0.99;

      this.ctx.save();
      this.ctx.translate(particle.x, particle.y);
      this.ctx.rotate((particle.rotation * Math.PI) / 180);
      this.ctx.fillStyle = particle.color;

      if (particle.shape === 'circle') {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        this.ctx.fillRect(
          -particle.size / 2,
          -particle.size / 2,
          particle.size,
          particle.size
        );
      }

      this.ctx.restore();

      if (particle.y > this.canvas.height + 100) {
        this.confetti.splice(i, 1);
      }
    }

    if (this.confetti.length > 0) {
      requestAnimationFrame(() => this.animate());
    } else {
      this.cleanup();
    }
  }

  scheduleCleanup() {
    setTimeout(() => {
      if (this.canvas && document.body.contains(this.canvas)) {
        this.canvas.style.transition = 'opacity 1s ease-out';
        this.canvas.style.opacity = '0';
        setTimeout(() => this.cleanup(), 1000);
      }
    }, PSA_CONFIG.CONFETTI.DURATION);
  }

  cleanup() {
    if (this.canvas && document.body.contains(this.canvas)) {
      document.body.removeChild(this.canvas);
      this.canvas = null;
      this.ctx = null;
      this.confetti = [];
    }
  }
}