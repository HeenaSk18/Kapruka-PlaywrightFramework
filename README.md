# Kapruka Playwright Framework

This project is a Playwright-based end-to-end test automation framework for the Kapruka web application. It uses TypeScript page objects, an authenticated setup project, and Playwright and Allure reports.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- dotenv for environment configuration
- HTML report generation

## Project Structure

```bash
.
├── config/                     # Environment configuration
├── fixtures/
├── pages/                      # Page objects
├── scripts/                    # Allure generation and test runner helpers
├── test-e2e/                   # Playwright specs and authentication setup
├── Jenkinsfile                 # Windows Jenkins pipeline
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

Generated output (`allure-results/`, `allure-report/`, `playwright-report/`, and `test-results/`), local environment files, and saved authentication state are excluded from new Git tracking by `.gitignore`.

## Prerequisites

Before running the tests, make sure you have:

- Node.js 18+ installed
- npm installed
- Google Chrome installed (the Playwright config uses the system Chrome channel)
- Java installed and available on `PATH` for Allure report generation
- Valid Kapruka test credentials for login and authenticated setup tests

## Installation

```bash
npm ci
```

## Environment Configuration

The project loads environment values from a file named like:

```bash
config/.env.qa
```

Example:

```env
TEST_ENV=qa
BASE_URL=https://www.kapruka.com
TEST_EMAIL=your_email@example.com
TEST_PASSWORD=your_secure_password
```

Notes:

- `.env` files are ignored by Git for security.
- `TEST_ENV` defaults to `qa` if not set.
- `BASE_URL` is used by Playwright in `playwright.config.ts`.
- `TEST_EMAIL` and `TEST_PASSWORD` are required by the login and authentication setup tests.
- Supply real test credentials through the ignored environment file or a CI secret store. Do not commit credentials.

## Running Tests

Run all tests:

```bash
npm test
```

Run the login test only in headed Chrome:

```bash
npm run test:login
```

Run the complete suite and generate a fresh Allure HTML report:

```bash
npm run test:allure
```

This command clears the previous raw Allure results, runs the Playwright suite, and generates `allure-report`. It also generates the report if a test fails, then returns a failing exit code so CI correctly marks the build as failed.

Open the generated Allure report:

```bash
npm run allure:open
```

Open the Playwright HTML report:

```bash
npx playwright show-report
```

The report-generation helper detects a usable Java installation when `JAVA_HOME` is unset or invalid. The Jenkins agent must have Java and Google Chrome installed.

## Authentication Flow

This framework includes a setup project (`auth.setup.ts`) that logs in once and saves browser storage state to `test-e2e/auth.json`.

The browser projects are configured as:

- `setup`: authenticates the test user and saves browser storage state
- `chromium`: runs site smoke tests using saved auth state
- `chromium-no-auth`: runs login tests without cached authentication

## Page Object Model

The page classes are kept under the `pages/` folder.

Example:

- `BasePage_SOLID.ts` contains shared page actions
- `LoginPage_SOLID.ts` contains login selectors and methods such as:
  - `goto()`
  - `isLoaded()`
  - `login(email, password)`
  - `verifyLoginSuccess()`

## Test Example

Tests are under `test-e2e/`:

```bash
test-e2e/login_SOLID.spec.ts
test-e2e/site-smoke.spec.ts
```

The site smoke suite covers the homepage, currency selector, combo gifts category, and customized cake message form. Authentication setup and login tests require valid test credentials.

## Notes

- Do not hardcode usernames or passwords in the codebase.
- Use environment variables or CI/CD secret management instead.
- Keep credentials out of version control.

## Jenkins

The [Jenkinsfile](./Jenkinsfile) uses `npm ci`, runs `npm run test:allure`, and archives Playwright reports, raw Allure results, the generated Allure HTML report, and test artifacts even when tests fail. Configure these Jenkins credentials before running the pipeline:

- `kapruka-base-url` (Secret text)
- `kapruka-test-email` (Secret text)
- `kapruka-test-password` (Secret text)

The Jenkins agent must be a Windows agent (the pipeline uses `bat`) with Node.js, npm, Java, and Google Chrome installed.

## Useful Commands

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run login test in headed Chromium
npm run test:login

# Run all Playwright tests and generate a fresh Allure report
npm run test:allure

# Open the generated Allure report locally
npm run allure:open

# Show Playwright HTML report
npx playwright show-report
```

<img width="1915" height="951" alt="image" src="https://github.com/user-attachments/assets/9b054ba2-3e06-4b06-90f0-e59ed3b78525" />

<img width="1921" height="956" alt="image" src="https://github.com/user-attachments/assets/a1c1d9ec-b1d8-4900-b83f-b55a90968460" />

## License

This project is licensed under ISC.
