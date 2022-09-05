import { Page, Locator } from "@playwright/test";

export class NavbarComponent {
    readonly welcomeLinkLocator: Locator;
    readonly formLinkLocator: Locator;
    readonly exampleResultsLinkLocator: Locator;

    constructor(readonly page: Page) {
        let navbarLocator = page.locator("app-nav");

        this.welcomeLinkLocator = navbarLocator.locator("'Welcome'");
        this.formLinkLocator = navbarLocator.locator("'The Form'");
        this.exampleResultsLinkLocator = navbarLocator.locator("'Example results'");
    }
    
    async gotoWelcome(): Promise<void> {
        await this.welcomeLinkLocator.click();
    }
    
    async gotoForm(): Promise<void> {
        await this.formLinkLocator.click();
    }
    
    async gotoExampleResults(): Promise<void> {
        await this.exampleResultsLinkLocator.click();
    }
}