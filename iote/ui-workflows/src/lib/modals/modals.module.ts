import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialDesignModule, FlexLayoutModule } from '@iote/bricks-angular';
import { UIModalComponent } from './components/modal/modal.component';

/**
 * Modals Module. Main entrypoint of the module.
 *
 * Library can later be split in more modules as workflows become more specific.
 */
@NgModule({
  imports: [CommonModule,
            MaterialDesignModule, FlexLayoutModule],
  declarations: [UIModalComponent],
  providers: [],
  entryComponents: [],
  exports: [UIModalComponent]
})
export class UIModalsModule { }
