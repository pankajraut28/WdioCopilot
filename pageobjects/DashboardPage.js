const BasePage = require('./BasePage');
const logger = require('../utils/logger');

/**
 * Dashboard Page Object
 * Contains all selectors and methods for the Dashboard page
 * @class DashboardPage
 * @extends BasePage
 */
class DashboardPage extends BasePage {
  /**
   * Get dashboard heading selector
   * @returns {WebdriverIO.Element} Dashboard heading element
   */
  get dashboardHeading() {
    return $('h1');
  }

  /**
   * Get welcome message selector
   * @returns {WebdriverIO.Element} Welcome message element
   */
  get welcomeMessage() {
    return $('.post-title');
  }

  /**
   * Get logout button selector
   * @returns {WebdriverIO.Element} Logout button element
   */
  get logoutButton() {
    return $('a[href="https://practicetestautomation.com/logout/"]');
  }

  /**
   * Get successful message selector
   * @returns {WebdriverIO.Element} Successful login message element
   */
  get successMessage() {
    return $('strong');
  }

  /**
   * Get dashboard container selector
   * @returns {WebdriverIO.Element} Dashboard container element
   */
  get dashboardContainer() {
    return $('main.site-main');
  }

  /**
   * Verify dashboard is displayed
   * @returns {Promise<boolean>} True if dashboard is displayed
   */
  async verifyDashboard() {
    try {
      const isDisplayed = await this.isDisplayed(
        this.dashboardContainer,
        'Dashboard container'
      );
      if (isDisplayed) {
        logger.info('Dashboard verified successfully');
      } else {
        logger.warn('Dashboard container is not displayed');
      }
      return isDisplayed;
    } catch (error) {
      logger.error('Failed to verify dashboard', error);
      return false;
    }
  }

  /**
   * Get dashboard title/heading
   * @returns {Promise<string>} Dashboard title text
   */
  async getDashboardTitle() {
    try {
      await this.waitForDisplayed(this.dashboardHeading, this.timeout, 'Dashboard heading');
      const title = await this.getText(this.dashboardHeading, 'Dashboard heading');
      logger.info(`Dashboard title: ${title}`);
      return title;
    } catch (error) {
      logger.error('Failed to get dashboard title', error);
      throw error;
    }
  }

  /**
   * Get welcome message text
   * @returns {Promise<string>} Welcome message text
   */
  async getWelcomeMessage() {
    try {
      await this.waitForDisplayed(this.welcomeMessage, this.timeout, 'Welcome message');
      const message = await this.getText(this.welcomeMessage, 'Welcome message');
      logger.info(`Welcome message: ${message}`);
      return message;
    } catch (error) {
      logger.error('Failed to get welcome message', error);
      throw error;
    }
  }

  /**
   * Get success message text
   * @returns {Promise<string>} Success message text
   */
  async getSuccessMessage() {
    try {
      await this.waitForDisplayed(this.successMessage, this.timeout, 'Success message');
      const message = await this.getText(this.successMessage, 'Success message');
      logger.info(`Success message: ${message}`);
      return message;
    } catch (error) {
      logger.error('Failed to get success message', error);
      throw error;
    }
  }

  /**
   * Check if dashboard is displayed
   * @returns {Promise<boolean>} True if dashboard is displayed
   */
  async isDashboardDisplayed() {
    try {
      return await this.isDisplayed(this.dashboardContainer, 'Dashboard container');
    } catch (error) {
      logger.debug('Dashboard is not displayed');
      return false;
    }
  }

  /**
   * Check if logout button is displayed
   * @returns {Promise<boolean>} True if logout button is displayed
   */
  async isLogoutButtonDisplayed() {
    try {
      return await this.isDisplayed(this.logoutButton, 'Logout button');
    } catch (error) {
      logger.debug('Logout button is not displayed');
      return false;
    }
  }

  /**
   * Click logout button
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      await this.click(this.logoutButton, 'Logout button');
      logger.info('Logout button clicked');
    } catch (error) {
      logger.error('Failed to click logout button', error);
      throw error;
    }
  }

  /**
   * Get page URL
   * @returns {Promise<string>} Current page URL
   */
  async getCurrentUrl() {
    try {
      const url = await this.getPageUrl();
      return url;
    } catch (error) {
      logger.error('Failed to get current URL', error);
      throw error;
    }
  }
}

module.exports = new DashboardPage();