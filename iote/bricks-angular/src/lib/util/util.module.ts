import { NgModule } from '@angular/core';

import { Logger } from './services/logger.service';
import { TransclusionHelper } from './services/transclusion-helper.service';
import { MoneyPipe } from './pipes/money.pipe';

/**
 * Util Module. Imported in Root. 
 * 
 * General Util which can be reused in other projects.
 * 
 * Logging, Transclusion, ..
 */
@NgModule({
  imports: [],
  declarations: [MoneyPipe],
  providers: [Logger, TransclusionHelper],
  exports: [MoneyPipe]
})
export class UtilModule { }
