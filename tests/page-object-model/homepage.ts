import { Page, Locator } from "@playwright/test";

export class HomePage {
    readonly page: Page;

    readonly headerLocator: Locator;
    readonly aboutButtonLocator: Locator;

    constructor(page: Page) {
        this.page = page;

        this.headerLocator = this.page.locator('h1');
        this.aboutButtonLocator = this.page.locator('"Go to About page"');
    }

    async navigateTo() : Promise<void>{
        await this.page.goto('file:///C:/Dev/playwright-template/src/index.html');
    }    
}
