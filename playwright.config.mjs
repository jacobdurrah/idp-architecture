import { defineConfig, devices } from '@playwright/test';

// Browser tests run against the static site served locally. In CI the webServer
// below is started automatically; locally it reuses one you already have running.
const PORT = 5050;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: `npx serve -l ${PORT} .`,
    url: `http://localhost:${PORT}/golden.html`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
