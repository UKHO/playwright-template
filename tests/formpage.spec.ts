import { test } from '@playwright/test';
import { FormPage } from './page-object-model/formpage';
import { ResultsPage } from './page-object-model/resultsPage';

test.describe('Form page tests', () => {
    let formPage: FormPage;
    let resultsPage: ResultsPage;

    test.beforeEach(async ({ page }) => {
        formPage = new FormPage(page);
        resultsPage = new ResultsPage(page);

        await formPage.navigateTo();
    });

    test('invalid email should prevent form submit', async () => {
        await formPage.setEmail("abcdefgh");
        await formPage.expect.toHaveEmailValidationError();

        await formPage.submitForm();

        await formPage.expect.toBeOnFormPage();
    });

    test('valid email should allow form submit', async () => {
        await formPage.setEmail("abcdefgh@me.com");
        await formPage.expect.notToHaveEmailValidationError();

        await formPage.submitForm();

        await resultsPage.expect.toBeOnResultsPage();
    });

    test('can fill in a form :-)', async () => {
        await formPage.fillForm(
            {
                Firstname: "Sara",
                Lastname: "The Best",
                Email: "Sara@thebest.com"
            });

        await formPage.submitForm();

        await resultsPage.expect.toBeOnResultsPage();
    });


});
