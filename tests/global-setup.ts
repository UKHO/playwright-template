// global-setup.ts
import { chromium, FullConfig } from '@playwright/test';
import { LoginPage } from './page-object-model/loginpage';

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // This saves a clean slate which we can use in tests that require us not to be logged in
    await page.context().storageState({ path: 'cleanStorageState.json' });

//######### Replace this with config ###############
    await page.goto('http://localhost:4200/login');

    let loginPage = new LoginPage(page);
    await loginPage.fillFormWithValidDetails();
    await loginPage.submitForm();

    // This saves a logged in state which is configured in playwright.config.json to be used by default
    await page.context().storageState({ path: 'loggedInStorageState.json' });
    await browser.close();
}

export default globalSetup;