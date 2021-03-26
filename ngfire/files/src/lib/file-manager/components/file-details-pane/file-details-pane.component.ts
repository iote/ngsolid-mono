import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

import { SubSink } from 'subsink';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';

import { Logger } from '@iote/bricks-angular';
import { DeleteConfirmationDialogComponent, DELETE_DIALOG_WIDTH, PDFModalComponent } from '@iote/ui-workflows';

import { FolderIterator } from '../../model/folder-iterator.class';
import { take } from 'rxjs/operators';

declare const window: Window;

/** */
@Component({
  selector: 'ngfire-file-details-pane',
  styleUrls: ['./file-details-pane.component.scss'],
  templateUrl: './file-details-pane.component.html'
})
export class FileDetailsPaneComponent implements OnInit, OnDestroy
{
  private _sbS = new SubSink();

  @Input() file: FolderIterator;
  @Output() nodeClicked = new EventEmitter<FolderIterator>();

  type: string;

  constructor(private _dialog: MatDialog,
              private _logger: Logger)
  { }

  ngOnInit() {
    this.type = this.file.name.split('.').pop();
  }

  download()
  {
    const urlFetch = this.file.downloadUrl();

    this._sbS.sink = urlFetch.subscribe(url => {
      window.location.href = url;
    });
  }

  view() {
    if(this.type === 'pdf')
    {
      this._sbS.sink = this.file.downloadUrl()
                                .pipe(take(1))
               .subscribe(url => this._sbS.sink = this._dialog.open(PDFModalComponent,
                                                   { data: { path: url } })
                                             .afterClosed().subscribe(() => true));
    }
  }

  del() {
    this._sbS.sink = this._dialog
                         .open(DeleteConfirmationDialogComponent,
                              { width: DELETE_DIALOG_WIDTH,
                                data: { content: `Are you sure you wish to delete "${ this.file.name }" ?` } })
                .afterClosed()
                .subscribe((agreed: boolean) =>
                {
                  if(agreed) {
                    const parent = this.file.parent;
                    this._sbS.sink = this.file.delete().subscribe(() => {
                      this.nodeClicked.emit(parent);
                    });
                  }
                });
  }

  ngOnDestroy()
  {
    this._sbS.unsubscribe();
  }
}
