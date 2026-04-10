import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

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
     * Provides valid and invalid user credentials from environment variables
     */
    users: async ({ }, use) => {
        const validUserData = {
            username: process.env.VALID_USERNAME,
            password: process.env.VALID_PASSWORD
        };
        const invalidUserData = {
            username: process.env.INVALID_USERNAME,
            password: process.env.INVALID_PASSWORD
        };
        const userData = {
            userData: {
                validUserData,
                invalidUserData
            },
            validUserData,
            invalidUserData,
            checkoutDetails: {
                firstName: 'Tony',
                lastName: 'Stark',
                postalCode: '442001'
            }
        };
        await use(userData);
    },


    /**
     * Authenticated user fixture
     * Logs in a valid user and provides access to inventory page
     * Useful for tests that require pre-authenticated state
     */
    authenticatedUser: async ({ page, loginPage }, use) => {
        await loginPage.navigate('/');
        await loginPage.login(
            process.env.VALID_USERNAME,
            process.env.VALID_PASSWORD
        );
        await use({ page, loginPage });
    },
});

export { expect } from '@playwright/test';
