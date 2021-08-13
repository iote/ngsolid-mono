import { IObject } from "@iote/bricks";
import { EntityStore } from "@iote/state";
import * as _ from "lodash";

import { Observable } from "rxjs";

import { IOptimisticEffect } from "../model/i-optimistic-effect.model";

/**
 * @class IOptimisticEffectsStore
 *
 * @description  Base class providing guidelines for setting up an Optimistic Ui Event Store
 *
 */
export abstract class IOptimisticEffectsStore<T> extends EntityStore<IOptimisticEffect<T>>
{
  /**
   * @param storeName Name of the store. (Helps filter out irrelevant events that do not belong to the specific store)
   * @param filter Filter applied to the original store data/query
   */
  abstract getSimulated(storeName: string, filter? : (t: T) => boolean): Observable<T[]>;

  add(events: IOptimisticEffect<T>[])
  {
    return this.patch(events, 'Create');
  }

  remove(toRemove: IOptimisticEffect<T>[])
  {
    const current = _.cloneDeep(this.state.entities);

    const cleanedUp = _.differenceBy(current, toRemove, (ev: IOptimisticEffect<T>) => (ev.payload as IObject).id);

    this.set(cleanedUp, 'Delete');
  }
}
