import { Component, Input, OnInit, EventEmitter, Output, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChildActivationEnd } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { FileManagerCrumb } from './file-manager-crumb.interface';
import { FolderIterator } from '../../model/folder-iterator.class';
import { MatDialog } from '@angular/material/dialog';
import { AddFolderModalComponent } from '../add-folder-modal/add-folder-modal.component';
import { DELETE_DIALOG_WIDTH } from '@iote/ui-workflows';
import { SubSink } from 'subsink';

@Component({
  selector: 'ngfire-file-manager-breadcrumbs',
  templateUrl: './file-manager-breadcrumbs.component.html',
  styleUrls: ['./file-manager-breadcrumbs.component.scss']
})
export class FileManagerCrumbComponent implements OnInit, OnDestroy
{
  private _sbS = new SubSink();

  @Input() position$: Observable<FolderIterator>;
  curr: FolderIterator;

  @Output() nodeClicked = new EventEmitter<FolderIterator>();
  @ViewChild('fileInput') fileInput: ElementRef;

  crumbs$: Observable<FileManagerCrumb[]>;

  constructor(private _dialog: MatDialog) { }

  ngOnInit() {
    this.crumbs$ = this.position$.pipe(map(p => this._toCrumbs(p, true)));

    this._sbS.sink = this.position$.subscribe(pos => this.curr = pos);
  }

  crumbClicked(crumb: FileManagerCrumb) {
    this.nodeClicked.emit(crumb.position);
  }

  goBack = () => this.nodeClicked.emit(this.curr.parent as any);

  addFiles = () => this.fileInput.nativeElement.click();
  filesSelected = (files: any) => this.curr.upload(files.target.files).subscribe();

  addFolder() {
    const names: string[] = this.curr.children.map(child => child.name)
    this._sbS.sink = this._dialog.open(AddFolderModalComponent,
                                          {width: DELETE_DIALOG_WIDTH, data: { names }})
                                .afterClosed()
                                .subscribe(
                                   name =>
                                       this._sbS.sink = this.curr.addFolder(name).subscribe());

  }

  private _toCrumbs(position: FolderIterator, first?: boolean) : FileManagerCrumb[]
  {
    const crumb = { name: position.name, position } as FileManagerCrumb;

    if(first)
      crumb.last = true;

    if(position.parent == null)
      return [crumb];

    const parentCrumb = this._toCrumbs(position.parent);
    parentCrumb.push(crumb);

    return parentCrumb;
  }

  ngOnDestroy()
  {
    this._sbS.unsubscribe();
  }
}
