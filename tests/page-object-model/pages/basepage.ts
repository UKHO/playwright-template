import { Locator, Page } from "@playwright/test";
import { PageUtilities } from "../pageutilities";

export abstract class BasePage {

    private readonly _popupCloseLocator: Locator;
    protected readonly pageUtilities: PageUtilities;

    constructor(readonly page: Page) {
        this._popupCloseLocator = this.page.locator('"Click here to hide popup"');

        this.pageUtilities = new PageUtilities(page);
    }

    protected async navigateTo(path?: string): Promise<void> {
        if (path)
            await this.page.goto(path);
        else
            await this.page.goto('/');

        await this.handleRandomPopup();
    }

    private async handleRandomPopup() {
        const popupOpen = await this.pageUtilities.waitForVisibleWithoutThrowing(this._popupCloseLocator);
        
        if (popupOpen)
            await this._popupCloseLocator.click();
    }
}
