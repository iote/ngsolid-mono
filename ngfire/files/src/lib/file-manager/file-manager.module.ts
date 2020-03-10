import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireStorageModule } from '@angular/fire/storage';
import { MaterialDesignModule, FlexLayoutModule, MaterialBricksModule } from '@iote/bricks-angular';

import { FilesModule } from '../files';


import { FileManagerComponent } from './components/file-manager/file-manager.component';
import { FileManagerNavComponent } from './components/file-manager-nav/file-manager-nav.component';

import { FileManagerService } from './services/file-manager.service';
import { FileManagerInitalisationService } from './services/file-manager-init.service';

/**
 * Module that contains a file manager.
 */
@NgModule({
  imports: [CommonModule, FlexLayoutModule,
            MaterialDesignModule, MaterialBricksModule, FilesModule,
            AngularFireStorageModule],

  declarations: [FileManagerComponent, FileManagerNavComponent],
  providers: [FileManagerService, FileManagerInitalisationService],

  exports: [FileManagerComponent]
})
export class FileManagerModule { }
