import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PersonalizeCakePage extends BasePage {
    readonly pageTitle: Locator;
    readonly messageInput: Locator;
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.getByRole('heading', { name: 'Create your own personalized cakes' });
        this.messageInput = page.getByPlaceholder('Enter your message here');
        this.addToCartButton = page.getByRole('link', { name: 'Request a Quotation' });
    }

    async open(): Promise<void> {
        await this.goto('https://www.kapruka.com/shops/cakes/customCakes/personalise_cakes.jsp');
    }

    async addPersonalizedMessage(message: string): Promise<void> {
        await this.fill(this.messageInput, message);
    }

    async requestQuotation(): Promise<void> {
        await this.click(this.addToCartButton);
    }
}