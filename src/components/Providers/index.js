// components/Providers/index.js
// This file provides a single entry point for all Provider components

// Portal components
export { default as WelcomeHeader } from './Portal/WelcomeHeader.astro';
export { default as SetupProgress } from './Portal/SetupProgress.astro';
export { default as OrganizationForm } from './Portal/OrganizationForm.astro';

// Portal form sections
export { default as RoleSection } from './Portal/form-sections/RoleSection.astro';
export { default as OrganizationDetails } from './Portal/form-sections/OrganizationDetails.astro';
export { default as CorporateAddress } from './Portal/form-sections/CorporateAddress.astro';
export { default as AuthorizedSigner } from './Portal/form-sections/AuthorizedSigner.astro';

// Dashboard components (when you create them)
// export { default as ProviderStats } from './Dashboard/ProviderStats.astro';
// export { default as RecentActivity } from './Dashboard/RecentActivity.astro';
// export { default as QuickActions } from './Dashboard/QuickActions.astro';

// Onboarding components (when you create them)
// export { default as FacilitiesForm } from './Onboarding/FacilitiesForm.astro';
// export { default as PricingSetup } from './Onboarding/PricingSetup.astro';
// export { default as PSASigningSystem } from './Onboarding/PSASigningSystem.jsx';

// Shared components
// export { default as ProviderHeader } from './shared/ProviderHeader.astro';
// export { default as ProviderFooter } from './shared/ProviderFooter.astro';