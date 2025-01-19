import { Locator, Page, expect } from "@playwright/test";

export class OverviewPage {

    readonly page: Page;
    readonly title: Locator;
    readonly fieldPaymentLabel: Locator;
    readonly fieldPaymentValue: Locator;
    readonly fieldShippingLabel: Locator;
    readonly fieldShippingValue: Locator;
    readonly fieldPriceLabel: Locator;
    readonly subtotalLabel: Locator;
    readonly taxLabel: Locator;
    readonly totalLabel: Locator;
    readonly btnFinish: Locator;
    readonly btnCancel: Locator;
    readonly fieldName: Locator;
    readonly fieldDescription: Locator;
    readonly fieldPrice: Locator;


    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('[data-test="title"]');
        this.fieldPaymentLabel = page.locator('//*[@data-test="payment-info-label"]');
        this.fieldPaymentValue = page.locator('//*[@data-test="payment-info-value"]');
        this.fieldShippingLabel = page.locator('//*[@data-test="shipping-info-label"]');
        this.fieldShippingValue = page.locator('//*[@data-test="shipping-info-value"]');
        this.fieldPriceLabel = page.locator('//*[@data-test="total-info-label"]');
        this.subtotalLabel = page.locator('//*[@data-test="subtotal-label"]');
        this.taxLabel = page.locator('//*[@data-test="tax-label"]');
        this.totalLabel = page.locator('//*[@data-test="total-label"]');
        this.btnFinish = page.locator('//*[@data-test="finish"]');
        this.btnCancel = page.locator('//*[@data-test="cancel"]');
        this.fieldName = page.locator('//*[@data-test="inventory-item-name"]');
        this.fieldDescription = page.locator('//*[@data-test="inventory-item-desc"]');
        this.fieldPrice = page.locator('//*[@data-test="inventory-item-price"]');
    }

    async goToCompletePage() {
        await this.btnFinish.click();
    }
    async goToInventoryPage() {
        await this.btnCancel.click();
    }
    async getTotalPrice(): Promise<number> {
        const overviewItems = this.page.locator('[data-test="inventory-item"]');
        const count = await overviewItems.count();
        let totalPrice = 0;

        for (let i = 0; i < count; i++) {
            const item = overviewItems.nth(i);
            const priceText = await item.locator('[data-test="inventory-item-price"]').textContent();

            if (priceText) {
                const price = parseFloat(priceText.replace('$', '').trim());
                totalPrice += price;
            }
        }
        return parseFloat(totalPrice.toFixed(2));
    }
    async getTaxValue(): Promise<number> {
        let taxValue = 0;
        let taxText = await this.taxLabel.textContent();
        if (taxText) {
            taxValue = parseFloat(taxText.replace('Tax: $', '').trim());
        }
        return parseFloat(taxValue.toFixed(2));
    }
    async verifyAllControlsOnPage() {
        await expect(this.btnFinish).toBeVisible();
        await expect(this.btnCancel).toBeVisible();
        await expect(this.fieldPaymentLabel).toHaveText('Payment Information:');
        await expect(this.fieldPaymentValue).toHaveText('SauceCard #31337');
        await expect(this.fieldShippingLabel).toHaveText('Shipping Information:');
        await expect(this.fieldShippingValue).toHaveText('Free Pony Express Delivery!');
        await expect(this.fieldPriceLabel).toHaveText('Price Total');
        await expect(this.subtotalLabel).toHaveText('Item total: $0');
        await expect(this.taxLabel).toHaveText('Tax: $0.00');
        await expect(this.totalLabel).toHaveText('Total: $0.00');

    }
    async verifyControlsOnPageWithGoodsOrdered() {

        const overviewItems = this.page.locator('[data-test="inventory-item"]');
        const count = await overviewItems.count();

        for (let i = 0; i < count; i++) {
            const item = overviewItems.nth(i);
            const goodIsCheck = await item.locator('[data-test="inventory-item-name"]').textContent();

            await expect(item.locator(this.fieldName)).toBeVisible();
            await expect(item.locator(this.fieldDescription)).toBeVisible();
            await expect(item.locator(this.fieldPrice)).toBeVisible();
        }
        await expect(this.btnFinish).toBeVisible();
        await expect(this.btnCancel).toBeVisible();
        await expect(this.fieldPaymentLabel).toHaveText('Payment Information:');
        await expect(this.fieldPaymentValue).toHaveText('SauceCard #31337');
        await expect(this.fieldShippingLabel).toHaveText('Shipping Information:');
        await expect(this.fieldShippingValue).toHaveText('Free Pony Express Delivery!');
        await expect(this.fieldPriceLabel).toHaveText('Price Total');
    }
    async verifyCostIsCorrect(itemTotal: number, tax: number, total: number){

        const taxString = tax.toFixed(2);
        await expect(this.subtotalLabel).toHaveText(`Item total: $${itemTotal}`);
        await expect(this.taxLabel).toHaveText(`Tax: $${taxString}`);
        await expect(this.totalLabel).toHaveText(`Total: $${total}`);
    }

}