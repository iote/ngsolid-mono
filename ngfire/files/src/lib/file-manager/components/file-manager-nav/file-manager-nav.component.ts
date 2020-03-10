import { Component, OnInit, Input } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { Logger } from '@iote/bricks-angular';

import { FolderIterator } from '../../model/folder-iterator.class';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


/**
 *
 */
@Component({
  selector: 'ngfire-file-manager-nav',
  styleUrls: ['./file-manager-nav.component.scss'],
  templateUrl: './file-manager-nav.component.html'
})
export class FileManagerNavComponent implements OnInit
{
  /** Root of the folder structure. */
  @Input() structure: FolderIterator;

  source$$: BehaviorSubject<FolderIterator>;

  dataSource  = new MatTreeNestedDataSource<FolderIterator>();
  treeControl  = new NestedTreeControl<FolderIterator>(node => this.loadChildren(node));

  constructor(private _logger: Logger) { }

  ngOnInit()
  {
    // There's only one root element. Just pack it in there.
    this.dataSource.data = [this.structure];
  }

  isExpandable(_: number, node: FolderIterator) {
    return node.isFolder;
  }

  loadChildren(node: FolderIterator)
  {
    if(node.hasExpanded)
      return node.children;

    node.expanding = true;
    // Expanding has to happen from the parent as the child is swapped out
    return node.expand()
               .pipe(map(() =>
    {
      node.expanding = false;
      return node.children;
    }));
  }

}
