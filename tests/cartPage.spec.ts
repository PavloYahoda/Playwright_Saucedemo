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
    });
    test.describe('Cart page testing', () => {
        test('Check controls on the page', async ({ page }) => {
            await inventoryPage.addToCart('backpack');
            await cartPage.verifyControlsOnDetailsCard();
        });
    });
});