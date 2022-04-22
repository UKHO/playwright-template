import { Locator, Page } from "@playwright/test";

export abstract class BasePage {

    readonly _popupCloseLocator: Locator;

    constructor(readonly page: Page) {
        this._popupCloseLocator = this.page.locator('"Click here to hide popup"');
    }

    protected async navigateTo(path?: string): Promise<void> {
        if (path)
            await this.page.goto(path);
        else
            await this.page.goto('/');

        await this.handleRandomPopup();
    }

    private async handleRandomPopup() {
        await this._popupCloseLocator.click();
    }
}
