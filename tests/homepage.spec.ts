import { test, expect } from '@playwright/test';
import { HomePage } from './page-object-model/homepage';

test.describe('Home page tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);

    await homePage.navigateTo();
  });

  test('should be on home page', async () => {
    await homePage.expect.toHaveHeader('Welcome to Home Page');
  });


});
