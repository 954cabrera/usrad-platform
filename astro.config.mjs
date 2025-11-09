import 'dotenv/config';  // ✅ ensures Astro loads .env before anything else
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';


// Log once at startup to confirm env file is being read
console.log("✅ Loaded Google API key prefix:", process.env.GOOGLE_MAPS_API_KEY?.slice(0, 10) || "(none)");

export default defineConfig({
  integrations: [tailwind(), react()],

  // Enable SSR for API routes and dynamic features
  output: 'server',

  // Use Vercel adapter for deployment
  adapter: vercel(),

  // Local development server configuration
  server: {
    port: 3000,
    host: true,
    proxy: {
      // Proxy Remix search routes during local development
      '/pbs': 'http://localhost:5173',
    },
  },

  // ✅ Ensure environment variables are available at runtime
  vite: {
    define: {
      'import.meta.env.GOOGLE_MAPS_API_KEY': JSON.stringify(process.env.GOOGLE_MAPS_API_KEY),
      'import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY': JSON.stringify(process.env.PUBLIC_GOOGLE_MAPS_API_KEY),
    },
  },
});
