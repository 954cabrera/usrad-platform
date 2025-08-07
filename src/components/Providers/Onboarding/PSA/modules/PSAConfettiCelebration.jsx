// src/components/Providers/Onboarding/PSA/modules/PSAConfettiCelebration.jsx
import { useEffect } from "react";

export default function PSAConfettiCelebration({ trigger }) {
  useEffect(() => {
    if (!trigger) return;

    const canvas = document.createElement("canvas");
    canvas.id = "confetti-canvas";
    canvas.style.cssText = `
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      z-index: 999999 !important;
      pointer-events: none !important;
    `;

    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];
    const confettiCount = window.innerWidth < 768 ? 100 : 200; // Fewer particles on mobile

    const colors = [
      "#003087", // USRad Navy
      "#059669", // Success Green
      "#3b82f6", // Blue
      "#f59e0b", // Gold
      "#ef4444", // Red
      "#8b5cf6", // Purple
      "#06b6d4", // Cyan
      "#10b981", // Emerald
    ];

    // Create confetti particles
    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        vx: (Math.random() - 0.5) * 10,
        vy: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 6,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
        shape: Math.random() > 0.5 ? "square" : "circle",
        gravity: 0.15 + Math.random() * 0.1,
      });
    }

    // Animation
    function animateConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = confetti.length - 1; i >= 0; i--) {
        const particle = confetti[i];

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += particle.gravity;
        particle.rotation += particle.rotationSpeed;
        particle.vx *= 0.99;

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);
        ctx.fillStyle = particle.color;

        if (particle.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(
            -particle.size / 2,
            -particle.size / 2,
            particle.size,
            particle.size
          );
        }

        ctx.restore();

        if (particle.y > canvas.height + 100) {
          confetti.splice(i, 1);
        }
      }

      if (confetti.length > 0) {
        requestAnimationFrame(animateConfetti);
      } else {
        document.body.removeChild(canvas);
      }
    }

    animateConfetti();

    // Cleanup
    const cleanupTimeout = setTimeout(() => {
      if (document.body.contains(canvas)) {
        canvas.style.transition = "opacity 1s ease-out";
        canvas.style.opacity = "0";
        setTimeout(() => {
          if (document.body.contains(canvas)) {
            document.body.removeChild(canvas);
          }
        }, 1000);
      }
    }, 6000);

    return () => {
      clearTimeout(cleanupTimeout);
      if (document.body.contains(canvas)) {
        document.body.removeChild(canvas);
      }
    };
  }, [trigger]);

  return null;
}
