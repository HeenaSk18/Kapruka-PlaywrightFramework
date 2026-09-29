# Kapruka Playwright Framework

This project is a Playwright-based end-to-end test automation framework for the Kapruka web application. It follows a Page Object Model (POM) structure and includes a setup flow for authenticated sessions.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- dotenv for environment configuration
- HTML report generation

## Project Structure

```bash
.
├── config/
│   └── .env.qa                 # Local environment file (gitignored)
├── fixtures/
├── pages/
│   ├── BasePage_SOLID.ts
│   └── LoginPage_SOLID.ts
├── test-e2e/
│   ├── auth.setup.ts
│   ├── auth.json               # Stored browser auth state
│   └── login_SOLID.spec.ts
├── .gitignore
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── README.md
└── node_modules/
```

## Prerequisites

Before running the tests, make sure you have:

- Node.js 18+ installed
- npm installed
- Chrome or Chromium available on the machine
- Valid test credentials for the target environment

## Installation

```bash
npm install
```

## Environment Configuration

The project loads environment values from a file named like:

```bash
config/.env.qa
```

Example:

```env
TEST_ENV=qa
BASE_URL=https://example.kapruka.com
TEST_EMAIL=your_email@example.com
TEST_PASSWORD=your_secure_password
```

Notes:

- `.env` files are ignored by Git for security.
- `TEST_ENV` defaults to `qa` if not set.
- `BASE_URL` is used by Playwright in `playwright.config.ts`.
- `TEST_EMAIL` and `TEST_PASSWORD` are required for login tests.

## Running Tests

Run all tests:

```bash
npm test
```

Run the login test only:

```bash
npm run test:login
```

Run a specific Playwright command manually:

```bash
npx playwright test
```

Open the HTML report:

```bash
npx playwright show-report
```

## Authentication Flow

This framework includes a setup project (`auth.setup.ts`) that logs in once and saves browser storage state to `test-e2e/auth.json`.

The browser projects are configured as:

- `setup`: authenticates the user
- `chromium`: runs tests using saved auth state
- `chromium-no-auth`: runs tests that specifically validate the login flow without cached login

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

The main login test is in:

```bash
test-e2e/login_SOLID.spec.ts
```

It validates that a valid user can log in successfully using the environment variables.

## Notes

- Do not hardcode usernames or passwords in the codebase.
- Use environment variables or CI/CD secret management instead.
- Keep credentials out of version control.

## Useful Commands

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run login test in headed Chromium
npm run test:login

# Show Playwright HTML report
npx playwright show-report
```

<img width="1621" height="1016" alt="image" src="https://github.com/user-attachments/assets/16f5d940-fcbe-476b-9c4a-4d1383f041df" />

<img width="1915" height="951" alt="image" src="https://github.com/user-attachments/assets/9b054ba2-3e06-4b06-90f0-e59ed3b78525" />

<img width="1921" height="956" alt="image" src="https://github.com/user-attachments/assets/a1c1d9ec-b1d8-4900-b83f-b55a90968460" />

## License

This project is licensed under ISC.
