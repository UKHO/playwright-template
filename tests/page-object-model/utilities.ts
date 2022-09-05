import { Locator, Page } from "@playwright/test";

export class Utilities {
    constructor(readonly page: Page) {
    }
    
    /**
     * Uses a retry pattern to wait for the locator to be visible.
     * 
     * Only use if there is uncertainty about an element appearing, 
     * if an element is there in some environments but not others 
     * then use environment variables to determine whether or not to look for it
     * @param {Locator} locator
     */
    async waitForVisibleWithoutThrowing(locator: Locator): Promise<boolean> {
        const timeout = 5000 // We need to use a relatively short timeout to ensure we don't hold up tests
        const maxtime = Date.now() + timeout;
        const step = 500;
      
        while (Date.now() < maxtime) {
          if (await locator.isVisible()) {
            return true;
          }
          else {
            await this.page.waitForTimeout(step);
          }
        }  

        return false;
    }
}