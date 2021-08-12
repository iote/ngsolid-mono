import { OptimisticEffect } from '../model/optimistic-effect.model';
import { OptimisticEvent, OptimisticEventType } from './../model/optimistic-event.model';
import { OptimisticEventBridge } from "./optimistic-event-bridge.model";

export class BasicEventBridge extends OptimisticEventBridge{

  simulate<T>(optimisticEvt: OptimisticEvent): T
  {
    const affectedObj = (optimisticEvt.payload) as OptimisticEffect;

    affectedObj.isOptimistic = true;

    if(optimisticEvt.actionType === OptimisticEventType.delete)
    {
      affectedObj.shouldDelete = true;
    }

    this._OptimisticStore.add([optimisticEvt], optimisticEvt.actionType);

    return optimisticEvt.payload as T;
  }

}
