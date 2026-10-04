import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CurrencyPage extends BasePage {
    readonly currencySelect: Locator;

    constructor(page: Page) {
        super(page);
        this.currencySelect = page.getByLabel('Select Currency');
    }

    async switchCurrency(currency: string): Promise<void> {
        await this.selectOption(this.currencySelect, currency);
    }
}