# SauceDemo Automation Testing Framework

## Project Overview

**Functional Testing:** Comprehensive end-to-end test automation for SauceDemo (https://www.saucedemo.com), a sample e-commerce platform. Covers core user workflows including user authentication, product inventory browsing, shopping cart management, and checkout processes.

**Framework Implementation:** Built on Playwright with JavaScript (ES6+), the framework employs the Page Object Model (POM) design pattern for clean architecture and maintainability. Features include cross-browser testing (Chromium, Firefox, WebKit), environment-based configuration, Allure reporting, and seamless GitHub Actions CI/CD integration for automated test execution and reporting.

> **✨ Latest Enhancement:** All tests (LoginTest, InventoryTest, CartTest) have been refactored to use Playwright fixtures, eliminating boilerplate code and improving test maintainability.

## Key Features

| Feature                     | Description                                              | Status |
| --------------------------- | -------------------------------------------------------- | ------ |
| Page Object Model (POM)     | Modular page classes with BasePage for reusable methods  | ✅     |
| Playwright Fixtures         | Reusable setup/teardown and page object fixtures         | ✅     |
| Cross-browser Testing       | Chromium, Firefox, and WebKit support                    | ✅     |
| Allure Reporting            | Automated report generation with visual analytics        | ✅     |
| Playwright HTML Reports     | Built-in detailed test execution reports                 | ✅     |
| Environment Configuration   | Multi-environment .env files (QA, Staging, Production)   | ✅     |
| Screenshot Capture          | Automatic screenshots on test failure                    | ✅     |
| Data-driven Testing         | Externalized test data management (UserData.js)          | ✅     |
| Manual & Automated Triggers | GitHub Actions workflow_dispatch + CI/CD support         | ✅     |
| Configuration Management    | Centralized Playwright config with environment variables | ✅     |
| Error Handling & Logging    | Meaningful error messages and test execution logs        | ✅     |

## Tech Stack

| Tool              | Purpose                         |
| ----------------- | ------------------------------- |
| Playwright        | Test automation framework       |
| JavaScript (ES6+) | Programming language            |
| Allure            | Test reporting                  |
| dotenv            | Environment variable management |

## Project Structure

```text
📦 saucedemo-automation/
├── 📂 .github/
│   └── 📂 workflows/
│       └── 📄 playwright.yml
├── 📂 configs/
│   └── 📄 qa.env
├── 📂 fixtures/
│   ├── 📄 pageFixtures.js
│   ├── 📄 README.md
│   └── 📄 exampleTests.spec.js
├── 📂 pages/
│   ├── 📄 BasePage.js
│   ├── 📄 LoginPage.js
│   ├── 📄 InventoryPage.js
│   ├── 📄 CartPage.js
│   └── 📄 CheckoutPage.js
├── 📂 test-data/
│   └── 📄 UserData.js
├── 📂 tests/
│   ├── 📄 LoginTest.spec.js
│   ├── 📄 InventoryTest.spec.js
│   └── 📄 CartTest.spec.js
├── 📂 allure-results/
├── 📂 allure-report/
├── 📂 playwright-report/
├── 📂 test-results/
├── 📄 playwright.config.js
├── 📄 package.json
└── 📄 .gitignore
```

## Configuration

### Playwright Configuration (`playwright.config.js`)

| Setting           | Value                  | Description                     |
| ----------------- | ---------------------- | ------------------------------- |
| `testDir`         | `./tests`              | Directory containing test files |
| `timeout`         | `30000ms`              | Global test timeout             |
| `retries`         | `0` (local) / `2` (CI) | Number of test retries          |
| `workers`         | `1`                    | Parallel workers (adjustable)   |
| `baseURL`         | From `.env`            | Base URL for navigation         |
| `testIdAttribute` | `data-test`            | Custom test ID attribute        |

## Environment Configuration

### Secure Credential Management

All sensitive data (URLs, usernames, passwords) are securely managed using environment variables loaded from `.env` files in the `configs/` directory. This approach ensures credentials are never hardcoded in the codebase.

#### Local Development

Create environment-specific `.env` files in the `configs/` directory:

- `qa.env` – QA environment
- `staging.env` – Staging environment
- `production.env` – Production environment

**Example qa.env:**

```env
BASE_URL=https://www.saucedemo.com
VALID_USERNAME=standard_user
VALID_PASSWORD=secret_sauce
INVALID_USERNAME=standard_user
INVALID_PASSWORD=secret_sauc
```

Run tests with a specific environment:

```bash
TEST_ENV=qa npx playwright test
TEST_ENV=staging npx playwright test
```

#### CI/CD Pipeline (GitHub Actions)

In the CI/CD workflow (`.github/workflows/playwright.yml`), sensitive data is injected from **GitHub Secrets** instead of being hardcoded:

```yaml
- name: Run Tests
  run: npx playwright test
  env:
    BASE_URL: ${{ secrets.BASE_URL }}
    VALID_USERNAME: ${{ secrets.VALID_USERNAME }}
    VALID_PASSWORD: ${{ secrets.VALID_PASSWORD }}
    INVALID_USERNAME: ${{ secrets.INVALID_USERNAME }}
    INVALID_PASSWORD: ${{ secrets.INVALID_PASSWORD }}
```

### Setting Up GitHub Secrets

To configure secrets in your GitHub repository:

1. Navigate to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** for each secret:

| Secret Name        | Value                       | Purpose               |
| ------------------ | --------------------------- | --------------------- |
| `BASE_URL`         | `https://www.saucedemo.com` | Base URL for tests    |
| `VALID_USERNAME`   | `standard_user`             | Valid login username  |
| `VALID_PASSWORD`   | `secret_sauce`              | Valid login password  |
| `INVALID_USERNAME` | `standard_user`             | Invalid test username |
| `INVALID_PASSWORD` | `secret_sauc`               | Invalid test password |

3. Save each secret
4. The workflow will automatically inject these values as environment variables during test execution

### Security Best Practices

✅ **Do's:**

- Store sensitive data in GitHub Secrets for CI/CD
- Use `.env` files locally for development (never commit to git)
- Keep `.env` files in `.gitignore`
- Rotate credentials regularly
- Use different credentials for different environments

❌ **Don'ts:**

- Never hardcode credentials in test files
- Never commit `.env` files to the repository
- Never log credentials in test output or reports
- Never share secrets in pull requests or documentation

## Fixtures & Reusable Components

### What are Fixtures?

Fixtures are reusable setup and teardown logic in Playwright that provide values (like page objects, data, or authenticated sessions) to tests. They eliminate boilerplate code and make tests cleaner and more maintainable.

### ✅ Migration Status: COMPLETE

All test files in the `tests/` directory have been refactored to use fixtures:

- ✅ **LoginTest.spec.js** – Uses `loginPage` and `users` fixtures for authentication tests
- ✅ **InventoryTest.spec.js** – Uses `authenticatedUser` and `inventoryPage` fixtures to skip login step
- ✅ **CartTest.spec.js** – Uses all fixtures (`authenticatedUser`, `inventoryPage`, `cartPage`, `checkoutPage`, `users`) for end-to-end workflow

#### Benefits of Migration:

1. **Reduced Boilerplate** – No manual page object instantiation in every test
2. **Cleaner Tests** – Focus on test logic, not setup code
3. **Faster Execution** – Shared setup logic where applicable
4. **Reusability** – Pre-authenticated fixture skips redundant login steps
5. **Maintainability** – Page object changes only impact fixture definition

#### Real-World Examples from Tests

**LoginTest.spec.js - Before & After:**

Before:

```javascript
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { UserData } from "../test-data/UserData";

test("Valid credentials Login Test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate("/");
  await loginPage.login(
    UserData.userData.validUserData.username,
    UserData.userData.validUserData.password,
  );
  expect(page.url()).toBe("https://www.saucedemo.com/inventory.html");
});
```

After (with fixtures):

```javascript
import { test, expect } from "../fixtures/pageFixtures";

test("Valid credentials Login Test", async ({ loginPage, users, page }) => {
  await loginPage.navigate("/");
  await loginPage.login(
    users.validUserData.username,
    users.validUserData.password,
  );
  expect(page.url()).toContain("inventory.html");
});
```

**InventoryTest.spec.js - Using Pre-authenticated Fixture:**

Before:

```javascript
test("Products Add To Cart Test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  // Manual login required
  await loginPage.navigate("/");
  await loginPage.login(
    UserData.userData.validUserData.username,
    UserData.userData.validUserData.password,
  );

  // Then add products...
  for (const product of productList) {
    await inventoryPage.addProductToCart(product);
  }
});
```

After (authenticatedUser fixture skips login):

```javascript
test("Products Add To Cart Test", async ({
  authenticatedUser,
  inventoryPage,
  page,
}) => {
  // User is already logged in via authenticatedUser fixture
  expect(page.url()).toContain("inventory.html");

  // Directly add products
  for (const product of productList) {
    await inventoryPage.addProductToCart(product);
  }
});
```

**CartTest.spec.js - End-to-End with Multiple Fixtures:**

Now uses six fixtures for complete coverage:

- `authenticatedUser` – Skip login, user ready at inventory
- `inventoryPage` – Product browsing
- `cartPage` – Cart operations
- `checkoutPage` – Checkout flow
- `users` – Test data access
- `page` – Raw Playwright page object

### Available Fixtures

The framework provides several built-in fixtures in `fixtures/pageFixtures.js`:

| Fixture Name        | Type          | Used In Tests                           | Description                                                 |
| ------------------- | ------------- | --------------------------------------- | ----------------------------------------------------------- |
| `loginPage`         | LoginPage     | LoginTest.spec.js                       | Login page object for authentication tests                  |
| `inventoryPage`     | InventoryPage | InventoryTest.spec.js, CartTest.spec.js | Inventory page object for product browsing tests            |
| `cartPage`          | CartPage      | CartTest.spec.js                        | Cart page object for shopping cart tests                    |
| `checkoutPage`      | CheckoutPage  | CartTest.spec.js                        | Checkout page object for order completion tests             |
| `users`             | Object        | LoginTest.spec.js, CartTest.spec.js     | User test data (valid and invalid credentials)              |
| `authenticatedUser` | Object        | InventoryTest.spec.js, CartTest.spec.js | Pre-authenticated user session with login already completed |

### Using Fixtures in Tests

Instead of manually instantiating page objects, use fixtures:

**Before (without fixtures):**

```javascript
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test("Login test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate("/");
  await loginPage.login("user", "pass");
});
```

**After (with fixtures):**

```javascript
import { test, expect } from "../fixtures/pageFixtures";

test("Login test", async ({ loginPage, page }) => {
  await loginPage.navigate("/");
  await loginPage.login("user", "pass");
  expect(page.url()).toContain("inventory.html");
});
```

### Pre-authenticated User Fixture

For tests that require a logged-in user, use the `authenticatedUser` fixture:

```javascript
import { test, expect } from "../fixtures/pageFixtures";

test("Browse products as logged-in user", async ({
  authenticatedUser,
  page,
}) => {
  // User is already logged in via the fixture
  const { loginPage } = authenticatedUser;

  expect(page.url()).toContain("inventory.html");
  await loginPage.logout();
});
```

### User Data Fixture

Access test data through the `users` fixture:

```javascript
import { test, expect } from "../fixtures/pageFixtures";

test("Login with dynamic user data", async ({ loginPage, users }) => {
  await loginPage.navigate("/");
  await loginPage.login(
    users.validUserData.username,
    users.validUserData.password,
  );
  expect(page.url()).toContain("inventory.html");
});
```

### Combining Multiple Fixtures

Fixtures can be combined in a single test:

```javascript
test("Complete purchase flow", async ({
  authenticatedUser,
  cartPage,
  checkoutPage,
  page,
}) => {
  // authenticatedUser fixture logs in the user
  const { loginPage } = authenticatedUser;

  // Use other fixtures for cart and checkout
  await cartPage.addItemToCart("product-123");
  await checkoutPage.completeCheckout();

  expect(page.url()).toContain("thank-you");
});
```

### Creating Custom Fixtures

Add custom fixtures to `fixtures/pageFixtures.js`:

```javascript
export const test = base.extend({
  apiClient: async ({}, use) => {
    // Setup: Initialize API client
    const client = new APIClient();
    await client.authenticate();

    // Provide fixture to tests
    await use(client);

    // Teardown: Clean up
    await client.logout();
  },
});
```

### Fixture Examples

See `fixtures/exampleTests.spec.js` for complete working examples of fixture usage.

### Running Tests with Fixtures

All tests in the `tests/` directory now use fixtures. Run them using standard Playwright commands:

```bash
# Run all tests with fixtures
npx playwright test

# Run specific test file
npx playwright test tests/LoginTest.spec.js

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run tests in debug mode
npx playwright test --debug

# Run tests matching a pattern
npx playwright test -g "Login"

# Run with specific browser
npx playwright test --project=chromium

# Run with environment variable
TEST_ENV=staging npx playwright test
```

**Note:** No changes to how tests are executed – fixtures work seamlessly with all Playwright commands.

## CI/CD Integration

### GitHub Actions Workflow

The framework includes a fully configured GitHub Actions workflow (`.github/workflows/playwright.yml`) for automated testing on every push and pull request.

#### Workflow Configuration

| Property            | Value                        | Description                                    |
| ------------------- | ---------------------------- | ---------------------------------------------- |
| **Trigger Events**  | Manual (`workflow_dispatch`) | Triggered manually via GitHub Actions UI       |
| **Runner**          | `ubuntu-latest`              | Runs on Ubuntu Linux environment               |
| **Node Version**    | 24                           | Latest Node.js LTS version                     |
| **Package Manager** | `npm ci`                     | Clean, reproducible dependency installation    |
| **Browsers**        | Chromium, Firefox, Webkit    | Full cross-browser testing support             |
| **Reports**         | Playwright + Allure          | Dual reporting for comprehensive test insights |
| **Artifact Upload** | GitHub Artifacts             | Reports stored for 90 days retention           |

#### Workflow Steps

1. **Checkout Code** – Retrieves the repository code using actions/checkout@v4
2. **Setup Node.js** – Installs Node.js v24 with actions/setup-node@v4
3. **Install Dependencies** – Runs `npm ci` for clean, reproducible package installation
4. **Install Playwright Browsers** – Downloads all required browsers (Chromium, Firefox, WebKit) with system dependencies
5. **Run Tests** – Executes all Playwright tests with configured retries and timeouts
   - **Environment variables injected from GitHub Secrets** for secure credential management
   - Credentials are never exposed in logs or workflow files
6. **Install Allure CLI** – Installs allure-commandline globally for report generation
7. **Generate Allure Report** – Creates beautiful Allure HTML report from test results
8. **Upload Reports** – Stores both `playwright-report/` and Allure report as downloadable artifacts

#### Triggering Tests Manually

To run tests manually:

1. Go to the **Actions** tab in your GitHub repository
2. Select the **Playwright Tests** workflow on the left
3. Click the **Run workflow** button
4. Choose the branch and click **Run workflow**

The tests will execute immediately without requiring a commit or pull request.

#### Accessing Test Reports

After workflow completion:

- Go to the GitHub Actions tab in your repository
- Click on the completed workflow run
- Scroll to "Artifacts" section
- Download `playwright-report` to view detailed test results locally

#### Customizing the Workflow

To modify the workflow:

```bash
# Edit the workflow file
.github/workflows/playwright.yml
```

**Useful customizations:**

- **Manage secrets securely:** Store sensitive data in GitHub Secrets (Settings → Secrets and variables → Actions) rather than hardcoding values
- **Enable automatic triggers:** Uncomment `push:` and `pull_request:` sections to run on code changes
  ```yaml
  on:
    workflow_dispatch:
    push:
      branches: [main]
    pull_request:
  ```
- **Change Node version:** Modify `node-version: 24` to any desired version
- **Modify package installation:** Replace `npm ci` with `npm install` if you want to update dependencies
- **Configure Allure uploads:** Enable Allure Report Portal integration for long-term trend analysis
- **Add notifications:** Integrate Slack, email, or Microsoft Teams for test result alerts
- **Run specific tests:** Change `npx playwright test` to `npx playwright test tests/LoginTest.spec.js`
- **Add workflow inputs:** Allow selecting test suite or environment when manually triggering

#### Supporting Multiple CI/CD Platforms

While GitHub Actions is configured, the framework is compatible with:

- **Jenkins** – Use docker agents with Node.js
- **GitLab CI** – Place config in `.gitlab-ci.yml`
- **Azure Pipelines** – Use `azure-pipelines.yml`
- **CircleCI** – Configure in `.circleci/config.yml`

All require similar steps: checkout → install dependencies → install browsers → run tests → upload reports.

## Best Practices Implemented

- **Page Object Model** – Each page has its own class
- **Playwright Fixtures** – Reusable setup/teardown and page object fixtures reduce boilerplate
- **DRY Principle** – Common methods in BasePage and reusable fixtures
- **Consistent Naming** – Clear, descriptive method and fixture names
- **Async/Await** – Proper handling of asynchronous operations
- **Error Handling** – Meaningful error messages and assertions
- **Externalized Data** – Test data separated from test logic
- **Environment Configuration** – No hardcoded URLs/credentials, uses environment variables from `.env` files
- **Secure Credentials** – Sensitive data fetched from GitHub Secrets in CI/CD, never exposed in code or logs
- **Test Isolation** – Pre-authenticated user fixture for independent test scenarios
- **Composable Fixtures** – Combine multiple fixtures for complex test setups
