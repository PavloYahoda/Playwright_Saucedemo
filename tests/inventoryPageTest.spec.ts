import { test, expect} from '@playwright/test';
import { HomePage } from '../page-objects/pages/HomePage';
import { InventoryPage } from '../page-objects/pages/InventoryPage';
import { TEST_USER } from '../testData/UserData';


test.describe('Inventory page testing', () => {

    let homePage: HomePage;
    let inventoryPage: InventoryPage;


    test.beforeEach(async ({ page }, testInfo) => {
        testInfo.annotations.push({ type: 'projectName', description: testInfo.project.name });
        await page.goto('/');
        homePage = new HomePage(page);
        inventoryPage = new InventoryPage(page);
        await homePage.loginWithCreds(TEST_USER.username, TEST_USER.password);
    });

    test.describe('Inventory page testing', () => {
        test(`First`, async ({ page }) => {

        });



    });
});