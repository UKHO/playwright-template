import { Page, expect } from "@playwright/test";
import { BasePage } from "./basepage";

export class ResultsPage extends BasePage {
    readonly expect: ResultsPageAssertions;

    constructor(page: Page) {
        super(page);

        this.expect = new ResultsPageAssertions(this);
    }
}

class ResultsPageAssertions {
    constructor(readonly resultsPage: ResultsPage) { }

    async toBeOnResultsPage() {
        await expect(this.resultsPage.page).toHaveURL("/form-results")
    }

    async toHaveValuesFromFormPage() {
        throw new Error('Method not implemented.');
    }

}