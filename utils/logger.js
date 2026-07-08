const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

/**
 * Logger Utility Module
 * Provides structured logging with Winston for test execution tracking
 * @module utils/logger
 */
class Logger {
  constructor() {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.printf(({ timestamp, level, message, stack }) => {
          const stackTrace = stack ? `\n${stack}` : '';
          return `${timestamp} [${level.toUpperCase()}]: ${message}${stackTrace}`;
        })
      ),
      defaultMeta: { service: 'wdio-copilot' },
      transports: [
        // Console output
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(({ timestamp, level, message, stack }) => {
              const stackTrace = stack ? `\n${stack}` : '';
              return `${timestamp} [${level}]: ${message}${stackTrace}`;
            })
          ),
        }),
        // File output - All logs
        new winston.transports.File({
          filename: path.join(logsDir, 'app.log'),
          maxsize: 5242880, // 5MB
          maxFiles: 5,
        }),
        // File output - Error logs only
        new winston.transports.File({
          filename: path.join(logsDir, 'error.log'),
          level: 'error',
          maxsize: 5242880,
          maxFiles: 5,
        }),
      ],
    });
  }

  /**
   * Log info level message
   * @param {string} message - Log message
   * @param {Object} meta - Additional metadata
   */
  info(message, meta = {}) {
    this.logger.info(message, meta);
  }

  /**
   * Log debug level message
   * @param {string} message - Log message
   * @param {Object} meta - Additional metadata
   */
  debug(message, meta = {}) {
    this.logger.debug(message, meta);
  }

  /**
   * Log warning level message
   * @param {string} message - Log message
   * @param {Object} meta - Additional metadata
   */
  warn(message, meta = {}) {
    this.logger.warn(message, meta);
  }

  /**
   * Log error level message
   * @param {string} message - Log message
   * @param {Error} error - Error object
   * @param {Object} meta - Additional metadata
   */
  error(message, error = null, meta = {}) {
    if (error instanceof Error) {
      this.logger.error(message, { stack: error.stack, ...meta });
    } else {
      this.logger.error(message, meta);
    }
  }
}

module.exports = new Logger();