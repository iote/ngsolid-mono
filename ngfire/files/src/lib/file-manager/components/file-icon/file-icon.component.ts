
import { Component, Input } from '@angular/core';

import { FolderIterator } from '../../model/folder-iterator.class';
import { Logger } from '@s4y/external/iote/bricks-angular';
import * as _ from 'lodash';

/** Component that displays a single item in a file manager setup. */
@Component({
  selector: 'ngfire-file-icon',
  styleUrls: ['./file-icon.component.scss'],
  templateUrl: './file-icon.component.html'
})
export class FileIconComponent
{
  @Input() file: FolderIterator;
  @Input() size = '1.5em';

  constructor(private _logger: Logger) { }

  getFileIcon() {
    if(this.file.isFolder)
      return;

    const fileType = (_.last(this.file.name.split('.')) as any).toLowerCase();

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

  getSize() {
    return { 'font-size': this.size };
  }
}
