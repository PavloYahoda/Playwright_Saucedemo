import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/pages/HomePage';
import { InventoryPage } from '../page-objects/pages/InventoryPage';
import { DetailsPage } from '../page-objects/pages/DetailsPage';
import { CartPage } from '../page-objects/pages/CartPage';
import { CheckoutPage } from '../page-objects/pages/CheckoutPage';
import { OverviewPage } from '../page-objects/pages/OverviewPage';
import { TEST_USER } from '../testData/UserData';



test.describe('Details page testing with standard user', () => {

    let homePage: HomePage;
    let inventoryPage: InventoryPage;
    let detailsPage: DetailsPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;
    let overviewPage: OverviewPage;

    test.beforeEach(async ({ page }, testInfo) => {
        testInfo.annotations.push({ type: 'projectName', description: testInfo.project.name });
        await page.goto('/');
        homePage = new HomePage(page);
        inventoryPage = new InventoryPage(page);
        detailsPage = new DetailsPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        overviewPage = new OverviewPage(page);

        await homePage.loginWithCreds(TEST_USER.username, TEST_USER.password);
        await inventoryPage.openCart();
        await cartPage.goToCheckout();
    });
    test.describe('Checkout page testing', () => {
        test('Succsess scenario: submit form', async ({ page }) => {
            await checkoutPage.fillAllFields('John', 'Gaspar', '12345');
            await checkoutPage.submitForm();
            await expect(overviewPage.title).toHaveText('Checkout: Overview');
        });
        test('Succsess scenario: reject form', async ({ page }) => {
            await checkoutPage.rejectForm();
            await expect(overviewPage.title).toHaveText('Your Cart');
        });
        test('Fail scenario: empty First Name field', async ({ page }) => {
            await checkoutPage.fillAllFields('', 'Gaspar', '12345');
            await checkoutPage.submitForm();
            await expect(checkoutPage.errorMessage).toHaveText('Error: First Name is required');
        });
        test('Fail scenario: empty Last Name field', async ({ page }) => {
            await checkoutPage.fillAllFields('John', '', '12345');
            await checkoutPage.submitForm();
            await expect(checkoutPage.errorMessage).toHaveText('Error: Last Name is required');
        });
        test('Fail scenario: empty Zip code field', async ({ page }) => {
            await checkoutPage.fillAllFields('John', 'Gaspar', '');
            await checkoutPage.submitForm();
            await expect(checkoutPage.errorMessage).toHaveText('Error: Postal Code is required');
        });
    });
});