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

## Best Practices Implemented

- **Page Object Model** – Each page has its own class
- **DRY Principle** – Common methods in BasePage
- **Consistent Naming** – Clear, descriptive method names
- **Async/Await** – Proper handling of asynchronous operations
- **Error Handling** – Meaningful error messages
- **Externalized Data** – Test data separated from test logic
- **Environment Configuration** – No hardcoded URLs/credentials
