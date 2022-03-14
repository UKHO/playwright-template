import { test, expect } from '@playwright/test';

test.describe('Home page tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('file:///C:/Dev/playwright-template/src/index.html');
  });

  test('should be on home page', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Welcome to Home Page');
  });
});
