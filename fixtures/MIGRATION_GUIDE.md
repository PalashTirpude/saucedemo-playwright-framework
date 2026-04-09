/\*\*

- FIXTURES IMPLEMENTATION GUIDE
- How to Migrate Tests from Manual Page Object Instantiation to Fixtures
  \*/

// ============================================================================
// STEP 1: UPDATE TEST FILE IMPORTS
// ============================================================================

// ❌ OLD WAY - Manual imports
// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../pages/LoginPage';
// import { UserData } from '../test-data/UserData';

// ✅ NEW WAY - Use fixture imports
import { test, expect } from '../fixtures/pageFixtures';

// ============================================================================
// STEP 2: REMOVE MANUAL PAGE OBJECT INSTANTIATION
// ============================================================================

// ❌ OLD WAY - Manually create page objects in every test
test('Old way - manual instantiation', async ({ page }) => {
const loginPage = new LoginPage(page);
await loginPage.navigate('/');
await loginPage.login('user', 'pass');
});

// ✅ NEW WAY - Receive page objects as fixture parameters
test('New way - using fixtures', async ({ loginPage, page }) => {
await loginPage.navigate('/');
await loginPage.login('user', 'pass');
});

// ============================================================================
// STEP 3: MIGRATION CHECKLIST
// ============================================================================

/\*\*

- BEFORE MIGRATING YOUR TESTS:
-
- 1.  ✅ Ensure fixtures/pageFixtures.js includes all page objects you need
- 2.  ✅ Check that all test files are in tests/ directory
- 3.  ✅ Backup existing test files
- 4.  ✅ Update test file by file (not all at once)
-
- MIGRATION STEPS FOR EACH TEST FILE:
-
- 1.  Change import statement:
- FROM: import { test, expect } from '@playwright/test';
- TO: import { test, expect } from '../fixtures/pageFixtures';
-
- 2.  Remove manual page object imports:
- FROM: import { LoginPage } from '../pages/LoginPage';
- TO: (deleted - fixture now provides it)
-
- 3.  Update test function parameters:
- FROM: test('name', async ({ page }) => { ... })
- TO: test('name', async ({ loginPage, page }) => { ... })
-
- 4.  Remove manual page object creation:
- FROM: const loginPage = new LoginPage(page);
- TO: (deleted - fixture instantiates it)
-
- 5.  Update user data access:
- FROM: UserData.userData.validUserData.username
- TO: users.validUserData.username (if users fixture is added)
  \*/

// ============================================================================
// STEP 4: EXAMPLE MIGRATIONS
// ============================================================================

// ============================================================================
// EXAMPLE 1: Simple Login Test
// ============================================================================

// BEFORE (LoginTest.spec.js original)
/\*
import { test, expect } from '@playwright/test';
import { LoginPage } from "../pages/LoginPage";
import { UserData } from '../test-data/UserData';

test('Valid credentials Login Test', async ({ page }) => {
const loginPage = new LoginPage(page);
await loginPage.navigate('/');
await loginPage.login(
UserData.userData.validUserData.username,
UserData.userData.validUserData.password
);
expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
await loginPage.logout();
expect(page.url()).toBe('https://www.saucedemo.com/')
});

test('Invalid Credentials Login Test', async ({ page }) => {
const loginPage = new LoginPage(page);
await loginPage.navigate('/');
await loginPage.login(
UserData.userData.invalidUserData.username,
UserData.userData.invalidUserData.password
);
const actualErrorMessage = await loginPage.getErrorMessageForInvalidCredentials();
expect(actualErrorMessage).toBe('Epic sadface: Username and password do not match any user in this service');
});
\*/

// AFTER (Using fixtures)
test('Valid credentials Login Test with fixtures', async ({ loginPage, page, users }) => {
await loginPage.navigate('/');
await loginPage.login(users.validUserData.username, users.validUserData.password);
expect(page.url()).toContain('inventory.html');
await loginPage.logout();
expect(page.url()).toBe('https://www.saucedemo.com/');
});

