import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@firebase/firestore-types';

import { __FormatDateFromStorage } from '../conversion/dates-time.util';

/*
 * Format a Date. Expects Date to be of type Moment.
 *
 * Usage:
 *   value | fdate:format?
*/
@Pipe({
  name: 'fdate'
})
export class FDatePipe implements PipeTransform
{
  transform(value: Timestamp, format?: string)
  {
    return __FormatDateFromStorage(value, format);
  }
}
