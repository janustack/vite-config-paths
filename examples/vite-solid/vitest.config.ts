import { defineConfig } from 'vitest/config';
import solidPlugin from '../../packages/vite-solid-plug/index.js';

export default defineConfig({
  plugins: [solidPlugin()],
  resolve: {
    conditions: ['development', 'browser'],
  },
  test: {
    environment: 'node',
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium' }],
    },
  },
});
