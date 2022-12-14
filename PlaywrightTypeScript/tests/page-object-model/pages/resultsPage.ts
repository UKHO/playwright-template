import { Page, expect } from "@playwright/test";
import { TableComponent } from "../shared-components/tablecomponent";
import { BasePage } from "./basepage";

export class ResultsPage extends BasePage {
    readonly expect: ResultsPageAssertions;
    readonly table: TableComponent;

    constructor(page: Page) {
        super(page);

        this.expect = new ResultsPageAssertions(this);
        this.table = new TableComponent(page);
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