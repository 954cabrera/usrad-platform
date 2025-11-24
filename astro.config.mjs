import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
  integrations: [tailwind(), react()],

  // Enable SSR for API routes and dynamic features
  output: 'server',

  // Use Vercel adapter for deployment
  adapter: vercel(),

  // Disable View Transitions to prevent DOM state preservation on navigation
  experimental: {
    viewTransitions: false
  },

  // Local development server configuration
  server: {
    port: 3000,
    host: true,
    proxy: {
      // Proxy Remix search routes during local development
      '/pbs': 'http://localhost:5173'
    }
  }
});
