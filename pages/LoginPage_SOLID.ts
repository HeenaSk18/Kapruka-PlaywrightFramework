import { expect, Locator, Page } from '@playwright/test';
import { BasePage_SOLID } from './BasePage_SOLID';

export class LoginPage_SOLID extends BasePage_SOLID {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly forgotPasswordLink: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput = page.getByPlaceholder('Enter email');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot your password' });
    }

    async goto(): Promise<void> {
        await this.navigate('https://www.kapruka.com/shops/customerAccounts/accountLogin.jsp');
    }

    async isLoaded(): Promise<void> {
        await expect(this.emailInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }

    async login(email: string, password: string): Promise<void> {
        await this.fill(this.emailInput, email);
        await this.fill(this.passwordInput, password);
        await this.click(this.loginButton);
    }

    async verifyLoginSuccess(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveURL(/.*kapruka\.com.*/i);
    }
}