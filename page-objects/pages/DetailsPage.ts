import { Locator, Page, expect } from "@playwright/test";

export class DetailsPage {

    readonly page: Page;
    readonly image: Locator;
    readonly fieldName: Locator;
    readonly fieldDescription: Locator;
    readonly fieldPrice: Locator;
    readonly btnBackToProducts: Locator;
    readonly btnAddToCart: Locator;
    readonly btnRemove: Locator;
    readonly linkToCart: Locator;
    readonly iconCartCounter: Locator;

    constructor(page: Page) {
        this.page = page;
        this.image = page.locator('//*[@data-test="item-sauce-labs-backpack-img"]');
        this.fieldName = page.locator('//*[@data-test="inventory-item-name"]');
        this.fieldDescription = page.locator('//*[@data-test="inventory-item-desc"]');
        this.fieldPrice = page.locator('//*[@data-test="inventory-item-price"]');
        this.btnBackToProducts = page.locator('//*[@data-test="back-to-products"]');
        this.btnAddToCart = page.locator('//*[@data-test="add-to-cart"]');
        this.btnRemove = page.locator('//*[@data-test="remove"]');
        this.linkToCart = page.locator('//*[@data-test="shopping-cart-link"]');
        this.iconCartCounter = page.locator('//*[@data-test="shopping-cart-badge"]');
    }

    async addBackpackToCart() {
        await this.btnAddToCart.click();
    }
    async removeBackpackFromCart() {
        await this.btnRemove.click();
    }
    async goBackToProducts() {
        await this.btnBackToProducts.click();
    }
    async openCart(){
        this.linkToCart.click();
    }
    async verifyPriceFormat() {
        const price = await this.fieldPrice.textContent();
        expect(price).toMatch(/^\$\d{1,6}\.\d{2}$/);
    }
    async verifyControlsOnDetailsCard(): Promise<void> {
        await expect(this.image).toBeVisible();
        await expect(this.fieldName).toBeVisible();
        await expect(this.fieldDescription).toBeVisible();
        await expect(this.fieldPrice).toBeVisible();
        await expect(this.btnAddToCart).toBeVisible();
    }
}