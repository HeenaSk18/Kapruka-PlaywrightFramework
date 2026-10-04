import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ScrollPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async scrollToElement(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible' });
        await locator.scrollIntoViewIfNeeded();
    }

    async scrollDown(pixelCount: number): Promise<void> {
        await this.page.evaluate((pixels) => window.scrollBy(0, pixels), pixelCount);
    }
}