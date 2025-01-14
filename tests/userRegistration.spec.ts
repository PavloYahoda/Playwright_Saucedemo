import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../page-objects/pages/HomePage';
import { UserData } from '../testData/UserData';


test.describe('User registration', () => {
    
    let homePage: HomePage;
    const testUser = UserData.generateRandomUser();

    test.beforeEach(async ({ page }) => {
        
        await page.goto('https://www.saucedemo.com/');
        homePage = new HomePage(page);
        await homePage.openRegisterForm();
    });

    test.describe('Success scenario', () => {
        test('User registration with valid data', async ({ page }) => {

        });
    });
});
