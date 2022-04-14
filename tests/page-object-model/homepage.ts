import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
    readonly expect: HomePageAssertions;

    readonly _headerLocator: Locator;
    readonly _aboutButtonLocator: Locator;

    constructor(readonly page: Page) {
        this.expect = new HomePageAssertions(this);

        this._headerLocator = this.page.locator('h1');
        this._aboutButtonLocator = this.page.locator('"Go to About page"');
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