import { Locator, Page } from "@playwright/test";

export class HomePage {

    readonly page: Page;
    readonly btnSignUp: Locator;



    constructor(page: Page) {
        this.page = page;
        this.btnSignUp = page.getByText('Sign up');
    }

    async openRegisterForm() {
        await this.btnSignUp.click();
    }
}