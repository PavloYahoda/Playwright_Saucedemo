import { Locator, Page } from "@playwright/test";

export class DetailsPage {

    readonly page: Page;
    readonly fieldUserName: Locator;
    readonly fieldPassword: Locator;
    readonly btnBackToProducts: Locator;



    constructor(page: Page) {
        this.page = page;
        this.fieldUserName = page.locator('//*[@data-test="username"]');
        this.fieldPassword = page.locator('//*[@data-test="password"]');
        this.btnBackToProducts = page.locator('//*[@data-test="back-to-products"]');
    }
   

}