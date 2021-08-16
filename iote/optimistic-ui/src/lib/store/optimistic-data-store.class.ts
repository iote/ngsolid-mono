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

    const optimisticValues = this._optimisticEvtStore$$.fetchEffects(this.store, filter);

    return combineLatest([originalStoreValues, optimisticValues])
            .pipe(
              map(([originalVals, optimisticData]) =>
                    this._optimisticEffect(originalVals, optimisticData)));
  }

  /**
   *
   * @param original original data received from the database
   * @param optimisticData simulated data retrieved from the optimistic events store
   * @returns list combining data from the db and from the optimistic events store
   */
  private _optimisticEffect(original: T[], optimisticData:T[]) : T[]
  {
    if(!optimisticData || optimisticData.length == 0)
      return original;

    const combined = original.concat(optimisticData);

    return this._applySimulations(combined);
  }

  /**
   *
   * @param combined The combined events from the original store pus those from the optimistic store
   * @returns
   */
  private _applySimulations(combined: T[]): T[]
  {
    // group by id -> those conflicting with same ID will be in same group. We therefore use this grouping as a flattening
    //    tool with merge conflict resolution later.
    const grouped = _.groupBy(combined, (d) => d.id);

    // Merge conflict resolution. Take the latest updated of each group.
    let uniqueLatest: T[] = [];

    for(let key in grouped)
      uniqueLatest.push(this._getLatest(grouped[key]));

    return this._cleanData(uniqueLatest);
  }

  private _getLatest(sameIds: T[]): T
  {
    if(sameIds.length < 1) return;

    // Order by created on date descending
    const ordered = _.orderBy(sameIds,( a: any) => __DateFromStorage(a.createdOn).unix(), 'desc');

    return ordered[0].del ? null : ordered[0];
  }

  private _cleanData(uniqueLatest: T[])
  {
    const cleanedUp = uniqueLatest.filter(val => !!val);
    return _.orderBy(cleanedUp,( a: any) => __DateFromStorage(a.createdOn).unix(), 'desc');
  }
}
