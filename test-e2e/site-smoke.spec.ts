import { expect, test } from '@playwright/test';
import { ComboGiftsPage } from '../pages/ComboGiftsPage';
import { CurrencyPage } from '../pages/CurrencyPage';
import { HomePage } from '../pages/HomePage';
import { PersonalizeCakePage } from '../pages/PersonalizeCakePage';

test.describe('Kapruka site smoke tests', () => {
    test('homepage loads with product search', async ({ page }) => {
        const homePage = new HomePage(page);

        await homePage.open();

        await expect(page).toHaveTitle(/Kapruka\.com/i);
        await expect(homePage.searchInput).toBeVisible();
        await expect(homePage.searchButton).toBeVisible();
    });

    test('currency can be switched to USD', async ({ page }) => {
        const homePage = new HomePage(page);
        const currencyPage = new CurrencyPage(page);

        await homePage.open();
        await currencyPage.switchCurrency('USD');

        await expect(currencyPage.currencySelect).toHaveValue('USD');
    });

    test('combo gifts category displays its products section', async ({ page }) => {
        const comboGiftsPage = new ComboGiftsPage(page);

        await comboGiftsPage.open();

        await expect(page).toHaveTitle(/Combo Gift Packs/i);
        await expect(page.getByRole('heading', { name: 'Top Combo Gifts Products on Kapruka' })).toBeVisible();
    });

    test('customized cake form accepts a cake message', async ({ page }) => {
        const personalizeCakePage = new PersonalizeCakePage(page);

        await personalizeCakePage.open();
        await expect(personalizeCakePage.pageTitle).toBeVisible();
        await personalizeCakePage.addPersonalizedMessage('Happy Birthday');

        await expect(personalizeCakePage.messageInput).toHaveValue('Happy Birthday');
    });
});
