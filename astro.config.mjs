import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';  // ← Use this instead
// import node from '@astrojs/node';              // ← Comment out
import 'dotenv/config';

export default defineConfig({
  integrations: [tailwind(), react()],
  output: 'server',
  adapter: vercel(),  // ← Change from node() to vercel()
});