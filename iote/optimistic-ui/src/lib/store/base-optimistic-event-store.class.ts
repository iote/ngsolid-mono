import { EntityStore } from "@iote/state";

import { Observable } from "rxjs";

import { OptimisticEvent } from "../model/optimistic-event.model";

/**
 * @class BaseOptimisticEventsStore
 *
 * @description  Base class providing guidelines for setting up an Optimistic Ui Event Store
 *
 */
export abstract class BaseOptimisticEventsStore extends EntityStore<OptimisticEvent>
{
  /**
   * @param storeName Name of the store. (Helps filter out irrelevant events that do not belong to the specific store)
   * @param filter Filter applied to the original store data/query
   */
  abstract getSimulated<T>(storeName: string, filter? : (t: T) => boolean): Observable<T[]>;

  add(events: OptimisticEvent[], eventType: 'Create'| 'Update'| 'Delete')
  {
    this.patch(events, eventType);
  }
}
