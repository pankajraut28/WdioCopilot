/**
 * Test Data Module
 * Contains all test data and data generation utilities
 * @module utils/testData
 */

const CONSTANTS = require('./constants');

class TestData {
  /**
   * Get valid login credentials
   * @returns {Object} Valid username and password
   */
  static getValidCredentials() {
    return {
      username: CONSTANTS.TEST_DATA.VALID_USERNAME,
      password: CONSTANTS.TEST_DATA.VALID_PASSWORD,
    };
  }

  /**
   * Get invalid login credentials
   * @returns {Object} Invalid username and password
   */
  static getInvalidCredentials() {
    return {
      username: CONSTANTS.TEST_DATA.INVALID_USERNAME,
      password: CONSTANTS.TEST_DATA.INVALID_PASSWORD,
    };
  }

  /**
   * Get empty credentials
   * @returns {Object} Empty username and password
   */
  static getEmptyCredentials() {
    return {
      username: CONSTANTS.TEST_DATA.EMPTY_STRING,
      password: CONSTANTS.TEST_DATA.EMPTY_STRING,
    };
  }

  /**
   * Get credentials with empty username
   * @returns {Object} Empty username with valid password
   */
  static getEmptyUsernameCredentials() {
    return {
      username: CONSTANTS.TEST_DATA.EMPTY_STRING,
      password: CONSTANTS.TEST_DATA.VALID_PASSWORD,
    };
  }

  /**
   * Get credentials with empty password
   * @returns {Object} Valid username with empty password
   */
  static getEmptyPasswordCredentials() {
    return {
      username: CONSTANTS.TEST_DATA.VALID_USERNAME,
      password: CONSTANTS.TEST_DATA.EMPTY_STRING,
    };
  }

  /**
   * Get invalid username with valid password
   * @returns {Object} Invalid username and valid password
   */
  static getInvalidUsernameCredentials() {
    return {
      username: CONSTANTS.TEST_DATA.INVALID_USERNAME,
      password: CONSTANTS.TEST_DATA.VALID_PASSWORD,
    };
  }

  /**
   * Get valid username with invalid password
   * @returns {Object} Valid username and invalid password
   */
  static getInvalidPasswordCredentials() {
    return {
      username: CONSTANTS.TEST_DATA.VALID_USERNAME,
      password: CONSTANTS.TEST_DATA.INVALID_PASSWORD,
    };
  }

  /**
   * Generate random string
   * @param {number} length - Length of string to generate
   * @returns {string} Random string
   */
  static generateRandomString(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Generate random email
   * @returns {string} Random email address
   */
  static generateRandomEmail() {
    return `testuser_${this.generateRandomString(8)}@example.com`;
  }

  /**
   * Generate random number
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {number} Random number between min and max
   */
  static generateRandomNumber(min = 0, max = 999) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

module.exports = TestData;