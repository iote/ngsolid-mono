import { Injectable } from "@angular/core";

import { Logger } from "@iote/bricks-angular";
import { __DateFromStorage } from "@iote/time";

import { map } from 'rxjs/operators';
import { interval, Observable } from "rxjs";
import * as moment from 'moment';
import * as _ from 'lodash';

import { IOptimisticEffect } from './../model/i-optimistic-effect.model';
import { IOptimisticEffectsStore } from "./i-optimistic-effects-store.class";

/**
 * @class OptimisticUiEventsStore
 *
 * @description Stores Optimistic events and facilitates fetching of simulated data
 * that will thereafter be combined with data from the actual database
 */
@Injectable()
export class OptimisticUiEventsStore<T> extends IOptimisticEffectsStore<T>
{
  store = 'optimistic-ui-store';

  constructor(protected _logger: Logger)
  {
    super([]);
  }

  protected _getSimulated(storeName: string, filter? : (t: T) => boolean): Observable<T[]>
  {
    return super.get().pipe(
                map(optimisticUiEvents => this.processRelevant(optimisticUiEvents, storeName)),
                map(simulatedObjects => simulatedObjects.filter(filter ? filter : () => true))
              );
  }

  processRelevant(optimisticUiEvents: IOptimisticEffect<T>[], storeName: string)
  {
    const relevantEvents = optimisticUiEvents.filter(ev => ev.affectedStoreName === storeName);

    const activeEvents = relevantEvents.filter(ev => !this._isOverdue(ev));

    const toRemove = _.difference(relevantEvents, activeEvents);

    if(toRemove.length)
    {
      this.remove(toRemove);
    }

    const simulatedObjects: T[] = activeEvents.map(ev => ev.payload as T);

    return simulatedObjects;
  }


  /**
   *  Check if event is past its expiry time
   *
   */
  private _isOverdue(IOptimisticEffect: IOptimisticEffect<T>): boolean
  {
    const createTime = __DateFromStorage((IOptimisticEffect as any).createdOn);

    const expiryTime = createTime.add(IOptimisticEffect.duration, 'milliseconds');

    const now = moment();

    return now.isAfter(expiryTime);
  }
}
