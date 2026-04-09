import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { UserData } from '../test-data/UserData';

/**
 * Page Object Fixtures
 * Provides all page objects as fixtures for use in tests
 * This simplifies test code and makes fixtures reusable across tests
 */
export const test = base.extend({
    /**
     * LoginPage fixture
     * Automatically available in all tests as 'loginPage'
     * @type {LoginPage}
     */
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    /**
     * InventoryPage fixture
     * Automatically available in all tests as 'inventoryPage'
     * @type {InventoryPage}
     */
    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },

    /**
     * CartPage fixture
     * Automatically available in all tests as 'cartPage'
     * @type {CartPage}
     */
    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    /**
     * CheckoutPage fixture
     * Automatically available in all tests as 'checkoutPage'
     * @type {CheckoutPage}
     */
    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    },

    /**
     * User data fixture
     * Provides valid and invalid user credentials
     */
    users: async ({ }, use) => {
        await use(UserData);
    },


    /**
     * Authenticated user fixture
     * Logs in a valid user and provides access to inventory page
     * Useful for tests that require pre-authenticated state
     */
    authenticatedUser: async ({ page, loginPage }, use) => {
        await loginPage.navigate('/');
        await loginPage.login(
            UserData.userData.validUserData.username,
            UserData.userData.validUserData.password
        );
        await use({ page, loginPage });
    },
});

export { expect } from '@playwright/test';
