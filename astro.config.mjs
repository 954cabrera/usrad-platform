import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// Simplified configuration for static deployment
export default defineConfig({
  integrations: [tailwind(), react()],
  output: 'static'
});