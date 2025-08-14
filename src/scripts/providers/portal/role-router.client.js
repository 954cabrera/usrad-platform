// runs in the browser only
(function () {
  // hard-guard anyway
  if (typeof window === 'undefined') return;

  const ROUTES = {
    single: '/providers/onboarding/market-calculator',
    multi:  '/providers/onboarding/pricing-multi',
    exec:   '/providers/onboarding/pricing-multi'
  };

  const proceedLink = document.getElementById('proceed-to-pricing');
  if (!proceedLink) return;

  function applyHref(role) {
    const r = role || 'single';
    proceedLink.setAttribute('href', ROUTES[r] || ROUTES.single);
  }

  // bootstrap from saved role (if any)
  const saved = window.localStorage.getItem('usrad_role') || 'single';
  applyHref(saved);

  // react to changes from RoleSection
  document.addEventListener('roleSelected', (e) => {
    const role = (e && e.detail && e.detail.role) || 'single';
    try { window.localStorage.setItem('usrad_role', role); } catch {}
    applyHref(role);
  });

  // optional: ensure Enter key submit still routes correctly
  const form = document.getElementById('organization-form');
  if (form) {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const role = window.localStorage.getItem('usrad_role') || 'single';
      window.location.href = ROUTES[role] || ROUTES.single;
    });
  }
})();
