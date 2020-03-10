
import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { SubSink } from 'subsink';


import { FolderIterator } from '../../model/folder-iterator.class';
import { Logger } from '@iote/bricks-angular';
import * as _ from 'lodash';

/** Component that displays a single item in a file manager setup. */
@Component({
  selector: 'ngfire-file-manager-item',
  styleUrls: ['./file-manager-item.component.scss'],
  templateUrl: './file-manager-item.component.html'
})
export class FileManagerItemComponent implements OnInit
{
  @Input() item: FolderIterator;

  constructor(private _logger: Logger) { }

  ngOnInit()
  {

  }

  getFileIcon() {
    if(this.item.isFolder)
      return;

    const fileType = _.last(this.item.name.split('.')).toLowerCase();

    switch(fileType)
    {
      case 'pdf':
        return 'far fa-file-pdf';

      case 'doc':
      case 'docx':
      case 'dotx':
      case 'odt':
        return 'far fa-file-word';

      case 'ppt':
      case 'pptx':
        return 'far fa-file-powerpoint';

      case 'xls':
      case 'xlsx':
        return 'far fa-file-excel';

      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
        return 'far fa-file-image';

      default:
        return 'far fa-file-alt';
    }
  }
}
