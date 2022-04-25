import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basepage";

export class HomePage extends BasePage{
    readonly expect: HomePageAssertions;

    readonly _headerLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.expect = new HomePageAssertions(this);

        this._headerLocator = this.page.locator('h2');
    }

    override async navigateTo(): Promise<void> {
        await super.navigateTo('/');
    }
}

class HomePageAssertions {
    constructor(readonly homePage: HomePage) {
    }
    
    async toHaveHeader(expected: string): Promise<void> {
        await expect(this.homePage._headerLocator).toHaveText(expected);
    }
}