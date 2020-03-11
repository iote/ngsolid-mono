import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';

import { Logger } from '@iote/bricks-angular';
import { DeleteConfirmationDialogComponent, DELETE_DIALOG_WIDTH } from '@iote/ui-workflows';

import { FolderIterator } from '../../model/folder-iterator.class';

declare const window: Window;

/** */
@Component({
  selector: 'ngfire-file-details-pane',
  styleUrls: ['./file-details-pane.component.scss'],
  templateUrl: './file-details-pane.component.html'
})
export class FileDetailsPaneComponent implements OnInit
{
  @Input() file: FolderIterator;
  @Output() nodeClicked = new EventEmitter<FolderIterator>();

  type: string;

  constructor(private _dialog: MatDialog,
              private _logger: Logger)
  { }

  ngOnInit() {
    this.type = this.file.name.split('.').pop();
  }

  download() {
    const urlFetch = this.file.downloadUrl();

    urlFetch.subscribe(url => {
      window.location.href = url;
    });
  }

  del() {
    this._dialog.open(DeleteConfirmationDialogComponent,
                      { width: DELETE_DIALOG_WIDTH,
                        data: { content: `Are you sure you wish to delete "${ this.file.name }" ?` } })
                .afterClosed()
                .subscribe((agreed: boolean) => {
                  if(agreed) {
                    const parent = this.file.parent;
                    this.file.delete().subscribe(() => {
                      this.nodeClicked.emit(parent);
                    });
                  }
                });

  }
}
