import { Locator } from "@playwright/test";

export class Utilities {
    constructor() {
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
        let isVisible = await this.retryBooleanAction(() => locator.isVisible())        
        return isVisible;
    }

    async retryBooleanAction(action: () => Promise<boolean>, timeout: number = 5000): Promise<boolean> {
      const maxtime = Date.now() + timeout;
      const step = 500;
    
      while (Date.now() < maxtime) {
        if (await action()) {
          return true;
        }
        else {
          this.delay(step);
        }
      }

      return false;
    }

    private delay(ms: number)
    {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
}