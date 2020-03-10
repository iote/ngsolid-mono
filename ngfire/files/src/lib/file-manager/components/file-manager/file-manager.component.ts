import { Component, OnInit, Input } from '@angular/core';
import { SubSink } from 'subsink';
import { FileManagerService } from '../../services/file-manager.service';
import { FolderIterator } from '../../model/folder-iterator.class';

/**
 *
 */
@Component({
  selector: 'ngfire-file-manager',
  styleUrls: ['./file-manager.component.scss'],
  templateUrl: './file-manager.component.html'
})
export class FileManagerComponent implements OnInit
{
  private _sbS = new SubSink();

  /** Base path from where to load the initial files. Explorer will not be able to go below this basePath. */
  @Input() basePath: string;
  /** In case Base Path display name is different from base path root folder. This can be useful if for example an id is used as part of base folder structure.
   *
   *    - If null: part after last '/' of basePath will be used. */
  @Input() basePathName?: string;
  currentPath: string;

  iterator: FolderIterator;
  isLoaded = false;

  constructor(private _fileManagerService: FileManagerService) { }

  ngOnInit()
  {
    const iterator$ = this._fileManagerService.getIterator(this.basePath);

    this._sbS.sink = iterator$.subscribe(iterator => {
      this.iterator = iterator;
      this.isLoaded = false;
    });
  }
}
