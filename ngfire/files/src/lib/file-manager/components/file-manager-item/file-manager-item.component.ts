
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { FolderIterator } from '../../model/folder-iterator.class';
import { Logger } from '@iote/bricks-angular';
import * as _ from 'lodash';

/** Component that displays a single item in a file manager setup. */
@Component({
  selector: 'ngfire-file-manager-item',
  styleUrls: ['./file-manager-item.component.scss'],
  templateUrl: './file-manager-item.component.html'
})
export class FileManagerItemComponent
{
  @Input() item: FolderIterator;
  @Output() nodeClicked = new EventEmitter<FolderIterator>();

  fileOver: boolean;

  constructor(private _logger: Logger) { }

  meClicked = () => this.nodeClicked.emit(this.item);

  uploadFile(any) {
    debugger;
  }

  onDrag = (evt: 'in' | 'out') => this.fileOver = (evt === 'in');
  getFolderIcon = () => this.fileOver ? 'far fa-folder-open' : 'far fa-folder';
}
