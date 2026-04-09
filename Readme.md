# SauceDemo Automation Testing Framework

## Project Overview

This is a comprehensive end-to-end test automation framework for SauceDemo (https://www.saucedemo.com) built using Playwright. The framework implements the Page Object Model (POM) design pattern, providing maintainable, reusable, and scalable test automation for the SauceDemo e-commerce platform.

## Key Features

| Feature                   | Description                                       | Status |
| ------------------------- | ------------------------------------------------- | ------ |
| Page Object Model         | Clean separation of test logic from page elements | ✅     |
| Cross-browser Testing     | Chromium, Firefox, and WebKit support             | ✅     |
| Parallel Execution        | Configurable parallel test execution              | ✅     |
| Allure Reporting          | Beautiful and informative test reports            | ✅     |
| Environment Configuration | Dynamic environment management using .env files   | ✅     |
| Screenshot Capture        | Built-in screenshot functionality for debugging   | ✅     |
| Data-driven Testing       | Externalized test data management                 | ✅     |
| CI/CD Integration         | Ready for Jenkins, GitHub Actions, GitLab CI      | ✅     |

## Tech Stack

| Tool              | Purpose                         |
| ----------------- | ------------------------------- |
| Playwright        | Test automation framework       |
| JavaScript (ES6+) | Programming language            |
| Allure            | Test reporting                  |
| dotenv            | Environment variable management |

## Project Structure

```text
📦 sauce-demo-automation/
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

| Property           | Value                        | Description                              |
| ------------------ | ---------------------------- | ---------------------------------------- |
| **Trigger Events** | Manual (`workflow_dispatch`) | Triggered manually via GitHub Actions UI |
| **Runner**         | `ubuntu-latest`              | Runs on Ubuntu Linux environment         |
| **Node Version**   | 22                           | Latest Node.js LTS version               |
| **Browsers**       | Chromium, Firefox, Webkit    | Full cross-browser testing               |
| **Report Upload**  | GitHub Artifacts             | Test reports stored for 90 days          |

#### Workflow Steps

1. **Checkout Code** – Retrieves the repository code
2. **Setup Node.js** – Installs Node.js v22
3. **Install Dependencies** – Runs `npm install` for all packages
4. **Install Playwright Browsers** – Downloads all required browsers with system dependencies
5. **Run Tests** – Executes all Playwright tests with configured settings
6. **Upload Report** – Stores `playwright-report/` as a downloadable artifact

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
- **Change Node version:** Modify `node-version: 22` to any desired version
- **Add environment variables:** Use GitHub Secrets for sensitive data
- **Add notifications:** Integrate Slack, email, or other services
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
