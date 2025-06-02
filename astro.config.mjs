import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import node from '@astrojs/node';
import 'dotenv/config';

export default defineConfig({
  integrations: [tailwind(), react()],
  output: 'server',  // Changed from 'static'
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    host: true,       
    port: 4321        
  }
});