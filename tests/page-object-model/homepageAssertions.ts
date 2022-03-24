import { expect } from "@playwright/test";
import { HomePage } from "./homepage";

export class HomePageAssertions extends HomePage{

    async shouldHaveHeader(expected: string): Promise<void>{
        await expect(this.headerLocator).toHaveText(expected);
    }
}