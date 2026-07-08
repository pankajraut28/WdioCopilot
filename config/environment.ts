import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Environment Configuration
 * Manages all environment-specific settings for the test framework
 * @module config/environment
 */

interface EnvironmentConfig {
  baseURL: string;
  appPath: string;
  deviceName: string;
  platformVersion: string;
  automationName: string;
  platformName: string;
  appPackage: string;
  appActivity: string;
  timeout: number;
  isHeadless: boolean;
  logLevel: string;
  appiumServerUrl: string;
}

class Environment {
  private config: EnvironmentConfig;

  constructor() {
    this.config = {
      baseURL: process.env.BASE_URL || 'http://localhost:4723',
      appPath: process.env.APP_PATH || './app/app-release.apk',
      deviceName: process.env.DEVICE_NAME || 'Android Emulator',
      platformVersion: process.env.PLATFORM_VERSION || '11',
      automationName: process.env.AUTOMATION_NAME || 'UiAutomator2',
      platformName: process.env.PLATFORM_NAME || 'Android',
      appPackage: process.env.APP_PACKAGE || 'com.example.app',
      appActivity: process.env.APP_ACTIVITY || '.MainActivity',
      timeout: parseInt(process.env.TIMEOUT || '10000'),
      isHeadless: process.env.HEADLESS === 'true',
      logLevel: process.env.LOG_LEVEL || 'info',
      appiumServerUrl: process.env.APPIUM_SERVER_URL || 'http://localhost:4723',
    };
  }

  getBaseURL(): string {
    return this.config.baseURL;
  }

  getAppPath(): string {
    return this.config.appPath;
  }

  getDeviceName(): string {
    return this.config.deviceName;
  }

  getPlatformVersion(): string {
    return this.config.platformVersion;
  }

  getAutomationName(): string {
    return this.config.automationName;
  }

  getPlatformName(): string {
    return this.config.platformName;
  }

  getAppPackage(): string {
    return this.config.appPackage;
  }

  getAppActivity(): string {
    return this.config.appActivity;
  }

  getTimeout(): number {
    return this.config.timeout;
  }

  isHeadlessMode(): boolean {
    return this.config.isHeadless;
  }

  getLogLevel(): string {
    return this.config.logLevel;
  }

  getAppiumServerUrl(): string {
    return this.config.appiumServerUrl;
  }

  getFullConfig(): EnvironmentConfig {
    return this.config;
  }
}

export default new Environment();