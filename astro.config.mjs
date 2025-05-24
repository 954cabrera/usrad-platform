import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [tailwind(), react()],
  output: 'static',
  server: {
    host: true,       // <-- allows access via LAN IP
    port: 4321        // <-- optional, but useful to fix the port
  }
});
