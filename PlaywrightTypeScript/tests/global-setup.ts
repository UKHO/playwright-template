// global-setup.ts
import { chromium, FullConfig } from '@playwright/test';
import { LoginPage } from './page-object-model/pages/loginpage';

//This function is run once at the beginning of the test run
async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch();
    //######### TODO: Replace this with config ###############
    const page = await browser.newPage({ baseURL: 'http://localhost:4200' });

    // This saves a clean slate which we can use in tests that require us not to be logged in
    await page.context().storageState({ path: 'cleanStorageState.json' });

    // Use an API to authenticate if possible - see https://playwright.dev/docs/test-auth#sign-in-via-api-request
    // If using the UI to authenticate then be sure to use your page object model
    let loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.fillFormWithValidDetails();
    await loginPage.submitForm();

    // This saves a logged in state which is configured in playwright.config.json to be used by default
    await page.context().storageState({ path: 'loggedInStorageState.json' });
    await browser.close();
}

export default globalSetup;