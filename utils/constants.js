/**
 * Constants Module
 * Centralized storage of all constant values used throughout the framework
 * @module utils/constants
 */

const CONSTANTS = {
  // Wait times (in milliseconds)
  WAIT_TIMES: {
    SHORT: 3000,
    MEDIUM: 5000,
    LONG: 10000,
    EXTRA_LONG: 15000,
  },

  // Test data
  TEST_DATA: {
    VALID_USERNAME: 'student',
    VALID_PASSWORD: 'Password123',
    INVALID_USERNAME: 'invalid_user',
    INVALID_PASSWORD: 'WrongPassword123',
    EMPTY_STRING: '',
  },

  // Error messages
  ERROR_MESSAGES: {
    INVALID_CREDENTIALS: 'Your username is invalid!',
    INVALID_PASSWORD: 'Your password is invalid!',
    ELEMENT_NOT_FOUND: 'Element not found or not visible',
    ELEMENT_NOT_CLICKABLE: 'Element is not clickable',
    ELEMENT_NOT_DISPLAYED: 'Element is not displayed',
  },

  // Page titles and URLs
  PAGE_URLS: {
    LOGIN: 'https://practicetestautomation.com/practice-test-login/',
    DASHBOARD: 'https://practicetestautomation.com/logged-in-successfully/',
  },

  // Page element identifiers
  PAGE_ELEMENTS: {
    LOGIN_PAGE_TITLE: 'Test Login | Practice Test Automation',
    DASHBOARD_TITLE: 'Logged In Successfully | Practice Test Automation',
  },

  // Retry and timeout settings
  RETRY: {
    MAX_ATTEMPTS: 3,
    INITIAL_DELAY: 1000,
  },

  // Browser capabilities
  BROWSER_CONFIG: {
    CHROME: 'chrome',
    FIREFOX: 'firefox',
  },

  // Screenshot settings
  SCREENSHOT: {
    ON_FAILURE: true,
    PATH: './screenshots',
  },

  // Allure report settings
  ALLURE: {
    RESULTS_DIR: 'allure-results',
    REPORT_DIR: 'allure-report',
  },
};

module.exports = CONSTANTS;