test('Invalid Credentials Login Test with fixtures', async ({ loginPage, users }) => {
await loginPage.navigate('/');
await loginPage.login(users.invalidUserData.username, users.invalidUserData.password);
const actualErrorMessage = await loginPage.getErrorMessageForInvalidCredentials();
expect(actualErrorMessage).toContain('do not match');
});

// ============================================================================
// EXAMPLE 2: Test Requiring Pre-authenticated User
// ============================================================================

// BEFORE
/\*
test('Inventory page has products', async ({ page }) => {
const loginPage = new LoginPage(page);
const inventoryPage = new InventoryPage(page);
const userData = UserData.userData;

    // Setup: Login
    await loginPage.navigate('/');
    await loginPage.login(userData.validUserData.username, userData.validUserData.password);

    // Test: Verify products exist
    const productCount = await inventoryPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);

});
\*/

// AFTER
test('Inventory page has products with authenticatedUser fixture', async ({ authenticatedUser, inventoryPage }) => {
// User is already logged in via authenticatedUser fixture
const productCount = await inventoryPage.getProductCount();
expect(productCount).toBeGreaterThan(0);
});

// ============================================================================
// EXAMPLE 3: Test Using Multiple Fixtures
// ============================================================================

// BEFORE
/\*
test('Add item to cart', async ({ page }) => {
const loginPage = new LoginPage(page);
const inventoryPage = new InventoryPage(page);
const cartPage = new CartPage(page);

    // Login
    await loginPage.navigate('/');
    await loginPage.login('user', 'pass');

    // Add to cart
    await cartPage.addItemToCart('product-id');

    // Verify
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(1);

});
\*/

// AFTER
test('Add item to cart with fixtures', async ({ authenticatedUser, cartPage }) => {
// User already logged in via authenticatedUser fixture
await cartPage.addItemToCart('product-id');
const count = await cartPage.getCartItemCount();
expect(count).toBe(1);
});

// ============================================================================
// STEP 5: COMMON PITFALLS & SOLUTIONS
// ============================================================================

/\*\*

- PITFALL 1: Forgetting to import from fixtures
- ❌ import { test, expect } from '@playwright/test';
- ✅ import { test, expect } from '../fixtures/pageFixtures';
-
- PITFALL 2: Not updating relative import path
- Problem: '../fixtures/pageFixtures' vs './fixtures/pageFixtures'
- Solution: Check file location relative to test file
-
- PITFALL 3: Using authenticatedUser but navigating again
- ❌ const { loginPage } = authenticatedUser;
- await loginPage.navigate('/'); // Redundant
- ✅ const { loginPage } = authenticatedUser;
- // User already at inventory.html
-
- PITFALL 4: Forgetting to add fixture to test parameters
- ❌ test('name', async ({ page }) => { ... })
- // Then trying to use loginPage
- ✅ test('name', async ({ loginPage, page }) => { ... })
-
- PITFALL 5: Not destructuring fixture objects
- ❌ test('name', async (TestContext) => {
-      await TestContext.loginPage.login();
- ✅ test('name', async ({ loginPage }) => {
-      await loginPage.login();
  \*/

// ============================================================================
// STEP 6: RUNNING TESTS WITH FIXTURES
// ============================================================================

/\*\*

- No changes to how you run tests!
-
- npx playwright test # Run all tests
- npx playwright test tests/LoginTest # Run specific file
- npx playwright test --debug # Debug mode
- npx playwright test --headed # Show browser
- TEST_ENV=staging npx playwright test # With environment variable
-
- Fixtures work seamlessly with all existing Playwright commands.
  \*/

// ============================================================================
// NEXT STEPS
// ============================================================================

/\*\*

- 1.  Migrate LoginTest.spec.js first (simplest tests)
- 2.  Update InventoryTest.spec.js to use fixtures
- 3.  Migrate CartTest.spec.js
- 4.  Create new tests using fixtures
- 5.  Add custom fixtures as needed (see fixtures/pageFixtures.js)
-
- For complete working examples, see: fixtures/exampleTests.spec.js
  \*/
