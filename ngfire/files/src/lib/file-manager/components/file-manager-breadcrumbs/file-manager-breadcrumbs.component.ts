import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FileManagerCrumb } from './file-manager-crumb.interface';
import { FolderIterator } from '../../model/folder-iterator.class';

@Component({
  selector: 'ngfire-file-manager-breadcrumbs',
  templateUrl: './file-manager-breadcrumbs.component.html',
  styleUrls: ['./file-manager-breadcrumbs.component.scss']
})
export class FileManagerCrumbComponent implements OnInit
{
  @Input() position$: Observable<FolderIterator>;
  curr: FolderIterator;

  @Output() nodeClicked = new EventEmitter<FolderIterator>();

  crumbs$: Observable<FileManagerCrumb[]>;

  constructor() { }

  ngOnInit() {
    this.crumbs$ = this.position$.pipe(map(p => this._toCrumbs(p, true)));

    this.position$.subscribe(pos => this.curr = pos);
  }

  crumbClicked(crumb: FileManagerCrumb) {
    this.nodeClicked.emit(crumb.position);
  }

  goBack = () => this.nodeClicked.emit(this.curr.parent);

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
}
