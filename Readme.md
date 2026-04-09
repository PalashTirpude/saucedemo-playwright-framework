# SauceDemo Automation Testing Framework

## Project Overview

**Functional Testing:** Comprehensive end-to-end test automation for SauceDemo (https://www.saucedemo.com), a sample e-commerce platform. Covers core user workflows including user authentication, product inventory browsing, shopping cart management, and checkout processes.

**Framework Implementation:** Built on Playwright with JavaScript (ES6+), the framework employs the Page Object Model (POM) design pattern for clean architecture and maintainability. Features include cross-browser testing (Chromium, Firefox, WebKit), environment-based configuration, Allure reporting, and seamless GitHub Actions CI/CD integration for automated test execution and reporting.

## Key Features

| Feature                     | Description                                              | Status |
| --------------------------- | -------------------------------------------------------- | ------ |
| Page Object Model (POM)     | Modular page classes with BasePage for reusable methods  | ✅     |
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

Create environment-specific `.env` files in the `configs/` directory:

- `qa.env` – QA environment
- `staging.env` – Staging environment
- `production.env` – Production environment

Run tests with a specific environment:

```bash
TEST_ENV=staging npx playwright test
```

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
- **Add environment variables:** Use GitHub Secrets for sensitive data like database credentials
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
- **DRY Principle** – Common methods in BasePage
- **Consistent Naming** – Clear, descriptive method names
- **Async/Await** – Proper handling of asynchronous operations
- **Error Handling** – Meaningful error messages
- **Externalized Data** – Test data separated from test logic
- **Environment Configuration** – No hardcoded URLs/credentials
