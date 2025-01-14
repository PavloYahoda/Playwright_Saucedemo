import { Locator, Page } from "@playwright/test";

export class HomePage {

    readonly page: Page;
    readonly fieldUserName: Locator;
    readonly fieldPassword: Locator;
    readonly btnLogin: Locator;



    constructor(page: Page) {
        this.page = page;
        this.fieldUserName = page.locator('//*[@data-test="username"]');
        this.fieldPassword = page.locator('//*[@data-test="password"]');
        this.btnLogin = page.locator('//*[@data-test="login-button"]');
    }
   
    async loginWithCreds(userName: string, password: string) {
        
        await this.fieldUserName.fill(userName);
        await this.fieldPassword.fill(password);
        await this.btnLogin.click();
    }
}