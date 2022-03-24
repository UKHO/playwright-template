import { Page, Locator } from "@playwright/test";
import { ResultsPageAssertions } from "./resultsPageAssertions";

export class ResultsPage {
    readonly page: Page;
    readonly expect: ResultsPageAssertions;

    readonly headerLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.expect = new ResultsPageAssertions(page);
        
        this.headerLocator = this.page.locator('h1');
    }
}