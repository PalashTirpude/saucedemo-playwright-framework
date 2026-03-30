import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    constructor(page) {
        super(page);
        /*
           this refers to the current instance of LoginPage
           Since LoginPage extends BasePage, it inherits all methods
           So this.locator() automatically resolves to the method defined in BasePage
         */
        this.username = this.locator('#user-name');
        this.password = this.locator('#password');
        this.loginbutton = this.getByRole('button', { name: 'Login' });
        this.usernameOrPasswordErrorMessage = this.locator('.error-message-container h3');
        this.menu = this.getByRole('button', { name: 'Open Menu' });
        this.logoutLink = this.getByRole('link', { name: 'Logout' })
    }

    async login(username, password) {
        await this.fill(this.username, username);
        await this.fill(this.password, password);
        await this.click(this.loginbutton);
    }

    async getErrorMessageForInvalidCredentials() {
        return this.usernameOrPasswordErrorMessage.innerText();
    }

    async logout() {
        await this.click(this.menu);
        await this.click(this.logoutLink);
    }

    /*
    this.logout = this.getByRole('link', { name: 'Logout' })

    async logout() {
        await this.click(this.menu);
        await this.click(this.logout);
    }

    ---------------------------------------------------------------------------------------------------------------------------------------------------------------

    Problem:
    You are using the same name logout for:

    a locator (property) ❌
    a method (function) ❌

    ---------------------------------------------------------------------------------------------------------------------------------------------------------------

    JavaScript class behavior:

    Properties defined in constructor override methods
    So this line:
    this.logout = locator

    overwrites your logout() method

    ----------------------------------------------------------------------------------------------------------------------------------------------------------------

    That’s why Playwright says:

    logout is not a function

    Because now logout = locator, not a function.
*/

}