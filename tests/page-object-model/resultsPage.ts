import { Page, Locator } from "@playwright/test";

export class ResultsPage {
    readonly page: Page;
    readonly expect: ResultsPageAssertions;

    readonly _headerLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.expect = new ResultsPageAssertions(this);
        
        this._headerLocator = this.page.locator('h1');
    }
}

class ResultsPageAssertions {
    constructor(readonly resultsPage: ResultsPage) {
        
    }

    async toBeOnResultsPage() {
        throw new Error('Method not implemented.');
    }
}