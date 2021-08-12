import { BasicEventBridge } from './basic-event-bridge.model';
import { OptimisticEvent } from "../model/optimistic-event.model";
import { BaseOptimisticEventsStore } from '../store/base-optimistic-event-store.class';
import { OptimisticEventBridge } from './optimistic-event-bridge.model';

export class OptimisticEventsBridgeFactory{

  execute(event: OptimisticEvent, _optimisticEventsStore$$: BaseOptimisticEventsStore)
  {
    let bridge: OptimisticEventBridge;

    switch(event.affectedStoreName)
    {
      default:
        bridge = new BasicEventBridge(_optimisticEventsStore$$);
    }

    bridge.simulate(event);
  }
}
