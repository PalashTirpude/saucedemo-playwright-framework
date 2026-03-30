import { test, expect } from '@playwright/test';
import { LoginPage } from "../pages/LoginPage";
import { UserData } from '../test-data/UserData';

test('Valid credentials Login Test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate('/');
    await loginPage.login(UserData.userData.validUserData.username, UserData.userData.validUserData.password);
    expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
    await loginPage.logout();
    expect(page.url()).toBe('https://www.saucedemo.com/')

})

test('Invalid Credentials Login Test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate('/');
    await loginPage.login(UserData.userData.invalidUserData.username, UserData.userData.invalidUserData.password);
    /*
          expect(loginPage.getErrorMessageForInvalidCredentials).toBe('Epic sadface: Username and password do not match any user in this service');
          But getErrorMessageForInvalidCredentials is a function, not the actual text.
          So Playwright prints:
          Received: [Function getErrorMessageForInvalidCredentials]
    */

    const actualErrorMessage = await loginPage.getErrorMessageForInvalidCredentials();
    expect(actualErrorMessage).toBe('Epic sadface: Username and password do not match any user in this service');
})

