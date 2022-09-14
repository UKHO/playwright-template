import { Page } from "@playwright/test";
import { ResultsPage } from "./resultsPage";

export class ExampleResultsPage extends ResultsPage {

    constructor(page: Page) {
        super(page);
    }
    
    override async navigateTo(): Promise<void> {
        await super.navigateTo('/form-results/example');
    }
}