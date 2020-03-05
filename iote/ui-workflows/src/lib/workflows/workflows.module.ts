import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialDesignModule } from '@iote/bricks-angular';
import { DeleteConfirmationDialogComponent } from './components/delete-confirmation-modal/delete-confirmation-modal.component';

/**
 * Workflows Module. Main entrypoint of the module.
 *
 * Library can later be split in more modules as workflows become more specific.
 */
@NgModule({
  imports: [CommonModule, MaterialDesignModule],
  declarations: [DeleteConfirmationDialogComponent],
  providers: [],
  entryComponents: [DeleteConfirmationDialogComponent],
  exports: [DeleteConfirmationDialogComponent]
})
export class UIWorkflowModule { }
