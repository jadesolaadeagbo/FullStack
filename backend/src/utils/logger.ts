// utils/logger.ts
import { createLogger, format, transports, config } from 'winston';
import path from 'path';

const { combine, timestamp, printf, colorize, errors } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

// Custom log levels (with http)
const customLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Create the logger
const logger = createLogger({
  levels: customLevels,
  level: 'http', // set minimum log level
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    logFormat
  ),
  transports: [],
  exceptionHandlers: [new transports.File({ filename: 'logs/exceptions.log' })],
});

// Console logging in development
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: combine(colorize({ all: true }), logFormat),
    })
  );
} else {
  // File logging in production
  logger.add(
    new transports.File({ filename: path.join('logs', 'error.log'), level: 'error' })
  );
  logger.add(
    new transports.File({ filename: path.join('logs', 'combined.log') })
  );
}

export default logger;
