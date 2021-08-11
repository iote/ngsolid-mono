import { Injectable } from '@angular/core';

import { IObject } from '@iote/bricks';
import { Logger } from '@iote/bricks-angular';
import { __DateFromStorage } from '@iote/time';

import { EntityStore } from '@s4y/state/base';
import * as _ from 'lodash';

import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseOptimisticEventsStore } from './base-optimistic-event-store.class';

@Injectable()
export abstract class OptimisticDataStore<T extends IObject> extends EntityStore<T>
{
  constructor(private _optimisticEvtStore$$: BaseOptimisticEventsStore,
              protected _logger?: Logger)
  {
    super([], true);
  }

  get(filter? : (t: T) => boolean): Observable<T[]>
  {
    const originalStoreValues = super.get(filter);

    const optimisticValues = this._optimisticEvtStore$$.getSimulated<T>(this.store, filter);

    return combineLatest([originalStoreValues, optimisticValues])
            .pipe(map(([originalVals, optimisticData]) => this._removeOlder(originalVals, optimisticData)));
  }

  /**
   *
   * @param original original data received from the database
   * @param optimisticData simulated data retrieved from the optimistic events store
   * @returns list combining data from the db and from the optimistic events store
   */
  private _removeOlder(original: T[], optimisticData:T[])
  {
    if(!this._applySimulations(original, optimisticData))
    {
      return original;
    }

    const combined = original.concat(optimisticData);
    const grouped = _.groupBy(combined, (d) => (d as any).id);

    const uniqueLatest: T[] = [];

    for(let key in grouped)
    {
      const sameIds = grouped[key];

      uniqueLatest.push(this._getLatest(sameIds));
    }

    return uniqueLatest;
  }

  private _applySimulations(original: T[], optimisticData:T[])
  {
    if(original.length)
    {
      return (original[0] as any).hasOwnProperty('id') && optimisticData?.length;
    }

    return false;
  }


  private _getLatest(sameIds: T[]): T
  {
    if(sameIds.length < 1) return;
    // Order by created on date descending
    const ordered = _.orderBy(sameIds,( a: any) => __DateFromStorage(a.createdOn).unix(), 'desc');

    return ordered[0];
  }
}
