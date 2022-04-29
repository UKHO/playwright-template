import { test } from '@playwright/test';
import { HomePage } from '../page-object-model/homepage';
import { LoginPage } from '../page-object-model/loginpage';

test.describe('Login page', () => {
    let loginPage: LoginPage;
    let homepage: HomePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homepage = new HomePage(page);

        await loginPage.navigateTo();
    });

    test.only("can log in", async () => {
        await loginPage.fillFormWithValidDetails();
        await loginPage.submitForm();

        await homepage.expect.toBeLoggedIn();
    });
});