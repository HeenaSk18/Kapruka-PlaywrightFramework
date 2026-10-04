import { Locator, Page } from '@playwright/test';

export abstract class BasePage_SOLID {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async click(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible' });
        await locator.click();
    }

    async navigate(url: string): Promise<void> {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }

    async fill(locator: Locator, value: string): Promise<void> {
        await locator.waitFor({ state: 'visible' });
        await locator.fill(value);
    }

    async type(locator: Locator, value: string): Promise<void> {
        await locator.waitFor({ state: 'visible' });
        await locator.type(value);
    }

    async scrollTo(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible' });
        await locator.scrollIntoViewIfNeeded();
    }

    async selectOption(locator: Locator, value: string): Promise<void> {
        await locator.waitFor({ state: 'visible' });
        await locator.selectOption({ label: value });
    }

    abstract isLoaded(): Promise<void>;
}