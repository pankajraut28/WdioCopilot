# WdioCopilot - WebdriverIO Automation Framework

A comprehensive, production-ready WebdriverIO automation framework with Cucumber BDD, advanced logging, and reporting capabilities.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Reporting](#reporting)
- [Utilities](#utilities)
- [Best Practices](#best-practices)
- [Contributing](#contributing)

## ✨ Features

- **WebdriverIO v8.13** - Latest WebdriverIO with modern APIs
- **Cucumber BDD** - Human-readable test scenarios
- **Multi-Browser Support** - Chrome, Firefox, and more
- **Advanced Logging** - Winston logger with file and console output
- **Allure Reports** - Beautiful HTML test reports
- **Page Object Model** - Maintainable test structure
- **Environment Configuration** - Easy environment switching
- **Screenshot on Failure** - Automatic failure capture
- **Test Hooks** - BeforeAll, Before, After, AfterStep
- **ESLint Integration** - Code quality checks
- **Parallel Execution** - Run tests in parallel

## 📁 Project Structure

```
WdioCopilot/
├── config/
│   └── environment.js          # Environment configuration
├── features/
│   ├── step-definitions/       # Cucumber step implementations
│   ├── hooks.js               # Test lifecycle hooks
│   └── *.feature              # Feature files
├── pageobjects/               # Page Object Models
├── utils/
│   └── logger.js              # Winston logger configuration
├── screenshots/               # Failure screenshots
├── allure-results/            # Test results
├── logs/                      # Test logs
├── wdio.conf.js              # WebdriverIO configuration
├── package.json              # Dependencies
└── README.md                 # This file
```

## 🚀 Installation

### Prerequisites

- Node.js 14.0.0 or higher
- npm 6.0.0 or higher
- Chrome/Firefox browsers installed

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/pankajraut28/WdioCopilot.git
   cd WdioCopilot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your configuration

4. **Verify installation**
   ```bash
   npm test
   ```

## ⚙️ Configuration

### Environment Configuration (config/environment.js)

Manage all environment-specific settings:

```javascript
// Load from .env file
const baseURL = process.env.BASE_URL || 'https://example.com';
const browser = process.env.BROWSER || 'chrome';
const headless = process.env.HEADLESS === 'true';
const timeout = parseInt(process.env.TIMEOUT) || 5000;
```

### WebdriverIO Configuration (wdio.conf.js)

Key configurations:
- Browser capabilities (Chrome, Firefox)
- Parallel execution settings
- Timeouts and retries
- Reporters (Spec, Allure)
- Cucumber options and hooks

### Logging Configuration (utils/logger.js)

Winston logger with:
- Console output
- File logging
- Different log levels
- Timestamp formatting

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run specific browser
```bash
npm run test:chrome      # Chrome
npm run test:firefox     # Firefox
```

### Run in headless mode
```bash
npm run test:headless
```

### Run specific scenarios with tags
```bash
npm run test:smoke       # @smoke tagged tests
npm run test:regression  # @regression tagged tests
```

### Run specific feature file
```bash
npm run test:login       # Run login.feature
```

### Run with custom tags
```bash
wdio run wdio.conf.js --tags "@smoke and not @skip"
```

## ✍️ Writing Tests

### Feature File Example (features/login.feature)

```gherkin
Feature: User Login
  As a user
  I want to login to the application
  So that I can access my account

  @smoke @regression
  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter valid username and password
    And I click the login button
    Then I should see the dashboard

  @regression
  Scenario: Login fails with invalid credentials
    Given I am on the login page
    When I enter invalid username and password
    And I click the login button
    Then I should see an error message
```

### Step Definition Example (features/step-definitions/login.steps.js)

```javascript
const { Given, When, Then } = require('@wdio/cucumber-framework');
const LoginPage = require('../../pageobjects/login.page');

Given('I am on the login page', async () => {
  await LoginPage.open();
});

When('I enter valid username and password', async () => {
  await LoginPage.enterUsername('testuser');
  await LoginPage.enterPassword('password123');
});

When('I click the login button', async () => {
  await LoginPage.clickLoginButton();
});

Then('I should see the dashboard', async () => {
  await expect(LoginPage.dashboardElement).toBeDisplayed();
});
```

### Page Object Example (pageobjects/login.page.js)

```javascript
const BasePage = require('./base.page');

class LoginPage extends BasePage {
  get usernameInput() {
    return $('input[name="username"]');
  }

  get passwordInput() {
    return $('input[name="password"]');
  }

  get loginButton() {
    return $('button[type="submit"]');
  }

  get dashboardElement() {
    return $('.dashboard');
  }

  async open() {
    await super.open('/login');
  }

  async enterUsername(username) {
    await this.usernameInput.setValue(username);
  }

  async enterPassword(password) {
    await this.passwordInput.setValue(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }
}

module.exports = new LoginPage();
```

## 📊 Reporting

### Generate Allure Report

```bash
npm run report:generate
```

### View Allure Report

```bash
npm run report
```

This opens the Allure server at `http://localhost:4040`

### Report Features

- Test execution timeline
- Pass/fail statistics
- Step-by-step details
- Screenshots and attachments
- Failure analysis
- Trend analysis

## 🛠️ Utilities

### Logger Utility (utils/logger.js)

```javascript
const logger = require('../utils/logger');

logger.info('Information message');
logger.warn('Warning message');
logger.error('Error message');
logger.debug('Debug message');
```

### Environment Config (config/environment.js)

```javascript
const EnvironmentConfig = require('../config/environment');

const baseURL = EnvironmentConfig.getBaseURL();
const browser = EnvironmentConfig.getBrowser();
const isHeadless = EnvironmentConfig.isHeadless();
const timeout = EnvironmentConfig.getTimeout();
```

## 📝 Best Practices

### 1. Use Page Object Model
- Encapsulate UI elements in page objects
- Separate test logic from UI interactions
- Easy maintenance and updates

### 2. Write Clear Step Definitions
- Use descriptive step names
- Follow Given-When-Then structure
- Keep steps simple and focused

### 3. Use Tags for Test Organization
```gherkin
@smoke      # Quick sanity tests
@regression # Full regression suite
@skip       # Skip these tests
@critical   # Critical business flow
```

### 4. Logging and Debugging
- Use logger throughout the code
- Log important actions and assertions
- Check logs for debugging failures

### 5. Handle Waits Properly
```javascript
// Use WebdriverIO built-in waits
await element.waitForDisplayed({ timeout: 5000 });
await browser.waitUntil(() => condition, { timeout: 5000 });
```

### 6. Test Independence
- Each test should be independent
- Setup required data in Before hook
- Cleanup in After hook

### 7. Screenshot on Failure
- Automatic in AfterStep hook
- Manually save when needed:
```javascript
await browser.saveScreenshot('./screenshots/manual.png');
```

## 🔄 Continuous Integration

### GitHub Actions Example

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 18
      - run: npm install
      - run: npm test
      - uses: actions/upload-artifact@v2
        if: always()
        with:
          name: allure-results
          path: allure-results
```

## 📚 Additional Resources

- [WebdriverIO Documentation](https://webdriver.io/docs/gettingstarted)
- [Cucumber.js Documentation](https://cucumber.io/docs/cucumber/)
- [Allure Report Documentation](https://docs.qameta.io/allure/)
- [Winston Logger Documentation](https://github.com/winstonjs/winston)

## 🐛 Troubleshooting

### Tests not running
- Check Node.js version: `node --version` (should be 14+)
- Clear node_modules: `rm -rf node_modules && npm install`
- Check browser installation

### Timeouts
- Increase timeout in `.env`: `TIMEOUT=10000`
- Check network connectivity
- Verify application is running

### Screenshots not saving
- Check `./screenshots` directory exists
- Verify write permissions
- Check disk space

### Logs not appearing
- Check log level in logger configuration
- Verify `./logs` directory exists
- Check file permissions

## 📄 License

ISC License - See LICENSE file for details

## 👤 Author

Pankaj Raut - [@pankajraut28](https://github.com/pankajraut28)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ❓ Support

For support, please open an issue on GitHub.

---

**Happy Testing! 🚀**