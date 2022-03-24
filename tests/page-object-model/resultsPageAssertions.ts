import { expect } from "@playwright/test";
import { ResultsPage } from "./resultsPage";

export class ResultsPageAssertions extends ResultsPage{
    async toBeOnResultsPage() {
        throw new Error('Method not implemented.');
    }
}