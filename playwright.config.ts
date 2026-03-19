import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'https://id-preview--3e23062f-4918-4dad-90a0-3a981c04b767.lovable.app',
  },
  timeout: 60000,
});
