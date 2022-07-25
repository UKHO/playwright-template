import { Page, expect, Locator } from "@playwright/test";

export class TableComponent {
    readonly expect: TableComponentAssertions;
    readonly tableComponentLocator: Locator
    readonly rowsLocator: Locator

    constructor(readonly page: Page) {
        this.expect = new TableComponentAssertions(this);

        this.tableComponentLocator = page.locator("app-form-results");
        this.rowsLocator = this.tableComponentLocator.locator("tr");
    }

    cellLocator(row: number, column: number): Locator {
        return this.rowsLocator.nth(row).locator('td').nth(column);
    }
}

class TableComponentAssertions {
    constructor(readonly tableComponent: TableComponent) {
    }

    async toOnlyHaveValues(values: { field: string; answer: string; }[]): Promise<void> {
        await expect(this.tableComponent.rowsLocator, 'table row count should match expected values count').toHaveCount(values.length);

        const actualRowCount = await this.tableComponent.rowsLocator.count();

        for (const expectedRow of values) {
            let foundMatch = false;
            for (let i = 0; i < actualRowCount; i++) {
                const fieldCellLocator = this.tableComponent.cellLocator(i, 0);
                const answerCellLocator = this.tableComponent.cellLocator(i, 1);

                const actualFieldContent = await fieldCellLocator.textContent();
                if (actualFieldContent === expectedRow.field) {
                    await expect(answerCellLocator, 'expected answer for [' + expectedRow.field + '] to be [' + expectedRow.answer + ']').toHaveText(expectedRow.answer);
                    foundMatch = true;
                    break;
                }
            }

            expect(foundMatch, 'expected to find row [' + expectedRow.field + ', ' + expectedRow.answer + ']').toBeTruthy();
        }
    }
}