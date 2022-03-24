import { test, expect } from '@playwright/test';
import { FormPage } from './page-object-model/formpage';
import { FormPageAssertions } from './page-object-model/formpageAssertions';
import { ResultsPageAssertions } from './page-object-model/resultsPageAssertions';

test.describe('Form page tests', () => {
    let formPage: FormPage;
    let formPageAssertions: FormPageAssertions;
    let resultsPageAssertions: ResultsPageAssertions;

  test.beforeEach(async ({ page }) => {
    formPage = new FormPage(page);
    formPageAssertions = new FormPageAssertions(page);
    resultsPageAssertions = new ResultsPageAssertions(page);

    await formPage.navigateTo();
  });

  test('email should contain @', async () => {
      await formPage.setEmail("abcdefgh");
      await formPageAssertions.shouldHaveEmailValidationError();

      await formPage.submitForm();
      await formPageAssertions.shouldBeOnFormPage();

      await formPage.setEmail("abcdefgh@me.com");
      await formPageAssertions.shouldNotHaveEmailValidationError();
      await formPage.submitForm();
      await resultsPageAssertions.shouldBeOnResultsPage();
  });


});
