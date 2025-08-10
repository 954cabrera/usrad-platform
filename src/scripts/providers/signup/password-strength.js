// Password Strength Checker Module
// File: /src/scripts/providers/signup/password-strength.js

export class PasswordStrengthChecker {
  checkStrength(password) {
    const strengthBar = document.getElementById('password-strength-bar');
    if (!strengthBar) return;

    let strength = 0;

    // Length checks
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    
    // Character variety checks
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    // Update UI
    strengthBar.className = 'password-strength-bar';
    
    if (strength <= 2) {
      strengthBar.classList.add('weak');
    } else if (strength <= 3) {
      strengthBar.classList.add('medium');
    } else {
      strengthBar.classList.add('strong');
    }

    return strength;
  }

  getStrengthText(strength) {
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Medium';
    return 'Strong';
  }

  getStrengthColor(strength) {
    if (strength <= 2) return '#ef4444'; // red
    if (strength <= 3) return '#f59e0b'; // orange
    return '#10b981'; // green
  }
}