
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { FolderIterator } from '../../model/folder-iterator.class';
import { Logger } from '@iote/bricks-angular';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { AddFolderModalComponent } from '../add-folder-modal/add-folder-modal.component';
import { DELETE_DIALOG_WIDTH } from '@iote/ui-workflows';

/** Component that displays a single item in a file manager setup. */
@Component({
  selector: 'ngfire-item-context-menu',
  styleUrls: ['./item-context-menu.component.scss'],
  templateUrl: './item-context-menu.component.html'
})
export class ItemContextMenuComponent
{
  @Input() item: FolderIterator;
  @Output() nodeClicked = new EventEmitter();
  @Output() closeMe = new EventEmitter();

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private _dialog: MatDialog,
              private _logger: Logger)
  { }

  goTo = () => this.nodeClicked.emit();

  addFiles = () => this.fileInput.nativeElement.click();

  filesSelected(files: any)
  {
    this.item.upload(files.target.files).subscribe();
    this.closeMe.emit();
  }

  addFolder()
  {
    this._dialog.open(AddFolderModalComponent, { width: DELETE_DIALOG_WIDTH })
        .afterClosed()
        .subscribe(name => this.item.addFolder(name).subscribe());

    this.closeMe.emit();
  }

  deleteMe()
  {
    this.item.delete().subscribe();
    this.closeMe.emit();
  }

}
