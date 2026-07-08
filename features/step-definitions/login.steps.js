const { Given, When, Then } = require('@wdio/cucumber-framework');
const loginPage = require('../../pageobjects/LoginPage');
const dashboardPage = require('../../pageobjects/DashboardPage');
const EnvironmentConfig = require('../../config/environment');
const TestData = require('../../utils/testData');
const logger = require('../../utils/logger');
const { expect } = require('expect-webdriverio');

/**
 * Login Feature Step Definitions
 * Contains step implementations for login scenarios
 * @module features/step-definitions/login.steps
 */

Given('user launches the application', async () => {
  try {
    const baseUrl = EnvironmentConfig.getBaseURL();
    logger.info(`Launching application: ${baseUrl}`);
    await loginPage.openLoginPage(baseUrl);
    await expect(loginPage.loginForm).toBeDisplayed();
    logger.info('Application launched successfully');
  } catch (error) {
    logger.error('Failed to launch application', error);
    throw error;
  }
});

When('user logs in with valid credentials', async () => {
  try {
    const credentials = EnvironmentConfig.getTestCredentials();
    logger.info('Logging in with valid credentials');
    await loginPage.login(credentials.username, credentials.password);
    await browser.waitUntil(
      async () => {
        const url = await browser.getUrl();
        return url.includes('logged-in-successfully');
      },
      { timeout: 10000 }
    );
    logger.info('Login with valid credentials successful');
  } catch (error) {
    logger.error('Failed to login with valid credentials', error);
    throw error;
  }
});

When('user logs in using {string} and {string}', async (username, password) => {
  try {
    logger.info(`Logging in with username: ${username}, password: ${password}`);
    await loginPage.login(username, password);
    logger.info('Login attempt completed');
  } catch (error) {
    logger.error('Failed to login', error);
    throw error;
  }
});

Then('dashboard should be displayed', async () => {
  try {
    logger.info('Verifying dashboard is displayed');
    const isDashboardDisplayed = await dashboardPage.verifyDashboard();
    await expect(dashboardPage.dashboardContainer).toBeDisplayed();
    logger.info('Dashboard verification passed');
  } catch (error) {
    logger.error('Dashboard verification failed', error);
    throw error;
  }
});

Then('{string} should be displayed', async (expectedMessage) => {
  try {
    logger.info(`Verifying error message: "${expectedMessage}"`);
    await expect(loginPage.errorMessage).toBeDisplayed();
    const actualMessage = await loginPage.getErrorMessage();
    await expect(actualMessage).toContain(expectedMessage);
    logger.info(`Error message verification passed: "${actualMessage}"`);
  } catch (error) {
    logger.error(`Error message verification failed: Expected "${expectedMessage}"`, error);
    throw error;
  }
});