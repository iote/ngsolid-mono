import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage,  } from '@angular/fire/storage';

import { Logger } from '@iote/bricks-angular';

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
  /** Base path from where to load the initial files. Explorer will not be able to go below this basePath. */
  @Input() basePath: string;
  /** In case Base Path display name is different from base path root folder. This can be useful if for example an id is used as part of base folder structure.
   *
   *    - If null: part after last '/' of basePath will be used. */
  @Input() basePathName?: string;
  currentPath: string;

  constructor(private _storage: AngularFireStorage,
              private _logger: Logger)
  { }

  ngOnInit()
  {
    const root = this._storage.ref(this.basePath);
    root.getMetadata().subscribe(m => { debugger; })
  }

}
