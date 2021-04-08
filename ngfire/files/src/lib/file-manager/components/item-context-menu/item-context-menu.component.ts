import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import * as _ from 'lodash';
import { SubSink } from 'subsink';
import { take } from 'rxjs/operators';


import { DeleteConfirmationDialogComponent, DELETE_DIALOG_WIDTH } from '@iote/ui-workflows';
import { Logger } from '@iote/bricks-angular';

import { FolderIterator } from '../../model/folder-iterator.class';

import { AddFolderModalComponent } from '../add-folder-modal/add-folder-modal.component';

/** Component that displays a single item in a file manager setup. */
@Component({
  selector: 'ngfire-item-context-menu',
  styleUrls: ['./item-context-menu.component.scss'],
  templateUrl: './item-context-menu.component.html'
})
export class ItemContextMenuComponent implements OnDestroy
{
  private _sbS = new SubSink();

  @Input() item: FolderIterator;
  @Input() disallowDelete = false;
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
    this._sbS.sink = this.item.upload(files.target.files).subscribe();
    this.closeMe.emit();
  }

  addFolder()
  {
    this._sbS.sink = this._dialog.open(AddFolderModalComponent, { width: DELETE_DIALOG_WIDTH })
                          .afterClosed()
                          .subscribe(name => this._sbS.sink = this.item.addFolder(name).subscribe());

    this.closeMe.emit();
  }
  deleteMe()
  {
    // this._sbS.sink = this.item.delete().subscribe();
    // this.closeMe.emit();
    this._dialog.open(DeleteConfirmationDialogComponent,
                    { width: DELETE_DIALOG_WIDTH,
                      data: { content: `Are you sure you wish to delete "${ this.item.name }" ?` } })
      .afterClosed().pipe(take(1))
      .subscribe((agreed: boolean) =>
      { 
        
        if(agreed) {
          const parent = this.item.parent;
          this.item.delete().subscribe(() => {
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
