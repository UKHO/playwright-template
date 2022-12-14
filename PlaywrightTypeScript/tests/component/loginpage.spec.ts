import { test } from '@playwright/test';
import { HomePage } from '../page-object-model/pages/homepage';
import { LoginPage } from '../page-object-model/pages/loginpage';

test.describe('Login page', () => {
    let loginPage: LoginPage;
    let homepage: HomePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homepage = new HomePage(page);

        await loginPage.navigateTo();
    });

    test.describe('given clean state', () => {
        test.use({ storageState: 'cleanStorageState.json' });

        test("should be able to log in", async () => {
            await loginPage.fillFormWithValidDetails();
            await loginPage.submitForm();

            // On login success will be redirected to home page 
            await homepage.expect.toBeLoggedIn();
        });
    });

    test.describe('given logged in state', () => {
        test.use({ storageState: 'loggedInStorageState.json' });

        test("should be redirected to home page", async () => {
            await homepage.expect.toBeOnHomePage();
            await homepage.expect.toBeLoggedIn();
        });
    });
});