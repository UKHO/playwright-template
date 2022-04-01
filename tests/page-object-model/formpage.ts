import { Page, Locator } from "@playwright/test";
import { Data } from "./data";
import { FormPageAssertions } from "./formpageAssertions";

export class FormPage {
    readonly page: Page;
    readonly expect: FormPageAssertions;

    readonly headerLocator: Locator;
    readonly emailFieldLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.expect = new FormPageAssertions(page);

        this.headerLocator = this.page.locator('h1');
        this.emailFieldLocator = this.page.locator('#Email');
    }

    async navigateTo() : Promise<void>{
        await this.page.goto('file:///C:/Dev/playwright-template/src/form.html');
    }

    async setEmail(email: string) : Promise<void> {
        await this.emailFieldLocator.fill(email);
    }

    async submitForm() : Promise<void> {
        throw new Error('Method not implemented.');
    }

    async fillForm(data: Data) : Promise<void> {
        await this.emailFieldLocator.fill(data.Email);
    }
}
