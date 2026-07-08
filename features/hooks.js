const { Before, After, BeforeAll, AfterAll, AfterStep } = require('@wdio/cucumber-framework');
const logger = require('../utils/logger');
const EnvironmentConfig = require('../config/environment');
const path = require('path');
const fs = require('fs');

/**
 * Test Hooks
 * Handles setup and teardown for test execution
 * @module features/hooks
 */

/**
 * BeforeAll Hook
 * Runs once before all scenarios
 */
BeforeAll(async () => {
  try {
    logger.info('========================================');
    logger.info('Starting Test Execution Suite');
    logger.info('========================================');
    logger.info(`Browser: ${EnvironmentConfig.getBrowser()}`);
    logger.info(`Headless Mode: ${EnvironmentConfig.isHeadless()}`);
    logger.info(`Base URL: ${EnvironmentConfig.getBaseURL()}`);
    logger.info(`Timeout: ${EnvironmentConfig.getTimeout()}ms`);
    logger.info('========================================');
  } catch (error) {
    logger.error('Error in BeforeAll hook', error);
  }
});

/**
 * Before Hook
 * Runs before each scenario
 */
Before(async () => {
  try {
    logger.info('------- Scenario Start -------');
    
    // Maximize browser window
    logger.info('Maximizing browser window');
    const windowSize = await browser.getWindowSize();
    logger.info(`Current window size: ${windowSize.width}x${windowSize.height}`);
    
    if (process.platform !== 'darwin') {
      await browser.maximizeWindow();
    }
    
    // Clear all cookies
    logger.info('Clearing browser cookies');
    await browser.deleteAllCookies();
    
    // Clear local storage
    logger.info('Clearing local storage');
    await browser.executeScript('window.localStorage.clear();');
    
    // Clear session storage
    logger.info('Clearing session storage');
    await browser.executeScript('window.sessionStorage.clear();');
    
    logger.info('Browser setup completed');
  } catch (error) {
    logger.error('Error in Before hook', error);
  }
});

/**
 * AfterStep Hook
 * Runs after each step
 * Takes screenshot on step failure
 */
AfterStep(async ({ step, result }) => {
  try {
    if (result.status === 'failed') {
      logger.warn(`Step failed: ${step.text}`);
      
      // Take screenshot on failure
      try {
        const screenshotDir = './screenshots';
        if (!fs.existsSync(screenshotDir)) {
          fs.mkdirSync(screenshotDir, { recursive: true });
        }
        
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const screenshotName = `failure_${timestamp}.png`;
        const screenshotPath = path.join(screenshotDir, screenshotName);
        
        await browser.saveScreenshot(screenshotPath);
        logger.info(`Screenshot saved: ${screenshotPath}`);
        
        // Attach screenshot to Allure report
        try {
          const allure = require('allure-commandline');
          if (allure) {
            const screenshotBuffer = fs.readFileSync(screenshotPath);
            browser.allure.addAttachment('Failure Screenshot', screenshotBuffer, 'image/png');
          }
        } catch (allureError) {
          logger.debug('Allure attachment not available');
        }
      } catch (screenshotError) {
        logger.error('Failed to take screenshot on failure', screenshotError);
      }
    }
  } catch (error) {
    logger.error('Error in AfterStep hook', error);
  }
});

/**
 * After Hook
 * Runs after each scenario
 * Handles cleanup and browser closure
 */
After(async ({ result }) => {
  try {
    logger.info(`Scenario result: ${result.status}`);
    
    if (result.status === 'failed') {
      logger.error('Scenario failed');
      
      // Take final screenshot on scenario failure
      try {
        const screenshotDir = './screenshots';
        if (!fs.existsSync(screenshotDir)) {
          fs.mkdirSync(screenshotDir, { recursive: true });
        }
        
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const screenshotName = `scenario_failure_${timestamp}.png`;
        const screenshotPath = path.join(screenshotDir, screenshotName);
        
        await browser.saveScreenshot(screenshotPath);
        logger.info(`Scenario failure screenshot saved: ${screenshotPath}`);
      } catch (screenshotError) {
        logger.error('Failed to take scenario failure screenshot', screenshotError);
      }
    } else if (result.status === 'passed') {
      logger.info('Scenario passed successfully');
    }
    
    // Delete cookies after scenario
    logger.info('Clearing cookies after scenario');
    await browser.deleteAllCookies();
    
    logger.info('------- Scenario End -------');
  } catch (error) {
    logger.error('Error in After hook', error);
  }
});

/**
 * AfterAll Hook
 * Runs once after all scenarios
 */
AfterAll(async () => {
  try {
    logger.info('========================================');
    logger.info('Test Execution Suite Completed');
    logger.info('========================================');
    logger.info('Performing final cleanup');
    
    // Close all windows
    logger.info('Closing browser');
    const handles = await browser.getWindowHandles();
    for (const handle of handles) {
      await browser.switchToWindow(handle);
      await browser.closeWindow();
    }
    
    logger.info('Browser closed successfully');
  } catch (error) {
    logger.error('Error in AfterAll hook', error);
  }
});