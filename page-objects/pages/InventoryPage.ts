import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage {

    readonly page: Page;
    readonly title: Locator;
    readonly btnAddToCartBackpack: Locator;
    readonly btnAddToCartBikeLight: Locator;
    readonly btnRemoveBackpack: Locator;
    readonly btnRemoveBikeLight: Locator;
    readonly linkToCart: Locator;
    readonly iconCartCounter: Locator;
    readonly imageBackpack: Locator;
    readonly linkBackpack: Locator;


    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('//*[@data-test="title"]');
        this.btnAddToCartBackpack = page.locator('//*[@data-test="add-to-cart-sauce-labs-backpack"]');
        this.btnAddToCartBikeLight = page.locator('//*[@data-test="add-to-cart-sauce-labs-bike-light"]');
        this.btnRemoveBackpack = page.locator('//*[@data-test="remove-sauce-labs-backpack"]');
        this.btnRemoveBikeLight = page.locator('//*[@data-test="remove-sauce-labs-remove-sauce-labs-bike-light"]');
        this.linkToCart = page.locator('//*[@data-test="shopping-cart-link"]');
        this.iconCartCounter = page.locator('//*[@data-test="shopping-cart-badge"]');
        this.imageBackpack = page.locator('//*[@data-test="inventory-item-sauce-labs-backpack-img"]');
        this.linkBackpack = page.locator('//*[@data-test="item-4-title-link"]');
    }

    async open(){
        this.page.goto('https://www.saucedemo.com/inventory.html');
    }
    async getAllGoodsOnPage(): Promise<number> {
        return await this.page.locator('//*[@data-test = "inventory-item"]').count();
    }
    async getAllGoodsName(): Promise<string[]> {
        return await this.page.locator('//*[@data-test = "inventory-item-name"]').allTextContents();
    }
    /**
 * 
 * @param value - should be one of this: az, za, lohi, hilo
 */
    async selectSortOption(value: string): Promise<void> {
        await this.page.locator('[data-test="product-sort-container"]').selectOption(value);
    }
    /**
     * 
     * @param good - should be one of this: backpack, bike light
     */
    async addToCart(good: string) {
        if (good === 'backpack') {
            await this.btnAddToCartBackpack.click();
        }
        if (good === 'bike light') {
            await this.btnAddToCartBikeLight.click();
        }
    }
    async openDetailsByImage() {
        await this.imageBackpack.click();
    }
    async openDetailsByLink() {
        await this.linkBackpack.click();
    }
    async openCart() {
        await this.linkToCart.click();
    }
    /**
 * 
 * @param good - should be one of this: backpack, bike light
 */
    async removeFromCart(good: string) {
        if (good === 'backpack') {
            await this.btnRemoveBackpack.click();
        }
        if (good === 'bike light') {
            await this.btnRemoveBikeLight.click();
        }
    }
    async verifyAllControlsOnGoodCard(): Promise<void> {

        const inventoryItems = this.page.locator('[data-test="inventory-item"]');
        const count = await inventoryItems.count();

        for (let i = 0; i < count; i++) {
            const item = inventoryItems.nth(i);
            const goodIsCheck = await item.locator('[data-test="inventory-item-name"]').textContent();

            await expect(item.locator('[data-test*="inventory-item-"][data-test$="-img"]')).toBeVisible();
            await expect(item.locator('[data-test="inventory-item-name"]')).toBeVisible();
            await expect(item.locator('[data-test="inventory-item-desc"]')).toBeVisible();
            await expect(item.locator('[data-test="inventory-item-price"]')).toBeVisible();
            await expect(item.locator('.btn_inventory')).toBeVisible();

            console.log(`${goodIsCheck} - checked`);
        }
    }
    async verifyLoginIsSuccess(userName: string) {
        await (userName === 'locked_out_user' ? expect(this.title).not.toBeVisible() : expect(this.title).toBeVisible());
    }
}