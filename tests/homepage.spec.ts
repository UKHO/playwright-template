import { test, expect } from '@playwright/test';
import { HomePage } from './page-object-model/homepage';
import { HomePageAssertions } from './page-object-model/homepageAssertions';

test.describe('Home page tests', () => {
  let homePage: HomePage;
  let homePageAssertions: HomePageAssertions;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    homePageAssertions = new HomePageAssertions(page);

    await homePage.navigateTo();
  });

  test('should be on home page', async () => {
    await homePageAssertions.shouldHaveHeader('Welcome to Home Page');
  });


});
