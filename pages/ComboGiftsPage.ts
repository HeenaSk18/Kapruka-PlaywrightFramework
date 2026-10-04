import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ComboGiftsPage extends BasePage {
    readonly pageTitle: Locator;
    readonly productCards: Locator;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.locator('h1');
        this.productCards = page.locator('[class*="product"], article, .product-card');
    }

    async open(): Promise<void> {
        await this.goto('https://www.kapruka.com/online/combogifts');
    }

    async selectProductByName(productName: string): Promise<void> {
        const product = this.page.getByText(productName, { exact: false }).first();
        await this.click(product);
    }
}