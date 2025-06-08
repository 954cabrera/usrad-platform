// astro.config.mjs
// Compatible configuration for older Astro versions

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel'; // ✅ Fixed import

export default defineConfig({
  integrations: [tailwind(), react()],
  
  // ✅ Use 'server' mode to enable API routes
  output: 'server',
  
  // ✅ Fixed adapter import
  adapter: vercel(),
});