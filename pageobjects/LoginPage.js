const BasePage = require('./BasePage');
const logger = require('../utils/logger');

/**
 * Login Page Object
 * Contains all selectors and methods for the Login page
 * @class LoginPage
 * @extends BasePage
 */
class LoginPage extends BasePage {
  /**
   * Get username input field selector
   * @returns {WebdriverIO.Element} Username input element
   */
  get usernameInput() {
    return $('input[name="username"]');
  }

  /**
   * Get password input field selector
   * @returns {WebdriverIO.Element} Password input element
   */
  get passwordInput() {
    return $('input[name="password"]');
  }

  /**
   * Get login button selector
   * @returns {WebdriverIO.Element} Login button element
   */
  get loginButton() {
    return $('button#submit');
  }

  /**
   * Get error message selector
   * @returns {WebdriverIO.Element} Error message element
   */
  get errorMessage() {
    return $('#error');
  }

  /**
   * Get login form selector
   * @returns {WebdriverIO.Element} Login form element
   */
  get loginForm() {
    return $('form[name="login"]');
  }

  /**
   * Get page heading selector
   * @returns {WebdriverIO.Element} Page heading element
   */
  get pageHeading() {
    return $('h1');
  }

  /**
   * Open login page
   * @param {string} url - Login page URL
   * @returns {Promise<void>}
   */
  async openLoginPage(url) {
    try {
      await this.open(url);
      await this.waitForLoginFormDisplayed();
      logger.info('Login page opened successfully');
    } catch (error) {
      logger.error('Failed to open login page', error);
      throw error;
    }
  }

  /**
   * Wait for login form to be displayed
   * @returns {Promise<void>}
   */
  async waitForLoginFormDisplayed() {
    try {
      await this.waitForDisplayed(this.loginForm, this.timeout, 'Login form');
      logger.info('Login form is displayed');
    } catch (error) {
      logger.error('Login form is not displayed', error);
      throw error;
    }
  }

  /**
   * Enter username in username field
   * @param {string} username - Username to enter
   * @returns {Promise<void>}
   */
  async enterUsername(username) {
    try {
      await this.type(this.usernameInput, username, 'username field');
      logger.info(`Username entered: ${username}`);
    } catch (error) {
      logger.error('Failed to enter username', error);
      throw error;
    }
  }

  /**
   * Enter password in password field
   * @param {string} password - Password to enter
   * @returns {Promise<void>}
   */
  async enterPassword(password) {
    try {
      await this.type(this.passwordInput, password, 'password field');
      logger.info('Password entered');
    } catch (error) {
      logger.error('Failed to enter password', error);
      throw error;
    }
  }

  /**
   * Click login button
   * @returns {Promise<void>}
   */
  async clickLoginButton() {
    try {
      await this.click(this.loginButton, 'Login button');
      logger.info('Login button clicked');
    } catch (error) {
      logger.error('Failed to click login button', error);
      throw error;
    }
  }

  /**
   * Login with provided credentials
   * @param {string} username - Username
   * @param {string} password - Password
   * @returns {Promise<void>}
   */
  async login(username, password) {
    try {
      logger.info(`Logging in with username: ${username}`);
      await this.enterUsername(username);
      await this.enterPassword(password);
      await this.clickLoginButton();
      logger.info('Login process completed');
    } catch (error) {
      logger.error('Login process failed', error);
      throw error;
    }
  }

  /**
   * Get error message text
   * @returns {Promise<string>} Error message text
   */
  async getErrorMessage() {
    try {
      await this.waitForDisplayed(this.errorMessage, this.timeout, 'Error message');
      const message = await this.getText(this.errorMessage, 'Error message');
      logger.info(`Error message displayed: ${message}`);
      return message;
    } catch (error) {
      logger.error('Failed to get error message', error);
      throw error;
    }
  }

  /**
   * Check if error message is displayed
   * @returns {Promise<boolean>} True if error message is displayed
   */
  async isErrorMessageDisplayed() {
    try {
      return await this.isDisplayed(this.errorMessage, 'Error message');
    } catch (error) {
      logger.debug('Error message is not displayed');
      return false;
    }
  }

  /**
   * Check if login form is displayed
   * @returns {Promise<boolean>} True if login form is displayed
   */
  async isLoginFormDisplayed() {
    try {
      return await this.isDisplayed(this.loginForm, 'Login form');
    } catch (error) {
      logger.debug('Login form is not displayed');
      return false;
    }
  }

  /**
   * Clear username field
   * @returns {Promise<void>}
   */
  async clearUsernameField() {
    try {
      await this.clear(this.usernameInput, 'username field');
    } catch (error) {
      logger.error('Failed to clear username field', error);
      throw error;
    }
  }

  /**
   * Clear password field
   * @returns {Promise<void>}
   */
  async clearPasswordField() {
    try {
      await this.clear(this.passwordInput, 'password field');
    } catch (error) {
      logger.error('Failed to clear password field', error);
      throw error;
    }
  }

  /**
   * Get page heading text
   * @returns {Promise<string>} Page heading text
   */
  async getPageHeading() {
    try {
      const heading = await this.getText(this.pageHeading, 'Page heading');
      return heading;
    } catch (error) {
      logger.error('Failed to get page heading', error);
      throw error;
    }
  }
}

module.exports = new LoginPage();