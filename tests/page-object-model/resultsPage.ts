import { Page, Locator } from "@playwright/test";

export class ResultsPage {
    readonly page: Page;

    readonly headerLocator: Locator;

    constructor(page: Page) {
        this.page = page;

        this.headerLocator = this.page.locator('h1');
    }
}