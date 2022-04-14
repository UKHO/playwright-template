import { Page, Locator, expect } from "@playwright/test";

export class ResultsPage {
    readonly page: Page;
    readonly expect: ResultsPageAssertions;

    constructor(page: Page) {
        this.page = page;
        this.expect = new ResultsPageAssertions(this);
    }
}

class ResultsPageAssertions {
    constructor(readonly resultsPage: ResultsPage) {}

    async toBeOnResultsPage() {
        await expect(this.resultsPage.page).toHaveURL("/form-results")
    }
    
    async toHaveValuesFromFormPage() {
        throw new Error('Method not implemented.');
    }
    
}