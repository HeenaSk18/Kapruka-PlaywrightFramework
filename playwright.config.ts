import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

const env = process.env.TEST_ENV || 'qa';

dotenv.config({
    path: path.resolve(__dirname, `config/.env.${env}`),
});

export default defineConfig({
  testDir: './test-e2e',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 4 : undefined,

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright', { resultsDir: 'allure-results' }],
  ],

  use: {
    baseURL: process.env.BASE_URL,

    // Take screenshot only when test fails
    screenshot: 'only-on-failure',

    trace: 'on',

    // Use installed system Chrome instead of Playwright's bundled Chromium
    channel: 'chrome',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: 'chromium', // for tests that need to already be logged in
      dependencies: ['setup'],
      testIgnore: /auth\.setup\.ts|login_SOLID\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'test-e2e/auth.json',
      },
    },
    {
      name: 'chromium-no-auth', // for tests that test the login flow itself
      testMatch: /login_SOLID\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});