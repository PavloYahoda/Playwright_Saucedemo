import { Locator, Page, expect } from "@playwright/test";

export class CartPage {

    readonly page: Page;
    readonly title: Locator;



    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('[data-test="title"]');


    }

    async verifyControlsOnDetailsCard(): Promise<void> {
        
    }

}