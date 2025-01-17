import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/pages/HomePage';
import { InventoryPage } from '../page-objects/pages/InventoryPage';
import { DetailsPage } from '../page-objects/pages/DetailsPage';
import { CartPage } from '../page-objects/pages/CartPage';
import { CheckoutPage } from '../page-objects/pages/CheckoutPage';
import { TEST_USER } from '../testData/UserData';



test.describe('Details page testing with standard user', () => {

    let homePage: HomePage;
    let inventoryPage: InventoryPage;
    let detailsPage: DetailsPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }, testInfo) => {
        testInfo.annotations.push({ type: 'projectName', description: testInfo.project.name });
        await page.goto('/');
        homePage = new HomePage(page);
        inventoryPage = new InventoryPage(page);
        detailsPage = new DetailsPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        await homePage.loginWithCreds(TEST_USER.username, TEST_USER.password);
    });
    test.describe('Cart page testing', () => {
        test('Check controls on the page', async ({ page }) => {
            await inventoryPage.addToCart('backpack');
            await inventoryPage.addToCart('bike light');
            await inventoryPage.openCart();
            await cartPage.verifyControlsOnCartPage();
            await expect(cartPage.iconCartCounter).toHaveText('2');
        });
        test('Remove good from the Cart', async ({ page }) => {
            await inventoryPage.addToCart('backpack');
            await inventoryPage.addToCart('bike light');
            await inventoryPage.openCart();
            await expect(cartPage.iconCartCounter).toHaveText('2');
            const goodsCountBefore = await cartPage.getAllGoodsOnPage();
            expect(goodsCountBefore).toBe(2);

            await cartPage.removeFromCart('backpack');
            await expect(cartPage.iconCartCounter).toHaveText('1');
            const goodsCountAfter = await cartPage.getAllGoodsOnPage();
            expect(goodsCountAfter).toBe(1);
        });
        test('Check "Go to shopping"', async ({ page }) => {
            await inventoryPage.openCart();
            await cartPage.goToShopping();
            await expect(inventoryPage.title).toHaveText('Products');
        });
        test('Check "Chechout"', async ({ page }) => {
            await inventoryPage.openCart();
            await cartPage.goToCheckout();
            await expect(checkoutPage.title).toHaveText('Checkout: Your Information');
        });
    });
});