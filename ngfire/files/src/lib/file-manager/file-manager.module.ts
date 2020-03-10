import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireStorageModule } from '@angular/fire/storage';
import { MaterialDesignModule, FlexLayoutModule } from '@iote/bricks-angular';

import { FileManagerDiscoveryService } from './services/file-manager-discovery.service';

import { FileManagerComponent } from './components/file-manager/file-manager.component';
import { FileManagerNavComponent } from './components/file-manager-nav/file-manager-nav.component';
import { FilesModule } from '../files';


/**
 * Module that contains a file manager.
 */
@NgModule({
  imports: [CommonModule, FlexLayoutModule,
            MaterialDesignModule, FilesModule,
            AngularFireStorageModule],

  declarations: [FileManagerComponent, FileManagerNavComponent],
  providers: [FileManagerDiscoveryService],

  exports: [FileManagerComponent]
})
export class FileManagerModule { }
