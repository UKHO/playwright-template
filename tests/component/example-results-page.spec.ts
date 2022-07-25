import { test } from '@playwright/test';
import { ExampleResultsPage } from '../page-object-model/pages/exampleresultspage';

test.describe('Example results page', () => {
    let exampleResultsPage: ExampleResultsPage;

    test.beforeEach(async ({ page }) => {
        exampleResultsPage = new ExampleResultsPage(page);

        await exampleResultsPage.navigateTo();
    });

    test('should have example results', async () => {
        await exampleResultsPage.table.expect.toOnlyHaveValues(
            [
                {field: "First Name", answer: "Ada"},
                {field: "Last Name", answer: "Lovelace"},
                {field: "Email", answer: "ada@lovelace.com"},
                {field: "Pick one", answer: "JavaScript"},
                {field: "vehicle2", answer: "Car"},
                {field: "vehicle3", answer: "Boat"},
                {field: "Give a colour", answer: "#b469c3"},
                {field: "Give a date", answer: "1836-05-12"},
            ]);
    });
});
