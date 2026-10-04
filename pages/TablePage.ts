import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TablePage extends BasePage {
    readonly table: Locator;

    constructor(page: Page) {
        super(page);
        this.table = page.locator('table');
    }

    async getRowCount(): Promise<number> {
        return await this.table.locator('tbody tr').count();
    }

    async getCellText(rowIndex: number, columnIndex: number): Promise<string | null> {
        const row = this.table.locator('tbody tr').nth(rowIndex);
        return await row.locator('td').nth(columnIndex).textContent();
    }

    async clickCellAction(rowIndex: number, actionText: string): Promise<void> {
        const row = this.table.locator('tbody tr').nth(rowIndex);
        await this.click(row.getByRole('button', { name: actionText }));
    }
}