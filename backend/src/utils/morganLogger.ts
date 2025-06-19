import morgan, { StreamOptions } from 'morgan';
import logger from './logger';
import chalk from 'chalk';

const stream: StreamOptions = {
  write: (message) => logger.http(message.trim()),
};

const skip = () => process.env.NODE_ENV === 'test';

// Add status color token
morgan.token('statusColored', (_, res) => {
  const status = res.statusCode;
  if (status >= 500) return chalk.red(status.toString());
  if (status >= 400) return chalk.yellow(status.toString());
  if (status >= 300) return chalk.cyan(status.toString());
  if (status >= 200) return chalk.green(status.toString());
  return chalk.white(status.toString());
});

// Custom format using colorized status
const morganFormat = ':method :url :statusColored - :response-time ms';

const morganLogger = morgan(morganFormat, { stream, skip });

export default morganLogger;
