import { expect } from '@playwright/test';
import { test } from '../testData/fixtureBase';
import { InventoryPage } from '../page-objects/pages/InventoryPage';


test.describe('Tests with fixtures', () => {

    let invPage: InventoryPage;

    test.beforeEach(async ({ inventoryPage }, testInfo) => {
        testInfo.annotations.push({ type: 'projectName', description: testInfo.project.name });
        invPage = new InventoryPage(inventoryPage);
    });

    test('Add goods to cart and verify counter', async ({ inventoryPage }) => {
        await invPage.open();
        await invPage.addToCart('backpack');
        await invPage.addToCart('bike light');
        await expect(invPage.iconCartCounter).toHaveText('2');
    });
    test('Check the number of goods on the page', async ({ inventoryPage }) => {
        const goodsCount = await invPage.getAllGoodsOnPage();
        expect(goodsCount).toBe(6);
    });

})