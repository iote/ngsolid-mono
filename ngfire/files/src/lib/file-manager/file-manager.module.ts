import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { UIWorkflowModule } from '@iote/ui-workflows';

import { MaterialDesignModule, FlexLayoutModule, MaterialBricksModule } from '@iote/bricks-angular';

import { FilesModule } from '../files';

import { FileManagerComponent } from './components/file-manager/file-manager.component';
import { FileManagerNavComponent } from './components/file-manager-nav/file-manager-nav.component';

import { FileManagerService } from './services/file-manager.service';
import { FileManagerInitalisationService } from './services/file-manager-init.service';
import { FileManagerPaneComponent } from './components/file-manager-pane/file-manager-pane.component';
import { FileManagerItemComponent } from './components/file-manager-item/file-manager-item.component';
import { FileManagerCrumbComponent } from './components/file-manager-breadcrumbs/file-manager-breadcrumbs.component';
import { FileDetailsPaneComponent } from './components/file-details-pane/file-details-pane.component';
import { FileIconComponent } from './components/file-icon/file-icon.component';
import { FileDetailsPathComponent } from './components/file-details-path/file-details-path.component';
import { FileDragUploadDirective } from './directives/file-drag-upload/file-drag-upload.directive';

/**
 * Module that contains a file manager.
 */
@NgModule({
  imports: [CommonModule, FlexLayoutModule, FormsModule,
            MaterialDesignModule, MaterialBricksModule, FilesModule,
            AngularFireStorageModule, UIWorkflowModule],

  declarations: [FileManagerComponent, FileManagerNavComponent, FileDragUploadDirective,
                 FileManagerPaneComponent, FileManagerItemComponent, FileManagerCrumbComponent,
                 FileDetailsPaneComponent, FileDetailsPathComponent, FileIconComponent],
  providers: [FileManagerService, FileManagerInitalisationService],

  exports: [FileManagerComponent]
})
export class FileManagerModule { }
