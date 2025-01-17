import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/pages/HomePage';
import { InventoryPage } from '../page-objects/pages/InventoryPage';
import { DetailsPage } from '../page-objects/pages/DetailsPage';
import { CartPage } from '../page-objects/pages/CartPage';
import { TEST_USER } from '../testData/UserData';



test.describe('Details page testing with standard user', () => {

    let homePage: HomePage;
    let inventoryPage: InventoryPage;
    let detailsPage: DetailsPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }, testInfo) => {
        testInfo.annotations.push({ type: 'projectName', description: testInfo.project.name });
        await page.goto('/');
        homePage = new HomePage(page);
        inventoryPage = new InventoryPage(page);
        detailsPage = new DetailsPage(page);
        cartPage = new CartPage(page);
        await homePage.loginWithCreds(TEST_USER.username, TEST_USER.password);
        await inventoryPage.openDetailsByLink();
    });
    test.describe('Details page testing', () => {
        test('Check controls on the page', async ({ page }) => {
            await detailsPage.verifyControlsOnDetailsCard();
        });
        test('Add backpack to card', async ({ page }) => {
            await detailsPage.addBackpackToCart();
            await expect(detailsPage.btnRemove).toBeVisible();
            await expect(detailsPage.iconCartCounter).toHaveText('1');
        });
        test('Remove backpack from card', async ({ page }) => {
            await detailsPage.addBackpackToCart();
            await expect(detailsPage.btnRemove).toBeVisible();
            await expect(detailsPage.iconCartCounter).toHaveText('1');
            
            await detailsPage.removeBackpackFromCart();
            await expect(detailsPage.btnAddToCart).toBeVisible();
            await expect(detailsPage.iconCartCounter).not.toBeVisible();
        });
        test('Check price format', async ({ page }) => {
            await detailsPage.verifyPriceFormat();
        });
        test('Check "Back to products"', async ({ page }) => {
            await detailsPage.goBackToProducts();
            await expect(inventoryPage.title).toHaveText('Products');
        });
        test('Open Cart', async ({ page }) => {
            await detailsPage.openCart();
            await expect(cartPage.title).toHaveText('Your Cart');
        });
    });
});