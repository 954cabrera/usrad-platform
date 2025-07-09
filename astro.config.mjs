import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
  integrations: [tailwind(), react()],
  
  // Server mode for API routes (perfect for Medicare pricing APIs)
  output: 'server',
  
  // Vercel adapter (great for deployment)
  adapter: vercel(),
  
  server: {
    port: 3000
  }
});