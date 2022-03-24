import { Page, Locator } from "@playwright/test";

export class FormPage {
    readonly page: Page;

    readonly headerLocator: Locator;
    readonly emailFieldLocator: Locator;

    constructor(page: Page) {
        this.page = page;

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

    async fillForm(arg0: { email: string; }) : Promise<void> {
        throw new Error('Method not implemented.');
    }
}
