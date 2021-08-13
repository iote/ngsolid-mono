import { Injectable } from '@angular/core';

import { IObject } from '@iote/bricks';
import { Logger } from '@iote/bricks-angular';
import { __DateFromStorage } from '@iote/time';

import { EntityStore } from '@s4y/state/base';
import * as _ from 'lodash';

import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IOptimisticEffectsStore } from './i-optimistic-effects-store.class';

@Injectable()
export abstract class OptimisticDataStore<T extends IObject> extends EntityStore<T>
{
  constructor(private _optimisticEvtStore$$: IOptimisticEffectsStore<T>,
              protected _logger?: Logger)
  {
    super([], true);
  }

  get(filter? : (t: T) => boolean): Observable<T[]>
  {
    const originalStoreValues = super.get(filter);

    const optimisticValues = this._optimisticEvtStore$$.getSimulated(this.store, filter);

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

    let uniqueLatest: T[] = [];

    for(let key in grouped)
    {
      const sameIds = grouped[key];

      uniqueLatest.push(this._getLatest(sameIds));
    }

    uniqueLatest = this._simulateDeletions(uniqueLatest);

    return uniqueLatest;
  }

  private _applySimulations(original: T[], optimisticData:T[]): boolean
  {
    if(original.length)
    {
      return (original[0] as any).hasOwnProperty('id') && optimisticData?.length > 0;
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

  private _simulateDeletions(uniqueLatest: T[])
  {
    return uniqueLatest.filter(val => !(val as any).del);
  }
}
