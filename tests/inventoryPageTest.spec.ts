import { test, expect} from '@playwright/test';
import { HomePage } from '../page-objects/pages/HomePage';
import { InventoryPage } from '../page-objects/pages/InventoryPage';
import { DetailsPage } from '../page-objects/pages/DetailsPage';
import { TEST_USER } from '../testData/UserData';
import { SORTED_LIST} from '../testData/ListOfGoods';


test.describe('Inventory page testing with standard user', () => {

    let homePage: HomePage;
    let inventoryPage: InventoryPage;
    let detailsPage: DetailsPage;

    test.beforeEach(async ({ page }, testInfo) => {
        testInfo.annotations.push({ type: 'projectName', description: testInfo.project.name });
        await page.goto('/');
        homePage = new HomePage(page);
        inventoryPage = new InventoryPage(page);
        detailsPage = new DetailsPage(page);
        await homePage.loginWithCreds(TEST_USER.username, TEST_USER.password);
    });

    test.describe('Inventory page testing', () => {
        test('Check the number of goods on the page', async ({ page }) => {
            const goodsCount = await inventoryPage.getAllGoodsOnPage();
            expect(goodsCount).toBe(6);
        });
        test('Add backpack to card', async ({ page }) => {
            await inventoryPage.addToCart('backpack');
            await expect(inventoryPage.btnRemoveBackpack).toBeVisible();
            await expect(inventoryPage.iconCartCounter).toHaveText('1');
        });
        test('Remove backpack from card', async ({ page }) => {
            await inventoryPage.addToCart('backpack');
            await inventoryPage.removeFromCart('backpack');
            await expect(inventoryPage.btnAddToCartBackpack).toBeVisible();
            await expect(inventoryPage.iconCartCounter).not.toBeVisible();
        });
        test('Add two goods and remove one of them', async ({ page }) => {
            await inventoryPage.addToCart('backpack');
            await inventoryPage.addToCart('bike light');
            await expect(inventoryPage.iconCartCounter).toHaveText('2');
            await inventoryPage.removeFromCart('backpack');
            await expect(inventoryPage.iconCartCounter).toHaveText('1');
        });
        test('Check asc sorting by name', async ({ page }) => {
            await inventoryPage.selectSortOption('az');
            const goodNames = await inventoryPage.getAllGoodsName();
            expect(goodNames).toEqual(SORTED_LIST.ascSortedByName);
        });
        test('Check desc sorting by name', async ({ page }) => {
            await inventoryPage.selectSortOption('za');
            const goodNames = await inventoryPage.getAllGoodsName();
            expect(goodNames).toEqual(SORTED_LIST.descSortedByName);
        });
        test('Check asc sorting by price', async ({ page }) => {
            await inventoryPage.selectSortOption('lohi');
            const goodNames = await inventoryPage.getAllGoodsName();
            expect(goodNames).toEqual(SORTED_LIST.ascSortedByPrice);
        });
        test('Check desc sorting by price', async ({ page }) => {
            await inventoryPage.selectSortOption('hilo');
            const goodNames = await inventoryPage.getAllGoodsName();
            expect(goodNames).toEqual(SORTED_LIST.descSortedByPrice);
        });
        test('Check controls on each card on page', async({ page }) => {
            await inventoryPage.verifyAllControlsOnGoodCard();
        });
        test('Open Details page by click on image', async({ page }) => {
            await inventoryPage.openDetailsByImage();
            await expect(detailsPage.btnBackToProducts).toBeVisible();
        });
        test('Open Details page by click on link', async({ page }) => {
            await inventoryPage.openDetailsByLink();
            await expect(detailsPage.btnBackToProducts).toBeVisible();
        });

    });
});