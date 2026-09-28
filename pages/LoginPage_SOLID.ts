import { Page, Locator, expect } from '@playwright/test';
import { BasePage_SOLID } from './BasePage_SOLID';

export class LoginPage_SOLID extends BasePage_SOLID {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput = page.locator('#exampleInputEmail1');
        this.passwordInput = page.locator('#exampleInputPassword1');
        this.loginButton = page.locator('input[name="Login"]');
    }

    async goto(): Promise<void> {
        await this.page.goto('/shops/customerAccounts/accountLogin.jsp');
    }

    async isLoaded(): Promise<void> {
        await expect(this.emailInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }

    async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async verifyLoginSuccess(): Promise<void> {
        // adjust this to a real post-login indicator once you confirm the redirect URL
        await this.page.waitForURL('**/customerAccounts/**', { timeout: 10000 });
    }
}