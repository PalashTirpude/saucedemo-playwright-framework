/\*\*

- FIXTURES QUICK START GUIDE
- Get started with Playwright fixtures in 5 minutes
  \*/

/\*\*

- ============================================================================
- 1.  WHAT ARE FIXTURES?
- ============================================================================
-
- Fixtures are functions that set up test dependencies and provide values
- to tests. They eliminate boilerplate code and make tests cleaner.
-
- Think of them like setup/teardown on steroids with dependency injection.
  \*/

/\*\*

- ============================================================================
- 2.  BASIC FIXTURE USAGE (Copy this pattern)
- ============================================================================
  \*/

import { test, expect } from '../fixtures/pageFixtures';

// Use any available fixture by adding it as a parameter
test('Login test using loginPage fixture', async ({ loginPage, page }) => {
await loginPage.navigate('/');
await loginPage.login('standard_user', 'secret_sauce');
expect(page.url()).toContain('inventory.html');
});

/\*\*

- ============================================================================
- 3.  AVAILABLE FIXTURES - QUICK REFERENCE
- ============================================================================
  \*/

/\*\*

- SINGLE PAGE OBJECT FIXTURES:
-
- test('name', async ({ loginPage }) => { ... });
- test('name', async ({ inventoryPage }) => { ... });
- test('name', async ({ cartPage }) => { ... });
- test('name', async ({ checkoutPage }) => { ... });
  \*/

/\*\*

- DATA FIXTURES:
-
- test('name', async ({ users }) => {
- const username = users.validUserData.username;
- const password = users.validUserData.password;
- });
  \*/

/\*\*

- SPECIAL FIXTURES:
-
- // Pre-authenticated user (user is already logged in)
- test('name', async ({ authenticatedUser }) => {
- const { loginPage, page } = authenticatedUser;
- // User is already at inventory.html
- });
  \*/

/\*\*

- ============================================================================
- 4.  COMMON PATTERNS
- ============================================================================
  \*/

// Pattern 1: Single fixture
test('Use one fixture', async ({ loginPage, page }) => {
await loginPage.navigate('/');
// ... test code
});

// Pattern 2: Multiple fixtures
test('Use multiple fixtures', async ({ loginPage, inventoryPage, users }) => {
await loginPage.navigate('/');
await loginPage.login(users.validUserData.username, users.validUserData.password);
// ... test code
});

// Pattern 3: Pre-authenticated user (skip login)
test('Use authenticated user', async ({ authenticatedUser, page }) => {
// User is already logged in, page is at inventory.html
const { loginPage } = authenticatedUser;

// Now use other page objects
expect(page.url()).toContain('inventory.html');
});

// Pattern 4: Mix page object and raw page object
test('Mix fixtures with page object', async ({ loginPage, page }) => {
// Use fixture
await loginPage.navigate('/');

// Also use raw page object if needed
const title = await page.title();
expect(title).toBeTruthy();
});

/\*\*

- ============================================================================
- 5.  STEP-BY-STEP MIGRATION (For existing tests)
- ============================================================================
  \*/

/\*\*

