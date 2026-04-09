import { test, expect } from '../fixtures/pageFixtures';

test('Valid credentials Login Test', async ({ loginPage, users, page }) => {
    await loginPage.navigate('/');
    await loginPage.login(users.userData.validUserData.username, users.userData.validUserData.password);
    expect(page.url()).toContain('inventory.html');
    await loginPage.logout();
    expect(page.url()).toBe('https://www.saucedemo.com/');
});

test('Invalid Credentials Login Test', async ({ loginPage, users }) => {
    await loginPage.navigate('/');
    await loginPage.login(users.userData.invalidUserData.username, users.userData.invalidUserData.password);
    const actualErrorMessage = await loginPage.getErrorMessageForInvalidCredentials();
    expect(actualErrorMessage).toBe('Epic sadface: Username and password do not match any user in this service');
});

