import { test as base, chromium } from '@playwright/test';

export const test = base.extend({
    inventoryPage: async ({ }, use) => {

        const browser = await chromium.launch();
        const context = await browser.newContext({storageState: './testData/states/standard_user.json'});
        const page = await context.newPage();

        await page.goto('https://www.saucedemo.com/inventory.html');
        await use(page);
        await context.close();
        await browser.close();
    },
});
