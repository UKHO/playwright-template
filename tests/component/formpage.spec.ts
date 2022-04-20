import { test } from '@playwright/test';
import { FormPage } from '../page-object-model/formpage';
import { ResultsPage } from '../page-object-model/resultsPage';

test.describe('Form page', () => {
    let formPage: FormPage;
    let resultsPage: ResultsPage;

    test.beforeEach(async ({ page }) => {
        formPage = new FormPage(page);
        resultsPage = new ResultsPage(page);

        await formPage.navigateTo();
    });

    test.describe('invalid details should prevent form submit', async () => {
        test('blank', async () => {
            await formPage.expect.toHaveDisabledSubmitButton();
        });

        test('short last name', async () => {
            await formPage.fillFormWithValidDetails();
            await formPage.setLastName("Sm");
            await formPage.expect.toHaveDisabledSubmitButton();
        });
        
        test('invalid email', async () => {
            await formPage.fillFormWithValidDetails();
            await formPage.setEmail("not an email");
            await formPage.expect.toHaveDisabledSubmitButton();
        });
        
        test('missing hero power', async () => {
            await formPage.fillFormWithValidDetailsExceptHeroPower();
            await formPage.expect.toHaveDisabledSubmitButton();
        });
    });

    test('valid details should allow form submit and display details on results page', async () => {
        await formPage.fillFormWithValidDetails();
        await formPage.submitForm();
        
        await resultsPage.expect.toBeOnResultsPage();
        await resultsPage.expect.toHaveValuesFromFormPage();
    });
});
