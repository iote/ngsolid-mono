import { IObject } from "@iote/bricks";
import { EntityStore } from "@iote/state";
import * as _ from "lodash";

import { Observable } from "rxjs";

import { OptimisticEvent } from "../model/optimistic-event.model";

/**
 * @class BaseOptimisticEventsStore
 *
 * @description  Base class providing guidelines for setting up an Optimistic Ui Event Store
 *
 */
export abstract class BaseOptimisticEventsStore<T> extends EntityStore<OptimisticEvent<T>>
{
  /**
   * @param storeName Name of the store. (Helps filter out irrelevant events that do not belong to the specific store)
   * @param filter Filter applied to the original store data/query
   */
  abstract getSimulated<T>(storeName: string, filter? : (t: T) => boolean): Observable<T[]>;

  add(events: OptimisticEvent<T>[])
  {
    return this.patch(events, 'Create');
  }

  remove(toRemove: OptimisticEvent<T>[])
  {
    const current = _.cloneDeep(this.state.entities);

    const cleanedUp = _.differenceBy(current, toRemove, (ev: OptimisticEvent<T>) => (ev.payload as IObject).id);

    this.set(cleanedUp, 'Delete');
  }
}
