import * as moment from 'moment';
import { Timestamp } from '@firebase/firestore-types';

export type AppDate = moment.Moment;
export type AppDateInput = moment.MomentInput;

/**
 * Utility that turns an object into a Date.
 */
export const __NewDate = (input: AppDateInput) => <AppDate> moment(input);

/**
 * Utility that turns an object into a Date and immediately prepares it for storage.
 */
export const __NewDateForStorage = (input: AppDateInput) => __DateToStorage(__NewDate(input));

/**
 * Utility that transforms firestore date into a date object.
 *
 * @param unixDate - Date as stored in firestore. IMPORTANT: Do not pass actual date objects!!!
 *                   20/07 - Since store changes a date is now either of Date type (local updates) or of Timestamp (DB updates)
 *                           @see https://stackoverflow.com/questions/643782/how-to-check-whether-an-object-is-a-date
 */
export function __DateFromStorage(unixDate: Timestamp | Date) : AppDate
{
  return (typeof (unixDate as Date).getMonth === 'function')
                ? moment(unixDate)
                : moment((unixDate as any).seconds * 1000);
}

export function __DateToStorage(date: AppDate)
{
  /** Mock as though the date is a timestamp,
   *    but actually work with regular dates.
   * Firestore API will change the dates into timestamps automagically. */
  return <Timestamp> <any> date.toDate();
}

export function __FormatDateFromStorage(date: Timestamp | Date, format?: string)
{
  return __DateFromStorage(date).format(format ? format : 'l');
}

export function __FormatDate(date: AppDate, format?: string)
{
  return date.format(format ? format : 'l');
}
