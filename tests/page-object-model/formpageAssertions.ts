import { expect } from "@playwright/test";
import { FormPage } from "./formpage";

export class FormPageAssertions extends FormPage{
    async shouldBeOnFormPage(): Promise<void> {
        await expect(this.page).toHaveURL(".+/form\.html")
    }

    async shouldHaveEmailValidationError(): Promise<void>{
        expect(this.headerLocator).toHaveProperty("validity.valid", false);
    }

    async shouldNotHaveEmailValidationError(): Promise<void>{
        expect(this.headerLocator).toHaveProperty("validity.valid", true);
    }
}