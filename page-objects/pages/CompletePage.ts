import { Locator, Page, expect } from "@playwright/test";

export class CompletePage {

    readonly page: Page;
    readonly title: Locator;
    readonly image: Locator;
    readonly fieldHeader: Locator;
    readonly fieldCompleteText: Locator;
    readonly btnBackHome: Locator;


    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('[data-test="title"]');
        this.image = page.locator('//*[@data-test="pony-express"]');
        this.fieldHeader = page.locator('//*[@data-test="complete-header"]');
        this.fieldCompleteText = page.locator('//*[@data-test="complete-text"]');
        this.btnBackHome = page.locator('//*[@data-test="back-to-products"]');
    }

    async goToInventoryPage() {
        await this.btnBackHome.click();
    }
    async verifyAllControlsOnPage() {
        await expect(this.image).toBeVisible();
        await expect(this.fieldHeader).toHaveText('Thank you for your order!');
        await expect(this.fieldCompleteText).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        await expect(this.btnBackHome).toBeVisible();
    }
}