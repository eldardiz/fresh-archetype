import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.mjs',
  retries: 0,
  workers: 2,
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 60_000,
  },
  use: {
    baseURL: 'http://localhost:3000',
    actionTimeout: 8_000,
    navigationTimeout: 30_000,
  },
})
