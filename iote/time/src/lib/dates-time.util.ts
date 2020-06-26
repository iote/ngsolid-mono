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
 */
export function __DateFromStorage(unixDate: Timestamp | Date) : AppDate
{
  const date = <Timestamp> <any> unixDate;
  return moment(date.seconds * 1000);
}

export function __DateToStorage(date: AppDate) 
{
  /** Mock as though the date is a timestamp,
   *    but actually work with regular dates.  
   * Firestore API will change the dates into timestamps automagically. */
  return <Timestamp> <any> date.toDate();
}

export function __FormatDateFromStorage(date: Timestamp, format?: string) 
{
  return __DateFromStorage(date).format(format ? format : 'l');
}

export function __FormatDate(date: AppDate, format?: string) 
{
  return date.format(format ? format : 'l');
}