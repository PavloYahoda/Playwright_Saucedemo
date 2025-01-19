import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/pages/HomePage';
import { InventoryPage } from '../page-objects/pages/InventoryPage';
import { DetailsPage } from '../page-objects/pages/DetailsPage';
import { CartPage } from '../page-objects/pages/CartPage';
import { CheckoutPage } from '../page-objects/pages/CheckoutPage';
import { OverviewPage } from '../page-objects/pages/OverviewPage';
import { CompletePage } from '../page-objects/pages/CompletePage';
import { TEST_USER } from '../testData/UserData';



test.describe('Overview page testing with standard user', () => {

    let homePage: HomePage;
    let inventoryPage: InventoryPage;
    let detailsPage: DetailsPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;
    let overviewPage: OverviewPage;
    let completePage: CompletePage;

    test.beforeEach(async ({ page }, testInfo) => {
        testInfo.annotations.push({ type: 'projectName', description: testInfo.project.name });
        await page.goto('/');
        homePage = new HomePage(page);
        inventoryPage = new InventoryPage(page);
        detailsPage = new DetailsPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        overviewPage = new OverviewPage(page);
        completePage = new CompletePage(page);

        await homePage.loginWithCreds(TEST_USER.username, TEST_USER.password);
        await inventoryPage.openCart();
        await cartPage.goToCheckout();
        await await checkoutPage.fillAllFields('John', 'Gaspar', '12345');
        await checkoutPage.submitForm();
    });
    test.describe('Overview page testing', () => {
        test('Check controls on the page', async ({ page }) => {
            await overviewPage.verifyAllControlsOnPage();
        });
        test('Go back to products', async ({ page }) => {
            await overviewPage.goToInventoryPage();
            await expect(inventoryPage.title).toHaveText('Products');
        });
        test('Go back to Complete page', async ({ page }) => {
            await overviewPage.goToCompletePage();
            await expect(completePage.title).toHaveText('Checkout: Complete!');
        });
    });
});