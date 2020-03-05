import { Logger } from './logger.interface';

/**
 * Simple wrapper around console.log.
 * Class used for production logging. Hide debug info, errors and warnings from hackers.
 */
export class ConsoleProductionLogger implements Logger
{
  log(msg: () => any) { console.log(msg()); }

  // In production, we can choose to make sure logger.debug will not execute the method and thus not evaluate the argments.
  debug(_: () => any) { /* Noop */ }

  warn(msg: () => any)  { console.warn(msg()); }
  error(msg: () => any) { console.error(msg()); }
}
