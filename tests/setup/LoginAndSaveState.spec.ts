import { test } from '@playwright/test';
import { HomePage } from '../../page-objects/pages/HomePage';
import { InventoryPage } from '../../page-objects/pages/InventoryPage';
import { TEST_USER } from '../../testData/UserData';


test.describe('Login and save state', () => {

    let homePage: HomePage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }, testInfo) => {
        testInfo.annotations.push({ type: 'projectName', description: testInfo.project.name });

        await page.goto('/');

        homePage = new HomePage(page);
        inventoryPage = new InventoryPage(page);
    });

    test(`Login as standard_user`, async ({ page }) => {
        await homePage.loginWithCreds(TEST_USER.username, TEST_USER.password);
        await inventoryPage.verifyLoginIsSuccess('standard_user');
        await page.context().storageState({path: './testData/states/standard_user.json'});
    });
});