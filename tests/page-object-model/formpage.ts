import { Page, Locator, expect } from "@playwright/test";
import { Data } from "./data";

export class FormPage {
    readonly expect: FormPageAssertions
    readonly _headerLocator: Locator;
    readonly _emailFieldLocator: Locator;

    constructor(readonly page: Page) {
        this.expect = new FormPageAssertions(this);

        this._headerLocator = this.page.locator('h1');
        this._emailFieldLocator = this.page.locator('#Email');
    }

    async navigateTo(): Promise<void> {
        await this.page.goto('/form');
    }

    async setEmail(email: string): Promise<void> {
        await this._emailFieldLocator.fill(email);
    }

    async submitForm(): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async fillForm(data: Data): Promise<void> {
        await this._emailFieldLocator.fill(data.Email);
    }
}

class FormPageAssertions {
    constructor(readonly formPage: FormPage) {
    }

    async toBeOnFormPage(): Promise<void> {
        await expect(this.formPage.page).toHaveURL(".+/form\.html")
    }

    async toHaveEmailValidationError(): Promise<void> {
        await this.formPage.page.pause();
        await expect(this.formPage._emailFieldLocator).toHaveJSProperty("validity.valid", false);
    }

    async notToHaveEmailValidationError(): Promise<void> {
        await expect(this.formPage._emailFieldLocator).toHaveJSProperty("validity.valid", true);
    }
}