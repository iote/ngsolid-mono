import { BaseOptimisticEventsStore } from '@iote/optimistic-ui';
import { OptimisticEvent } from './../model/optimistic-event.model';
export abstract class OptimisticEventBridge{

  _OptimisticStore: BaseOptimisticEventsStore;

  constructor(private _optimisticEventsStore: BaseOptimisticEventsStore)
  {
    this._OptimisticStore = _optimisticEventsStore;
  }

  /**
   * Mocks the operation meant to be performed by the
   */
  abstract simulate<T>(event: OptimisticEvent) : T;
}
