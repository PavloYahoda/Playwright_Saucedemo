import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/pages/HomePage';
import { InventoryPage } from '../page-objects/pages/InventoryPage';
import { DetailsPage } from '../page-objects/pages/DetailsPage';
import { CartPage } from '../page-objects/pages/CartPage';
import { CheckoutPage } from '../page-objects/pages/CheckoutPage';
import { OverviewPage } from '../page-objects/pages/OverviewPage';
import { CompletePage } from '../page-objects/pages/CompletePage';
import { TEST_USER } from '../testData/UserData';



test.describe('E2E test with standard user', () => {

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
    });

    test('E2E test', async ({ page }) => {
        
        await test.step('Add goods to cart and verify counter', async () => {
            await inventoryPage.addToCart('backpack');
            await inventoryPage.addToCart('bike light');
            await expect(inventoryPage.iconCartCounter).toHaveText('2');
        });
    
        await test.step('Open cart and verify goods count', async () => {
            await inventoryPage.openCart();
            const goodsCount = await cartPage.getAllGoodsOnPage();
            expect(goodsCount).toBe(2);
        });
    
        await test.step('Fill checkout form and submit', async () => {
            await cartPage.goToCheckout();
            await checkoutPage.fillAllFields('John', 'Gaspar', '12345');
            await checkoutPage.submitForm();
        });
    
        await test.step('Verify overview page controls and total cost', async () => {
            const totalPrice = await overviewPage.getTotalPrice();
            const tax = await overviewPage.getTaxValue();
            const total = totalPrice + tax;
    
            await overviewPage.verifyControlsOnPageWithGoodsOrdered();
            await overviewPage.verifyCostIsCorrect(totalPrice, tax, total);
        });
    
        await test.step('Verify all controls on the complete page', async () => {
            await overviewPage.goToCompletePage();
            await completePage.verifyAllControlsOnPage();
        });
    });
    
})