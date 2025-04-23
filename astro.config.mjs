import { defineConfig } from 'astro/config';

// This import should be for @astrojs/tailwind
import tailwindcss from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwindcss()],
});
