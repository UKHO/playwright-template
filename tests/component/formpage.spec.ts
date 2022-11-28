import { test } from '@playwright/test';
import { FormPage } from '../page-object-model/pages/formpage';
import { ResultsPage } from '../page-object-model/pages/resultsPage';

//This test.describe.configure allows the tests within this file to be parallelised
//Due to the websockets tests we can't have full parallelisation by default.
test.describe.configure({ mode: 'parallel' });

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
            await formPage.expect.toBeUnableToSubmitForm();
        });

        test('short last name', async () => {
            await formPage.fillFormWithValidDetails();
            await formPage.setLastName("Sm");
            await formPage.expect.toBeUnableToSubmitForm();
        });
        
        test('invalid email', async () => {
            await formPage.fillFormWithValidDetails();
            await formPage.setEmail("not an email");
            await formPage.expect.toBeUnableToSubmitForm();
        });
        
        test('missing hero power', async () => {
            await formPage.fillFormWithValidDetailsExceptHeroPower();
            await formPage.expect.toBeUnableToSubmitForm();
        });
    });

    test('valid details should allow form submit and display details on results page', async () => {
        await formPage.fillFormWithValidDetails();
        await formPage.submitForm();
        
        await resultsPage.expect.toBeOnResultsPage();
        await resultsPage.table.expect.toOnlyHaveValues(formPage.submittedValues);
    });
});
