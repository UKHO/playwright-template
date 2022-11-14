import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basepage";

export class WebsocketPage extends BasePage {
    readonly expect: WebsocketPageAssertions;

    readonly _lastMessageLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.expect = new WebsocketPageAssertions(this);

        this._lastMessageLocator = this.page.locator('id=last-message');
    }

    override async navigateTo(): Promise<void> {
        await super.navigateTo('/websocket-page');
    }
}

class WebsocketPageAssertions {
    constructor(readonly websocketPage: WebsocketPage) {
    }

    async toHaveLastMessage(expected: string): Promise<void> {
        await expect(this.websocketPage._lastMessageLocator).toHaveText(expected);
    }
}