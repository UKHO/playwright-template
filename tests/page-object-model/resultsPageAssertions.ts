import { expect } from "@playwright/test";
import { ResultsPage } from "./resultsPage";

export class ResultsPageAssertions extends ResultsPage{
    async shouldBeOnResultsPage() {
        throw new Error('Method not implemented.');
    }

    async shouldHaveEmailValidationError(): Promise<void>{
        expect(this.headerLocator).toHaveProperty("validity.valid", false);
    }
}