import { Locator, Page, expect } from "@playwright/test";

export class CheckoutPage {

    readonly page: Page;
    readonly title: Locator;
    readonly fieldFirstName: Locator;
    readonly fieldLastName: Locator;
    readonly fieldZipCode: Locator;
    readonly btnContinue: Locator;
    readonly btnCancel: Locator;
    readonly errorMessage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('[data-test="title"]');
        this.fieldFirstName = page.locator('//*[@data-test="firstName"]');
        this.fieldLastName = page.locator('//*[@data-test="lastName"]');
        this.fieldZipCode = page.locator('//*[@data-test="postalCode"]');
        this.btnContinue = page.locator('//*[@data-test="continue"]');
        this.btnCancel = page.locator('//*[@data-test="cancel"]');
        this.errorMessage = page.locator('//*[@data-test="error"]');
    }

    async fillAllFields(firstName: string, lastName: string, zipCode: string) {
        await this.fieldFirstName.fill(firstName);
        await this.fieldLastName.fill(lastName);
        await this.fieldZipCode.fill(zipCode);
    }
    async submitForm() {
        await this.btnContinue.click();
    }
    async rejectForm(){
        await this.btnCancel.click();
    }
}