import { test } from '@playwright/test';
import { checkA11y, injectAxe, Options } from 'axe-playwright';
import { FormPage } from '../page-object-model/pages/formpage';
import { HomePage } from '../page-object-model/pages/homepage';

test.describe('A11y tests', () => {
  const defaultCheckA11yOptions: Options = {
    axeOptions: {
      runOnly: {
        type: 'tag',
        values: ['wcag2aa'],
      },
      reporter: 'v2'
    },
    detailedReport: true,
    detailedReportOptions: { html: true }
  };

  test('home page should be accessible', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigateTo();
    await injectAxe(page);

    await checkA11y(page, undefined, defaultCheckA11yOptions);
  });

  test.describe('form page should be accessible', () => {
    let formPage: FormPage;

    test.beforeEach(async ({ page }) =>{
      formPage = new FormPage(page);

      await formPage.navigateTo();
      await injectAxe(page);
    });

    test('when empty', async ({ page }) => {
      await checkA11y(page, undefined, defaultCheckA11yOptions);
    });

    test('when invalid', async ({ page }) => {
      await formPage.fillFormWithValidDetailsExceptHeroPower();
      await formPage.setFirstName('');
      await formPage.setLastName('Sm');
      await formPage.setEmail('not an email');

      await checkA11y(page, undefined, defaultCheckA11yOptions);
    });

    test('when valid', async ({ page }) => {
      await formPage.fillFormWithValidDetails();

      await checkA11y(page, undefined, defaultCheckA11yOptions);
    });
  });
});
