import { Page, expect } from "@playwright/test";

export class TableComponent {
    readonly expect: TableComponentAssertions;

    constructor(readonly page: Page) {
        this.expect = new TableComponentAssertions(this);
    }
}

class TableComponentAssertions {
    constructor(readonly tableComponent: TableComponent) {
    }


}