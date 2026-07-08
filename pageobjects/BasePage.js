const logger = require('../utils/logger');
const WaitUtils = require('../utils/waitUtils');
const Helper = require('../utils/helper');
const CONSTANTS = require('../utils/constants');

/**
 * Base Page Object
 * Contains reusable methods for all page objects
 * All page objects should extend this class
 * @class BasePage
 */
class BasePage {
  /**
   * BasePage constructor
   */
  constructor() {
    this.timeout = CONSTANTS.WAIT_TIMES.MEDIUM;
  }

  /**
   * Open application URL
   * @param {string} url - URL to navigate to
   * @returns {Promise<void>}
   */
  async open(url) {
    try {
      logger.info(`Opening URL: ${url}`);
      await browser.navigateTo(url);
      await this.waitForPageLoad();
    } catch (error) {
      logger.error(`Failed to open URL: ${url}`, error);
      throw error;
    }
  }

  /**
   * Wait for page to load completely
   * @returns {Promise<void>}
   */
  async waitForPageLoad() {
    try {
      await browser.waitUntil(
        async () => {
          const readyState = await browser.executeScript(() => document.readyState);
          return readyState === 'complete';
        },
        { timeout: this.timeout }
      );
      logger.debug('Page loaded successfully');
    } catch (error) {
      logger.error('Page load timeout', error);
      throw error;
    }
  }

  /**
   * Click on element
   * @param {WebdriverIO.Element} element - Element to click
   * @param {string} description - Element description for logging
   * @returns {Promise<void>}
   */
  async click(element, description = 'element') {
    try {
      await WaitUtils.waitForElementClickable(element, this.timeout, description);
      await element.click();
      logger.info(`Clicked on ${description}`);
    } catch (error) {
      logger.error(`Failed to click on ${description}`, error);
      throw error;
    }
  }

  /**
   * Type text into element
   * @param {WebdriverIO.Element} element - Element to type into
   * @param {string} text - Text to type
   * @param {string} description - Element description for logging
   * @returns {Promise<void>}
   */
  async type(element, text, description = 'element') {
    try {
      await WaitUtils.waitForElementDisplayed(element, this.timeout, description);
      await element.setValue(text);
      logger.info(`Typed "${text}" into ${description}`);
    } catch (error) {
      logger.error(`Failed to type into ${description}`, error);
      throw error;
    }
  }

  /**
   * Clear element value
   * @param {WebdriverIO.Element} element - Element to clear
   * @param {string} description - Element description for logging
   * @returns {Promise<void>}
   */
  async clear(element, description = 'element') {
    try {
      await WaitUtils.waitForElementDisplayed(element, this.timeout, description);
      await element.clearValue();
      logger.info(`Cleared value from ${description}`);
    } catch (error) {
      logger.error(`Failed to clear ${description}`, error);
      throw error;
    }
  }

  /**
   * Clear and type text (for input fields that might have existing value)
   * @param {WebdriverIO.Element} element - Element to clear and type into
   * @param {string} text - Text to type
   * @param {string} description - Element description for logging
   * @returns {Promise<void>}
   */
  async clearAndType(element, text, description = 'element') {
    try {
      await this.clear(element, description);
      await this.type(element, text, description);
    } catch (error) {
      logger.error(`Failed to clear and type into ${description}`, error);
      throw error;
    }
  }

  /**
   * Get element text
   * @param {WebdriverIO.Element} element - Element to get text from
   * @param {string} description - Element description for logging
   * @returns {Promise<string>} Element text
   */
  async getText(element, description = 'element') {
    try {
      await WaitUtils.waitForElementDisplayed(element, this.timeout, description);
      const text = await element.getText();
      logger.info(`Got text from ${description}: "${text}"`);
      return text.trim();
    } catch (error) {
      logger.error(`Failed to get text from ${description}`, error);
      throw error;
    }
  }

  /**
   * Check if element is displayed
   * @param {WebdriverIO.Element} element - Element to check
   * @param {string} description - Element description for logging
   * @returns {Promise<boolean>} True if element is displayed
   */
  async isDisplayed(element, description = 'element') {
    try {
      const displayed = await element.isDisplayed();
      logger.info(`${description} is ${displayed ? 'displayed' : 'not displayed'}`);
      return displayed;
    } catch (error) {
      logger.debug(`${description} is not displayed or not found`);
      return false;
    }
  }

  /**
   * Check if element is enabled
   * @param {WebdriverIO.Element} element - Element to check
   * @param {string} description - Element description for logging
   * @returns {Promise<boolean>} True if element is enabled
   */
  async isEnabled(element, description = 'element') {
    try {
      const enabled = await element.isEnabled();
      logger.info(`${description} is ${enabled ? 'enabled' : 'disabled'}`);
      return enabled;
    } catch (error) {
      logger.debug(`Failed to check if ${description} is enabled`);
      return false;
    }
  }

  /**
   * Scroll element into view
   * @param {WebdriverIO.Element} element - Element to scroll to
   * @param {string} description - Element description for logging
   * @returns {Promise<void>}
   */
  async scrollIntoView(element, description = 'element') {
    try {
      await element.scrollIntoView();
      logger.info(`Scrolled ${description} into view`);
    } catch (error) {
      logger.error(`Failed to scroll ${description} into view`, error);
      throw error;
    }
  }

