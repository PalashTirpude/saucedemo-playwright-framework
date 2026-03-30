// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment file dynamically
const env = process.env.TEST_ENV || 'qa';
dotenv.config({ path: `./configs/${env}.env` });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',

  timeout: 30000,

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html'],
    ['allure-playwright'],
  ],

  // globalSetup: require.resolve('allure-playwright/global-setup'),

  use: {

    baseURL: process.env.BASE_URL,
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
  },


  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});

