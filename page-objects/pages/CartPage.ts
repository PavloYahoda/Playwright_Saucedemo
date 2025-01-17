import { Locator, Page, expect } from "@playwright/test";

export class CartPage {

    readonly page: Page;
    readonly title: Locator;
    readonly fieldName: Locator;
    readonly fieldDescription: Locator;
    readonly fieldPrice: Locator;
    readonly btnRemove: Locator;
    readonly btnRemoveBackpack: Locator;
    readonly btnRemoveBikeLight: Locator;
    readonly btnContinueShopping: Locator;
    readonly btnCheckout: Locator;
    readonly linkToCart: Locator;
    readonly iconCartCounter: Locator;


    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('[data-test="title"]');
        this.fieldName = page.locator('//*[@data-test="inventory-item-name"]');
        this.fieldDescription = page.locator('//*[@data-test="inventory-item-desc"]');
        this.fieldPrice = page.locator('//*[@data-test="inventory-item-price"]');
        this.btnRemove = page.locator('[data-test^="remove-"]');
        this.btnRemoveBackpack = page.locator('//*[@data-test="remove-sauce-labs-backpack"]');
        this.btnRemoveBikeLight = page.locator('//*[@data-test="remove-sauce-labs-remove-sauce-labs-bike-light"]');
        this.btnContinueShopping = page.locator('//*[@data-test="continue-shopping"]');
        this.btnCheckout = page.locator('//*[@data-test="checkout"]');
        this.linkToCart = page.locator('//*[@data-test="shopping-cart-link"]');
        this.iconCartCounter = page.locator('//*[@data-test="shopping-cart-badge"]');
    }


    async getAllGoodsOnPage(): Promise<number> {
        return await this.page.locator('//*[@data-test = "inventory-item"]').count();
    }
    async goToShopping() {
        await this.btnContinueShopping.click();
    }
    async goToCheckout() {
        await this.btnCheckout.click();
    }
    async removeFromCart(good: string) {
        if (good === 'backpack') {
            await this.btnRemoveBackpack.click();
        }
        if (good === 'bike light') {
            await this.btnRemoveBikeLight.click();
        }
    }

    async verifyControlsOnCartPage(): Promise<void> {

        const cartItems = this.page.locator('[data-test="inventory-item"]');
        const count = await cartItems.count();

        for (let i = 0; i < count; i++) {
            const item = cartItems.nth(i);
            const goodIsCheck = await item.locator('[data-test="inventory-item-name"]').textContent();

            await expect(item.locator(this.fieldName)).toBeVisible();
            await expect(item.locator(this.fieldDescription)).toBeVisible();
            await expect(item.locator(this.fieldPrice)).toBeVisible();
            await expect(item.locator(this.btnRemove)).toBeVisible();

            console.log(`${goodIsCheck} - checked`);
        }
        await expect(this.btnContinueShopping).toBeVisible();
        await expect(this.btnCheckout).toBeVisible();
        await expect(this.linkToCart).toBeVisible();
    }
}