- Your old test:
-
- import { test, expect } from '@playwright/test';
- import { LoginPage } from '../pages/LoginPage';
-
- test('Login', async ({ page }) => {
- const loginPage = new LoginPage(page);
- await loginPage.navigate('/');
- await loginPage.login('user', 'pass');
- });
-
-
- Converting to fixtures:
-
- 1.  Change this line:
- FROM: import { test, expect } from '@playwright/test';
- TO: import { test, expect } from '../fixtures/pageFixtures';
-
- 2.  Remove this line:
- FROM: import { LoginPage } from '../pages/LoginPage';
- TO: (delete it)
-
- 3.  Add loginPage to test parameters:
- FROM: async ({ page }) => {
- TO: async ({ loginPage, page }) => {
-
- 4.  Remove manual instantiation:
- FROM: const loginPage = new LoginPage(page);
- TO: (delete it)
-
- Result:
-
- import { test, expect } from '../fixtures/pageFixtures';
-
- test('Login', async ({ loginPage, page }) => {
- await loginPage.navigate('/');
- await loginPage.login('user', 'pass');
- });
  \*/

/\*\*

- ============================================================================
- 6.  FIXTURE REFERENCE CARD
- ============================================================================
  \*/

/\*\*

- Extract this cheat sheet to clipboard:
-
- FIXTURE NAMES & TYPES:
- ├─ loginPage → LoginPage instance
- ├─ inventoryPage → InventoryPage instance
- ├─ cartPage → CartPage instance
- ├─ checkoutPage → CheckoutPage instance
- ├─ users → { validUserData, invalidUserData }
- └─ authenticatedUser → { page, loginPage }
-
- IMPORT ALWAYS:
- import { test, expect } from '../fixtures/pageFixtures';
-
- RELATIVE PATH MATTERS:
- From tests/LoginTest.spec.js → ../fixtures/pageFixtures
- From fixtures/exampleTests.spec.js → ./pageFixtures
-
- TEST SIGNATURE:
- test('name', async ({ fixture1, fixture2 }) => { ... });
-
- COMBINING FIXTURES:
- {loginPage, inventoryPage, users, page}
  \*/

/\*\*

- ============================================================================
- 7.  DO's AND DON'Ts
- ============================================================================
  \*/

/\*\*

- DO:
- ✅ Import from '../fixtures/pageFixtures'
- ✅ Add fixtures to test parameters: async ({ loginPage, page }) => { ... }
- ✅ Use authenticatedUser when user needs to be logged in
- ✅ Combine multiple fixtures in one test
- ✅ Mix fixtures with raw page object
-
- DON'T:
- ❌ Import from '@playwright/test' for tests using fixtures
- ❌ Manually create page objects: const loginPage = new LoginPage(page);
- ❌ Forget to add fixture to test parameters
- ❌ Use authenticatedUser, then navigate('/') again
- ❌ Import page objects individually
  \*/

/\*\*

- ============================================================================
- 8.  TROUBLESHOOTING
- ============================================================================
  \*/

/\*\*

- ERROR: "loginPage is not defined"
- CAUSE: Forgot to add loginPage to test parameters
- FIX: Change async ({ page }) to async ({ loginPage, page })
-
- ERROR: "Cannot find fixture with name 'loginPage'"
- CAUSE: Wrong import or fixture doesn't exist
- FIX: Ensure import is from '../fixtures/pageFixtures'
-      Check fixtures/pageFixtures.js has the fixture defined
-
- ERROR: "Cannot find module '../fixtures/pageFixtures'"
- CAUSE: Wrong relative path based on file location
- FIX: From tests/ folder: use ../fixtures/pageFixtures
-      From fixtures/ folder: use ./pageFixtures
-
- ERROR: Tests not waiting for authentication
- CAUSE: Using authenticatedUser but fixture takes time to set up
- FIX: Use modern Playwright version (>=1.43.0)
-      Fixtures are sequential by default
  \*/

/\*\*

- ============================================================================
- 9.  RUNNING TESTS
- ============================================================================
  \*/

/\*\*

- All standard Playwright commands work the same:
-
- npx playwright test # All tests
- npx playwright test tests/LoginTest # Specific file
- npx playwright test tests/LoginTest:5 # Specific line
- npx playwright test -g "Login" # By name pattern
- npx playwright test --headed # Headed mode
- npx playwright test --debug # Debug mode
- TEST_ENV=staging npx playwright test # With environment var
- npx playwright test --project=chromium # Single browser
  \*/

/\*\*

- ============================================================================
- 10. NEXT STEPS
- ============================================================================
  \*/

/\*\*

- 1.  Copy a simple test from fixtures/exampleTests.spec.js
- 2.  Modify it for your needs
- 3.  Run: npx playwright test --headed
- 4.  See fixtures in action
- 5.  Migrate your existing tests
-
- For detailed examples: See fixtures/exampleTests.spec.js
- For migration help: See fixtures/MIGRATION_GUIDE.md
- For fixture details: See fixtures/README.md
  \*/
