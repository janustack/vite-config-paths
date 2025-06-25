import { resolve } from 'node:path';

import solid from '@plugwalk/vite-solid';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    solid(),
  ],
  resolve: {
    alias: {
      "@plugwallk/vite-solid": resolve(__dirname, "../../packages/vite-solid/index.ts"),
    },
  },
  server: {
    port: 9705,
  },
});