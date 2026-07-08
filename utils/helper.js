const logger = require('./logger');

/**
 * Helper Utilities Module
 * Provides common helper methods for test execution
 * @module utils/helper
 */

class Helper {
  /**
   * Get current timestamp
   * @returns {string} Formatted timestamp
   */
  static getTimestamp() {
    return new Date().toISOString().replace(/[:.]/g, '-');
  }

  /**
   * Get screenshot filename with timestamp
   * @param {string} prefix - Filename prefix
   * @returns {string} Filename with timestamp
   */
  static getScreenshotFilename(prefix = 'screenshot') {
    return `${prefix}_${this.getTimestamp()}.png`;
  }

  /**
   * Format log message with context
   * @param {string} message - Log message
   * @param {string} context - Additional context
   * @returns {string} Formatted message
   */
  static formatLogMessage(message, context = '') {
    return context ? `[${context}] ${message}` : message;
  }

  /**
   * Check if element is visible on page
   * @param {WebdriverIO.Element} element - The element to check
   * @returns {Promise<boolean>} True if element is visible
   */
  static async isElementVisible(element) {
    try {
      return await element.isDisplayed();
    } catch (error) {
      logger.debug('Element is not visible or not found');
      return false;
    }
  }

  /**
   * Check if element exists in DOM
   * @param {WebdriverIO.Element} element - The element to check
   * @returns {Promise<boolean>} True if element exists
   */
  static async isElementPresent(element) {
    try {
      return await element.isExisting();
    } catch (error) {
      logger.debug('Element does not exist in DOM');
      return false;
    }
  }

  /**
   * Get element text safely
   * @param {WebdriverIO.Element} element - The element
   * @returns {Promise<string>} Element text content
   */
  static async getElementText(element) {
    try {
      const text = await element.getText();
      return text.trim();
    } catch (error) {
      logger.error('Failed to get element text', error);
      return '';
    }
  }

  /**
   * Get element attribute value safely
   * @param {WebdriverIO.Element} element - The element
   * @param {string} attributeName - Attribute name
   * @returns {Promise<string>} Attribute value
   */
  static async getElementAttribute(element, attributeName) {
    try {
      return await element.getAttribute(attributeName);
    } catch (error) {
      logger.error(`Failed to get attribute '${attributeName}'`, error);
      return '';
    }
  }

  /**
   * Execute async script
   * @param {Function} script - Script to execute
   * @param {Array} args - Script arguments
   * @returns {Promise<*>} Script result
   */
  static async executeScript(script, args = []) {
    try {
      return await browser.executeScript(script, args);
    } catch (error) {
      logger.error('Failed to execute script', error);
      throw error;
    }
  }

  /**
   * Execute async script
   * @param {Function} script - Async script to execute
   * @param {Array} args - Script arguments
   * @returns {Promise<*>} Script result
   */
  static async executeAsyncScript(script, args = []) {
    try {
      return await browser.executeAsyncScript(script, args);
    } catch (error) {
      logger.error('Failed to execute async script', error);
      throw error;
    }
  }

  /**
   * Parse JSON string safely
   * @param {string} jsonString - JSON string to parse
   * @returns {Object|null} Parsed object or null
   */
  static parseJSON(jsonString) {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      logger.error('Failed to parse JSON', error);
      return null;
    }
  }

  /**
   * Retry function with exponential backoff
   * @param {Function} fn - Function to retry
   * @param {number} maxAttempts - Maximum number of attempts
   * @param {number} delay - Initial delay in milliseconds
   * @returns {Promise<*>} Function result
   */
  static async retry(fn, maxAttempts = 3, delay = 1000) {
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        logger.debug(`Attempt ${attempt}/${maxAttempts}`);
        return await fn();
      } catch (error) {
        lastError = error;
        if (attempt < maxAttempts) {
          logger.debug(`Retry after ${delay}ms`);
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2; // Exponential backoff
        }
      }
    }
    throw lastError;
  }
}

module.exports = Helper;