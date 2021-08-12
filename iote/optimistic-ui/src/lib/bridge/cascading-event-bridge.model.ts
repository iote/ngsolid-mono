import { BaseOptimisticEventsStore } from "@iote/optimistic-ui";
import { OptimisticEventsService } from "../services/optimistic-event-service.class";
import { OptimisticEventBridge } from "./optimistic-event-bridge.model";

export abstract class CascadingEventBridge extends OptimisticEventBridge{

  constructor(private _eventsService: OptimisticEventsService,
              private _optimisticEventsStore$$: BaseOptimisticEventsStore)
  {
    super(_optimisticEventsStore$$);
  }

  /**
   * Performs the operation that emits more events
   */
  abstract cascade<T>() : void;
}
