import { test } from '@playwright/test';
import { FormPage } from '../page-object-model/pages/formpage';
import { HomePage } from '../page-object-model/pages/homepage';
import { LoginPage } from '../page-object-model/pages/loginpage';
import { ResultsPage } from '../page-object-model/pages/resultsPage';

test.describe('End to End tests', () => {
    let formPage: FormPage;
    let homepage: HomePage;
    let loginPage: LoginPage;
    let resultsPage: ResultsPage;

    test.beforeEach(async ({ page }) => {
        homepage = new HomePage(page);
        formPage = new FormPage(page);
        loginPage = new LoginPage(page);
        resultsPage = new ResultsPage(page);
    });

    test.use({ storageState: 'cleanStorageState.json' });

    test('can login, fill form and see results', async () => {
        await loginPage.navigateTo();
        await loginPage.fillFormWithValidDetails();
        await loginPage.submitForm();

        await homepage.expect.toBeLoggedIn();
        await homepage.nav.gotoForm();

        await formPage.fillFormWithValidDetails();
        await formPage.submitForm();
        
        await resultsPage.expect.toBeOnResultsPage();
        await resultsPage.table.expect.toOnlyHaveValues(formPage.submittedValues);

        await resultsPage.nav.gotoWelcome();
        await homepage.expect.toBeOnHomePage();
    });
});