  /**
   * Select option by visible text
   * @param {WebdriverIO.Element} element - Select element
   * @param {string} text - Visible text of option
   * @param {string} description - Element description for logging
   * @returns {Promise<void>}
   */
  async selectByVisibleText(element, text, description = 'select element') {
    try {
      await WaitUtils.waitForElementDisplayed(element, this.timeout, description);
      await element.selectByVisibleText(text);
      logger.info(`Selected option "${text}" from ${description}`);
    } catch (error) {
      logger.error(`Failed to select option "${text}" from ${description}`, error);
      throw error;
    }
  }

  /**
   * Take screenshot
   * @param {string} filename - Filename for screenshot
   * @returns {Promise<string>} Screenshot file path
   */
  async takeScreenshot(filename = '') {
    try {
      const screenshotName = filename || Helper.getScreenshotFilename('screenshot');
      const path = `./screenshots/${screenshotName}`;
      await browser.saveScreenshot(path);
      logger.info(`Screenshot taken: ${path}`);
      return path;
    } catch (error) {
      logger.error('Failed to take screenshot', error);
      throw error;
    }
  }

  /**
   * Get page URL
   * @returns {Promise<string>} Current page URL
   */
  async getPageUrl() {
    try {
      const url = await browser.getUrl();
      logger.info(`Current URL: ${url}`);
      return url;
    } catch (error) {
      logger.error('Failed to get page URL', error);
      throw error;
    }
  }

  /**
   * Get page title
   * @returns {Promise<string>} Page title
   */
  async getPageTitle() {
    try {
      const title = await browser.getTitle();
      logger.info(`Page title: ${title}`);
      return title;
    } catch (error) {
      logger.error('Failed to get page title', error);
      throw error;
    }
  }

  /**
   * Wait for element to be displayed
   * @param {WebdriverIO.Element} element - Element to wait for
   * @param {number} timeout - Timeout in milliseconds
   * @param {string} description - Element description for logging
   * @returns {Promise<void>}
   */
  async waitForDisplayed(element, timeout = this.timeout, description = 'element') {
    try {
      await WaitUtils.waitForElementDisplayed(element, timeout, description);
    } catch (error) {
      logger.error(`${description} was not displayed within ${timeout}ms`, error);
      throw error;
    }
  }

  /**
   * Wait for element to be clickable
   * @param {WebdriverIO.Element} element - Element to wait for
   * @param {number} timeout - Timeout in milliseconds
   * @param {string} description - Element description for logging
   * @returns {Promise<void>}
   */
  async waitForClickable(element, timeout = this.timeout, description = 'element') {
    try {
      await WaitUtils.waitForElementClickable(element, timeout, description);
    } catch (error) {
      logger.error(`${description} was not clickable within ${timeout}ms`, error);
      throw error;
    }
  }

  /**
   * Double click on element
   * @param {WebdriverIO.Element} element - Element to double click
   * @param {string} description - Element description for logging
   * @returns {Promise<void>}
   */
  async doubleClick(element, description = 'element') {
    try {
      await WaitUtils.waitForElementClickable(element, this.timeout, description);
      await element.doubleClick();
      logger.info(`Double clicked on ${description}`);
    } catch (error) {
      logger.error(`Failed to double click on ${description}`, error);
      throw error;
    }
  }

  /**
   * Right click on element
   * @param {WebdriverIO.Element} element - Element to right click
   * @param {string} description - Element description for logging
   * @returns {Promise<void>}
   */
  async rightClick(element, description = 'element') {
    try {
      await WaitUtils.waitForElementClickable(element, this.timeout, description);
      await element.click({ button: 2 });
      logger.info(`Right clicked on ${description}`);
    } catch (error) {
      logger.error(`Failed to right click on ${description}`, error);
      throw error;
    }
  }

  /**
   * Hover over element
   * @param {WebdriverIO.Element} element - Element to hover over
   * @param {string} description - Element description for logging
   * @returns {Promise<void>}
   */
  async hover(element, description = 'element') {
    try {
      await WaitUtils.waitForElementDisplayed(element, this.timeout, description);
      await element.moveTo();
      logger.info(`Hovered over ${description}`);
    } catch (error) {
      logger.error(`Failed to hover over ${description}`, error);
      throw error;
    }
  }

  /**
   * Check if element has attribute
   * @param {WebdriverIO.Element} element - Element to check
   * @param {string} attributeName - Attribute name
   * @param {string} description - Element description for logging
   * @returns {Promise<string|null>} Attribute value or null
   */
  async getAttribute(element, attributeName, description = 'element') {
    try {
      const value = await element.getAttribute(attributeName);
      logger.info(`Got attribute "${attributeName}" from ${description}: "${value}"`);
      return value;
    } catch (error) {
      logger.error(`Failed to get attribute "${attributeName}" from ${description}`, error);
      return null;
    }
  }
}

module.exports = BasePage;