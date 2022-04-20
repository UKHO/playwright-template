import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
    readonly expect: HomePageAssertions;

    readonly _headerLocator: Locator;

    constructor(readonly page: Page) {
        this.expect = new HomePageAssertions(this);

        this._headerLocator = this.page.locator('h2');
    }

    async navigateTo(): Promise<void> {
        await this.page.goto('/');
    }
}

class HomePageAssertions {
    constructor(readonly homePage: HomePage) {
    }
    
    async toHaveHeader(expected: string): Promise<void> {
        await expect(this.homePage._headerLocator).toHaveText(expected);
    }
}