import { test as setup } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { LoginPage_SOLID } from '../pages/LoginPage_SOLID';

dotenv.config({
    path: path.resolve(__dirname, `../config/.env.${process.env.TEST_ENV || 'qa'}`),
});

const authFile = 'test-e2e/auth.json';
const TEST_EMAIL = process.env.TEST_EMAIL;
const TEST_PASSWORD = process.env.TEST_PASSWORD;

if (!TEST_EMAIL || !TEST_PASSWORD) {
    throw new Error(
        'Missing TEST_EMAIL or TEST_PASSWORD environment variable. ' +
        'Set these in your .env file or CI/CD secrets before running tests.'
    );
}

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage_SOLID(page);

    await loginPage.goto();
    await loginPage.isLoaded();
    await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
    await loginPage.verifyLoginSuccess();

    await page.context().storageState({ path: authFile });
});