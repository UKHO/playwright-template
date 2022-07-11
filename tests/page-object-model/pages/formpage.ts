import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basepage";

export class FormPage extends BasePage {
    readonly expect: FormPageAssertions
    readonly _firstnameFieldLocator:Locator;    
    readonly _lastnameFieldLocator: Locator;
    readonly _emailFieldLocator: Locator;
    readonly _heroPowerFieldLocator: Locator;
    readonly _submitButtonFieldLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.expect = new FormPageAssertions(this);

        this._firstnameFieldLocator = this.page.locator('#firstName');
        this._lastnameFieldLocator = this.page.locator('#lastName');
        this._emailFieldLocator = this.page.locator('#email');
        this._heroPowerFieldLocator = this.page.locator('#power');
        this._submitButtonFieldLocator = this.page.locator('"Submit"');
    }

    override async navigateTo(): Promise<void> {
        await super.navigateTo('/form');
    }

    async submitForm(): Promise<void> {
        await this._submitButtonFieldLocator.click();        
    }

    async fillFormWithValidDetails(): Promise<void> {
        await this._firstnameFieldLocator.fill("MyFirstName");
        await this._lastnameFieldLocator.fill("MyLastName");
        await this._emailFieldLocator.fill("myemail@email.com");
        await this._heroPowerFieldLocator.selectOption("Super Flexible");
    }
    
    async fillFormWithValidDetailsExceptHeroPower(): Promise<void> {
        await this._firstnameFieldLocator.fill("MyFirstName");
        await this._lastnameFieldLocator.fill("MyLastName");
        await this._emailFieldLocator.fill("myemail@email.com");
    }
    
    async setFirstName(data: string): Promise<void> {
        await this._firstnameFieldLocator.fill(data);
    }

    async setLastName(data: string): Promise<void> {
        await this._lastnameFieldLocator.fill(data);
    }

    async setEmail(data: string): Promise<void> {
        await this._emailFieldLocator.fill(data);
    }

}

class FormPageAssertions {
    constructor(readonly formPage: FormPage) {
    }

    async toHaveDisabledSubmitButton(): Promise<void>{
        await expect(this.formPage._submitButtonFieldLocator).not.toBeEnabled();
    }
}