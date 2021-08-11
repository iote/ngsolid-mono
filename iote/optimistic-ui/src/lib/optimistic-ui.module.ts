import { ModuleWithProviders, NgModule } from "@angular/core";
import { OptimisticUiEventsStore } from "./store/optimistic-ui-events.store";

import { BaseOptimisticEventsStore } from '../lib/store/base-optimistic-event-store.class';

@NgModule({
  imports:[],
  providers: [],
  exports: []
})
export class OptimisticUIModule
{
  static forRoot(): ModuleWithProviders<OptimisticUIModule>
  {
    return {
      ngModule: OptimisticUIModule,
      providers: [
        {
          provide: BaseOptimisticEventsStore,
          useClass: OptimisticUiEventsStore
        }
      ]
    };
  }
}
