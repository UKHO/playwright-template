import { expect } from "@playwright/test";
import { FormPage } from "./formpage";

export class FormPageAssertions extends FormPage{
    async toBeOnFormPage(): Promise<void> {
        await expect(this.page).toHaveURL(".+/form\.html")
    }

    async toHaveEmailValidationError(): Promise<void>{
        await this.page.pause();
        await expect(this.emailFieldLocator).toHaveJSProperty("validity.valid", false);
    }

    async notToHaveEmailValidationError(): Promise<void>{
        await expect(this.emailFieldLocator).toHaveJSProperty("validity.valid", true);
    }
}