import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiLangModule } from '@elewa/elements/multi-lang';


import { MaterialDesignModule } from '@iote/bricks-angular';
import { DeleteConfirmationDialogComponent } from './components/delete-confirmation-modal/delete-confirmation-modal.component';
import { InfoPanelComponent } from './components/info-panel/info-panel.component';

/**
 * Workflows Module. Main entrypoint of the module.
 *
 * Library can later be split in more modules as workflows become more specific.
 */
@NgModule({
  imports: [CommonModule, MaterialDesignModule,MultiLangModule],
                                                    // Belongs more in a Layout Module, but temp stored here.
  declarations: [DeleteConfirmationDialogComponent, InfoPanelComponent],
  providers: [],
  entryComponents: [DeleteConfirmationDialogComponent],
  exports: [DeleteConfirmationDialogComponent]
})
export class UIWorkflowModule { }
