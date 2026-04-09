/**
 * Example Tests Using Fixtures
 * 
 * This file demonstrates how to use Playwright fixtures in the framework.
 * Copy these examples to your own test files.
 */

import { test, expect } from '../fixtures/pageFixtures';

// ==================== BASIC FIXTURE USAGE ====================

test('Login with valid credentials using fixtures', async ({ loginPage, page }) => {
    // loginPage fixture is automatically instantiated
    await loginPage.navigate('/');
    await loginPage.login('standard_user', 'secret_sauce');
    expect(page.url()).toContain('inventory.html');
    await loginPage.logout();
});

test('Invalid login with fixture access to user data', async ({ loginPage, users }) => {
    // Access user data through the 'users' fixture
    await loginPage.navigate('/');
    await loginPage.login(
        users.invalidUserData.username,
        users.invalidUserData.password
    );
    const errorMsg = await loginPage.getErrorMessageForInvalidCredentials();
    expect(errorMsg).toContain('do not match');
});

// ==================== USING AUTHENTICATED USER FIXTURE ====================

test('Browse inventory with pre-authenticated user', async ({ authenticatedUser, page }) => {
    // User is already logged in through authenticatedUser fixture
    const { loginPage } = authenticatedUser;

    // Now you can use inventory features directly
    expect(page.url()).toContain('inventory.html');
    await loginPage.logout();
});

test('Add items to cart as authenticated user', async ({ authenticatedUser, cartPage, page }) => {
    // authenticatedUser fixture sets up a logged-in session
    const { loginPage } = authenticatedUser;

    // Add items and verify
    // (Implement with your actual CartPage methods)
    expect(page.url()).toContain('inventory.html');
});

// ==================== MULTIPLE FIXTURES IN ONE TEST ====================

test('Complete checkout flow with page fixtures', async ({
    authenticatedUser,
    checkoutPage,
    page
}) => {
    // Combines authenticatedUser and checkoutPage fixtures
    const { loginPage } = authenticatedUser;

    // User is already logged in, proceed with checkout
    // (Implement checkout logic here)
    expect(page.url()).toContain('inventory.html');
});

// ==================== MIXING FIXTURES WITH CUSTOM PAGE INSTANTIATION ====================

test('Can still use page directly with fixtures', async ({ page, loginPage, users }) => {
    // Fixtures coexist with the standard page object
    await loginPage.navigate('/');

    // Both fixture access and direct page access work
    await loginPage.login(users.validUserData.username, users.validUserData.password);

    const title = await page.title();
    expect(title).toBeTruthy();
});
