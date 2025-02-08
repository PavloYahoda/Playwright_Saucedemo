import { test, expect} from '@playwright/test';
import { HomePage } from '../page-objects/pages/HomePage';
import { InventoryPage } from '../page-objects/pages/InventoryPage';
import { TESTDATA } from '../testData/SetOfUsers';


test.describe('Login: all type of users', () => {

    let homePage: HomePage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }, testInfo) => {
        testInfo.annotations.push({ type: 'projectName', description: testInfo.project.name });
        await page.goto('https://www.saucedemo.com/');
        homePage = new HomePage(page);
        inventoryPage = new InventoryPage(page);
    });

    for (const data of TESTDATA) {
        test(`Login as ${data.username}`, async ({ page }) => {
            await homePage.loginWithCreds(data.username, data.password);
            await inventoryPage.verifyLoginIsSuccess(data.username);
        });
    }
});
