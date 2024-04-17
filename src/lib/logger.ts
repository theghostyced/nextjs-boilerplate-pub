/** This can be used in 2 ways:
 *
 *
 *   - simple way: all logging is done to the same named stream
 *     example:
 *
 *       import logger from '@/lib/logger';
 *       logger.warn('My warning message');
 *
 *
 *  - modular way: various modules can have their own named stream, to enable
 *    logging for a specific module only
 *    example:
 *
 *      import {getLogger} from '@/lib/logger';
 *      const logger = getLogger('this-module-name');
 *      logger.info('My informational message');
 *
 *
 * Default log levels for each named module can be set in the `logLevels` map.
 * Valid levels are:
 *   - silent
 *   - trace
 *   - debug
 *   - info
 *   - warn
 *   - error
 *   - fatal
 *
 * Setting the environment variable `NEXT_PUBLIC_LOG_LEVEL` to any of the above will override
 * all module specific levels.
 *
 */

import winston from 'winston';

const logLevels: Map<string, string> = new Map([
  // ['<module-name>', '<log-level>'],
  ['*', 'silent'],
  ['app', 'warn'],
]);

export const getLogLevel = (name: string): string => {
  return process.env.NEXT_PUBLIC_LOG_LEVEL || logLevels.get(name) || logLevels.get('*') || 'warn';
};

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    // new winston.transports.File({filename: 'error.log', level: 'error'}),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

export default logger as winston.Logger;
