const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

/**
 * Environment Configuration Module
 * Centralized management of all environment variables
 * @module config/environment
 */
class EnvironmentConfig {
  constructor() {
    this.config = {
      baseURL: process.env.BASE_URL || 'https://practicetestautomation.com/practice-test-login/',
      username: process.env.USERNAME || 'student',
      password: process.env.PASSWORD || 'Password123',
      browser: process.env.BROWSER || 'chrome',
      headless: process.env.HEADLESS === 'true',
      timeout: parseInt(process.env.TIMEOUT || '10000', 10),
      allureReportDir: process.env.ALLURE_REPORT_DIR || 'allure-results',
    };
    this.validateConfig();
  }

  /**
   * Validate required configuration values
   * @throws {Error} If required configuration is missing
   */
  validateConfig() {
    const requiredFields = ['baseURL', 'timeout'];
    const missing = requiredFields.filter(field => !this.config[field]);

    if (missing.length > 0) {
      throw new Error(`Missing required configuration: ${missing.join(', ')}`);
    }
  }

  /**
   * Get configuration value by key
   * @param {string} key - Configuration key
   * @returns {*} Configuration value
   */
  get(key) {
    return this.config[key];
  }

  /**
   * Get all configuration values
   * @returns {Object} Complete configuration object
   */
  getAll() {
    return { ...this.config };
  }

  /**
   * Get base URL
   * @returns {string} Base URL of application under test
   */
  getBaseURL() {
    return this.config.baseURL;
  }

  /**
   * Get browser name
   * @returns {string} Browser name (chrome, firefox, etc.)
   */
  getBrowser() {
    return this.config.browser;
  }

  /**
   * Check if headless mode is enabled
   * @returns {boolean} True if headless mode is enabled
   */
  isHeadless() {
    return this.config.headless;
  }

  /**
   * Get timeout value
   * @returns {number} Timeout in milliseconds
   */
  getTimeout() {
    return this.config.timeout;
  }

  /**
   * Get test credentials
   * @returns {Object} Object containing username and password
   */
  getTestCredentials() {
    return {
      username: this.config.username,
      password: this.config.password,
    };
  }
}

module.exports = new EnvironmentConfig();