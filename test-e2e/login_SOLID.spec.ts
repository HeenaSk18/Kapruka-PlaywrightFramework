import { test, expect } from '@playwright/test';
import { LoginPage_SOLID } from '../pages/LoginPage_SOLID';

// Credentials come from environment variables only (no hardcoded fallbacks).
// Local machine: config/.env.qa | CI/CD: secret manager (masked).
const TEST_EMAIL = process.env.TEST_EMAIL;
const TEST_PASSWORD = process.env.TEST_PASSWORD;

if (!TEST_EMAIL || !TEST_PASSWORD) {
    throw new Error(
        'Missing TEST_EMAIL or TEST_PASSWORD environment variable. ' +
        'Set these in your .env file or CI/CD secrets before running tests.'
    );
}

test.describe('Kapruka Login Test', () => {
    test('Valid user should login successfully', async ({ page }) => {
        const loginPage = new LoginPage_SOLID(page);

        await loginPage.goto();
        await loginPage.isLoaded();

        // Script pauses here and opens the Inspector.
        // Click "Resume" (green play button) to continue.
        // Remove this line before committing / running in CI.
        await page.pause();

        await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
        await page.pause();
        await loginPage.verifyLoginSuccess();
        await page.pause();
    });
});