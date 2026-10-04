import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly loginLink: Locator;
    readonly currencySelect: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        super(page);

        this.searchInput = page.getByPlaceholder('SEARCH PRODUCTS..');
        this.searchButton = page.getByRole('button', { name: /online search/i });
        this.loginLink = page.getByRole('link', { name: /login to your account/i });
        this.currencySelect = page.getByLabel('Select Currency');
        this.cartLink = page.getByRole('link', { name: /cart|checkout/i }).first();
    }

    async open(): Promise<void> {
        await this.goto('https://www.kapruka.com/');
    }

    async search(term: string): Promise<void> {
        await this.fill(this.searchInput, term);
        await this.click(this.searchButton);
    }

    async openLogin(): Promise<void> {
        await this.click(this.loginLink);
    }
}