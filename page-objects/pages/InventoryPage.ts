import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage {

    readonly page: Page;
    readonly title: Locator;


    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('//*[@data-test="title"]');

    }
   
    async verifyLoginIsSuccess(userName: string) {
        await (userName === 'locked_out_user' ? expect(this.title).not.toBeVisible() : expect(this.title).toBeVisible());
    }
    
}