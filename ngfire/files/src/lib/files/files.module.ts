import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireStorageModule } from '@angular/fire/storage';
import { MaterialDesignModule, FlexLayoutModule } from '@s4y/external/iote/bricks-angular';

import { UploadFileComponent } from "./components/upload-file/upload-file.component";
import { FileStorageService } from './services/file-storage.service';

/**
 * Modules for storing / retrieving / iterating files.
 */
@NgModule({
  imports: [CommonModule, FlexLayoutModule,
            MaterialDesignModule,
            AngularFireStorageModule],

  declarations: [UploadFileComponent],

  providers: [FileStorageService],

  exports: [UploadFileComponent]
})
export class FilesModule { }
