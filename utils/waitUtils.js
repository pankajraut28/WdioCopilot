const logger = require('./logger');
const CONSTANTS = require('./constants');

/**
 * Wait Utilities Module
 * Provides enhanced wait methods with better error handling
 * @module utils/waitUtils
 */

class WaitUtils {
  /**
   * Wait for element to be displayed with logging
   * @param {WebdriverIO.Element} element - The element to wait for
   * @param {number} timeout - Timeout in milliseconds
   * @param {string} message - Custom wait message
   * @returns {Promise<void>}
   * @throws {Error} If element is not displayed within timeout
   */
  static async waitForElementDisplayed(element, timeout = CONSTANTS.WAIT_TIMES.MEDIUM, message = '') {
    try {
      await element.waitForDisplayed({ timeout });
      logger.info(`Element displayed successfully${message ? ` - ${message}` : ''}`);
    } catch (error) {
      logger.error(`Element not displayed within ${timeout}ms${message ? ` - ${message}` : ''}`, error);
      throw error;
    }
  }

  /**
   * Wait for element to be clickable with logging
   * @param {WebdriverIO.Element} element - The element to wait for
   * @param {number} timeout - Timeout in milliseconds
   * @param {string} message - Custom wait message
   * @returns {Promise<void>}
   * @throws {Error} If element is not clickable within timeout
   */
  static async waitForElementClickable(element, timeout = CONSTANTS.WAIT_TIMES.MEDIUM, message = '') {
    try {
      await element.waitForClickable({ timeout });
      logger.info(`Element clickable${message ? ` - ${message}` : ''}`);
    } catch (error) {
      logger.error(`Element not clickable within ${timeout}ms${message ? ` - ${message}` : ''}`, error);
      throw error;
    }
  }

  /**
   * Wait for element to exist in DOM
   * @param {WebdriverIO.Element} element - The element to wait for
   * @param {number} timeout - Timeout in milliseconds
   * @param {string} message - Custom wait message
   * @returns {Promise<void>}
   * @throws {Error} If element doesn't exist within timeout
   */
  static async waitForElementExist(element, timeout = CONSTANTS.WAIT_TIMES.MEDIUM, message = '') {
    try {
      await element.waitForExist({ timeout });
      logger.info(`Element exists in DOM${message ? ` - ${message}` : ''}`);
    } catch (error) {
      logger.error(`Element doesn't exist within ${timeout}ms${message ? ` - ${message}` : ''}`, error);
      throw error;
    }
  }

  /**
   * Wait for element to be enabled
   * @param {WebdriverIO.Element} element - The element to wait for
   * @param {number} timeout - Timeout in milliseconds
   * @param {string} message - Custom wait message
   * @returns {Promise<void>}
   * @throws {Error} If element is not enabled within timeout
   */
  static async waitForElementEnabled(element, timeout = CONSTANTS.WAIT_TIMES.MEDIUM, message = '') {
    try {
      await element.waitForEnabled({ timeout });
      logger.info(`Element enabled${message ? ` - ${message}` : ''}`);
    } catch (error) {
      logger.error(`Element not enabled within ${timeout}ms${message ? ` - ${message}` : ''}`, error);
      throw error;
    }
  }

  /**
   * Wait for specific time (use sparingly)
   * @param {number} milliseconds - Time to wait in milliseconds
   * @returns {Promise<void>}
   */
  static async sleep(milliseconds) {
    logger.debug(`Sleeping for ${milliseconds}ms`);
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  /**
   * Wait for URL to change
   * @param {string} expectedUrl - Expected URL or partial URL
   * @param {number} timeout - Timeout in milliseconds
   * @returns {Promise<void>}
   * @throws {Error} If URL doesn't change within timeout
   */
  static async waitForUrlToContain(expectedUrl, timeout = CONSTANTS.WAIT_TIMES.MEDIUM) {
    try {
      await browser.waitUntil(
        async () => {
          const currentUrl = await browser.getUrl();
          return currentUrl.includes(expectedUrl);
        },
        { timeout }
      );
      logger.info(`URL changed to contain: ${expectedUrl}`);
    } catch (error) {
      logger.error(`URL didn't change to contain '${expectedUrl}' within ${timeout}ms`, error);
      throw error;
    }
  }

  /**
   * Wait for multiple elements with retry logic
   * @param {Function} condition - Async function that returns boolean
   * @param {number} timeout - Timeout in milliseconds
   * @param {string} message - Custom message
   * @returns {Promise<boolean>}
   */
  static async waitForCondition(condition, timeout = CONSTANTS.WAIT_TIMES.MEDIUM, message = '') {
    try {
      await browser.waitUntil(condition, { timeout });
      logger.info(`Condition met${message ? ` - ${message}` : ''}`);
      return true;
    } catch (error) {
      logger.error(`Condition not met within ${timeout}ms${message ? ` - ${message}` : ''}`, error);
      throw error;
    }
  }
}

module.exports = WaitUtils;