import { Locator, Page, expect } from "@playwright/test";

export class CheckoutPage {

    readonly page: Page;
    readonly title: Locator;
    readonly fieldName: Locator;
    readonly fieldDescription: Locator;
    readonly fieldPrice: Locator;



    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('[data-test="title"]');
        this.fieldName = page.locator('//*[@data-test="inventory-item-name"]');
        this.fieldDescription = page.locator('//*[@data-test="inventory-item-desc"]');
        this.fieldPrice = page.locator('//*[@data-test="inventory-item-price"]');

    }



    async goToShopping() {
        
    }
    async goToCheckout() {
        
    }


    async verifyControlsOnCheckoutPage(): Promise<void> {


    }
}