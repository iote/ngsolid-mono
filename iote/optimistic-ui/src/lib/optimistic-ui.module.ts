import { ModuleWithProviders, NgModule } from "@angular/core";
import { OptimisticUiEventsStore } from "./store/optimistic-ui-events.store";

import { IOptimisticEffectsStore } from '../lib/store/i-optimistic-effects-store.class';

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
          provide: IOptimisticEffectsStore,
          useClass: OptimisticUiEventsStore
        }
      ]
    };
  }
}
