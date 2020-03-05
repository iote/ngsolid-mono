import { Logger } from './logger.interface';

/**
 * Simple wrapper around console.log.
 * Class used for debug logging. Hide debug info, errors and warnings from hackers.
 */
export class ConsoleDebugLogger implements Logger
{
  log(msg: () => any) { console.log(msg()); }

  debug(msg: () => any) { console.debug(msg()); }
  warn(msg: () => any) { console.warn(msg()); }
  error(msg: () => any) { console.error(msg()); }
}
