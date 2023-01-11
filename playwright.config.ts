import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },

  /* Sets all tests to run in parallel - note this makes beforeall and afterall hooks execute per test.
   * Note that there is usually a better way of doing things than beforeall and afterall (such as 
   * using global-setup) so this shouldn't be an issue.
   * Also note that parallelisation can be disabled in a specific test fixture
   * See https://playwright.dev/docs/test-parallel */
  fullyParallel: true,
  
  /* Configures the location of global setup which contains code executed before the playwright tests start */
  globalSetup: require.resolve('./tests/global-setup'),

  /***** The CI variable must be set in the pipeline for these to behave correctly on build *****/
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env['CI'],
  /* Retry on CI only - this will allow us to record a trace*/
  retries: process.env['CI'] ? 1 : 0,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env['CI'] ? [['junit', { outputFile: 'uiTestResults.xml' }]] : [['html']],


  /* Test options used by default for all tests. These can be overridden in a specific test
   * See https://playwright.dev/docs/api/class-testoptions for more info. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    screenshot: 'only-on-failure',

    /* This storage state (snapshot of cookies etc in browser) is configured in global-setup.ts
       It can be overridden in a test (see ./tests/component/loginpage.spec.ts) */
    storageState: 'loggedInStorageState.json',

    /* Collect trace when retrying the failed test (enabled on CI above). See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run start',
    port: 4200,
    reuseExistingServer: true
  },
};

export default config;
