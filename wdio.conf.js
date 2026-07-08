const EnvironmentConfig = require('./config/environment');

/**
 * WebdriverIO Configuration File
 * Configures browser, services, reporters, and test execution settings
 * @module wdio.conf
 */

exports.config = {
  /**
   * Runner configurations
   */
  runner: 'local',

  /**
   * Port to use by default for the webdriverclient log level
   */
  port: 4444,

  /**
   * Specs to run
   */
  specs: ['./features/**/*.feature'],

  /**
   * Maximum number of total parallel testsuites allowed to run in parallel by the test runner
   */
  maxInstances: 2,

  /**
   * Maximum instances per capability
   */
  maxInstancesPerCapability: 1,

  /**
   * Browser capabilities
   */
  capabilities: [
    {
      maxInstances: 1,
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: EnvironmentConfig.isHeadless() ? ['--headless', '--disable-gpu'] : [],
        excludeSwitches: ['enable-automation'],
        useAutomationExtension: false,
      },
    },
    {
      maxInstances: 1,
      browserName: 'firefox',
      'moz:firefoxOptions': {
        args: EnvironmentConfig.isHeadless() ? ['-headless'] : [],
      },
    },
  ],

  /**
   * Logging level of webdriver package
   */
  logLevel: 'info',

  /**
   * Bail on first failure
   */
  bail: 0,

  /**
   * Base URL for test execution
   */
  baseUrl: EnvironmentConfig.getBaseURL(),

  /**
   * Default wait time for elements
   */
  waitforTimeout: EnvironmentConfig.getTimeout(),

  /**
   * Connection retry timeout
   */
  connectionRetryTimeout: 120000,

  /**
   * Connection retry count
   */
  connectionRetryCount: 3,

  /**
   * Framework
   */
  framework: 'cucumber',

  /**
   * Cucumber framework configuration
   */
  cucumberOpts: {
    require: ['./features/step-definitions/**/*.js', './features/hooks.js'],
    backtrace: false,
    requireModule: ['@babel/register'],
    dryRun: false,
    failFast: false,
    format: [
      'progress-bar',
      'json:./allure-results/cucumber_report.json',
    ],
    parallel: 2,
    strict: true,
    snippetInterface: 'async-await',
    tagExpression: process.env.TAGS || '',
  },

  /**
   * Services
   */
  services: [
    [
      'chromedriver',
      {
        logFileName: './logs/chromedriver.log',
        outputDir: './logs',
      },
    ],
  ],

  /**
   * Reporters configuration
   */
  reporters: [
    ['spec', {
      outputDir: './logs',
    }],
    ['allure', {
      outputDir: './allure-results',
      disableWebdriverStepsReporting: false,
      disableWebdriverScreenshotsReporting: false,
      useCucumberStepReporter: true,
    }],
  ],

  /**
   * On prepare hook
   */
  onPrepare: async () => {
    // Setup code before test execution
    console.log('\n========================================');
    console.log('Preparing WebdriverIO Test Execution');
    console.log('========================================\n');
  },

  /**
   * On complete hook
   */
  onComplete: async () => {
    // Cleanup code after test execution
    console.log('\n========================================');
    console.log('Test Execution Completed');
    console.log('========================================\n');
  },

  /**
   * On worker start hook
   */
  onWorkerStart: async () => {
    console.log('Worker started');
  },

  /**
   * On worker end hook
   */
  onWorkerEnd: async () => {
    console.log('Worker ended');
  },
};