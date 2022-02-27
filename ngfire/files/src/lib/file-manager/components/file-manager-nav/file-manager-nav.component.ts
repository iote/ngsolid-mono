import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { TranslateService } from '@s4y/external/ngfire/multi-lang';
import { Logger } from '@s4y/external/iote/bricks-angular';

import { FolderIterator } from '../../model/folder-iterator.class';
import { map } from 'rxjs/operators';

import * as translations from '../../model/folder-root-structure.const';

/** */
@Component({
  selector: 'ngfire-file-manager-nav',
  styleUrls: ['./file-manager-nav.component.scss'],
  templateUrl: './file-manager-nav.component.html'
})
export class FileManagerNavComponent implements OnInit
{
  /** Root of the folder structure. */
  @Input() rootIcon = 'far fa-folder-open';
  @Input() structure: FolderIterator;
  @Output() nodeClicked = new EventEmitter<FolderIterator>();

  dataSource  = new MatTreeNestedDataSource<FolderIterator>();
  treeControl  = new NestedTreeControl<FolderIterator>(node => this.loadChildren(node));

  constructor(private _logger: Logger,
              private _trl: TranslateService) { }

  ngOnInit()
  {
    // There's only one root element. Just pack it in there.
    this.dataSource.data = this.structure.children;
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
    return (node.expand() as any)
               .pipe(map(() =>
    {
      node.expanding = false;
      return node.children;
    }));
  }

  goToNode = (node: FolderIterator) => this.nodeClicked.emit(node);

  getName(name: string)
  {
    const lang = this._trl.getLang();
    // Fetch translation from file
    const translation = translations.FolderRootStructure.find(trl => trl.en === name);
    if(!translation)
    {
      return name;
    }

    return translation[lang];
  }

}
