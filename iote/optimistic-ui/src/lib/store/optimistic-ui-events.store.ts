import { Injectable } from "@angular/core";

import { Logger } from "@iote/bricks-angular";
import { __DateFromStorage } from "@iote/time";

import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import * as moment from 'moment';

import { OptimisticEvent } from './../model/optimistic-event.model';
import { BaseOptimisticEventsStore } from "./base-optimistic-event-store.class";

/**
 * @class OptimisticUiEventsStore
 *
 * @description Stores Optimistic events and facilitates fetching of simulated data
 * that will thereafter be combined with data from the actual database
 */
@Injectable()
export class OptimisticUiEventsStore extends BaseOptimisticEventsStore
{
  store = 'optimistic-ui-store';

  constructor(protected _logger: Logger)
  {
    super([]);
  }

  getSimulated<T>(storeName: string, filter? : (t: T) => boolean): Observable<T[]>
  {
    return super.get().pipe(
                map(optimisticUiEvents => this.processRelevant<T>(optimisticUiEvents, storeName)),
                map(simulatedObjects => simulatedObjects.filter(filter ? filter : () => true))
              );
  }

  processRelevant<T>(optimisticUiEvents: OptimisticEvent[], storeName: string)
  {
    const relevantEvents = optimisticUiEvents.filter(ev => ev.affectedStoreName === storeName);

    const activeEvents = relevantEvents.filter(ev => !this._isOverdue(ev));

    const simulatedObjects: T[] = activeEvents.map(ev => ev.payload as T);

    return simulatedObjects;
  }


  /**
   *  Check if event is past its expiry time
   *
   * TODO: What happens if the event has expired (delete?)
  */
  private _isOverdue(optimisticEvent: OptimisticEvent): boolean
  {
    const createTime = __DateFromStorage(optimisticEvent.createdOn);

    const expiryTime = createTime.add(optimisticEvent.duration, 'milliseconds');

    const now = moment();

    return now.isAfter(expiryTime);
  }
}
