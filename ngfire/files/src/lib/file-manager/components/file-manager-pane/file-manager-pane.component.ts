import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Logger } from '@iote/bricks-angular';

import { FolderIterator } from '../../model/folder-iterator.class';

/** */
@Component({
  selector: 'ngfire-file-manager-pane',
  styleUrls: ['./file-manager-pane.component.scss'],
  templateUrl: './file-manager-pane.component.html'
})
export class FileManagerPaneComponent implements OnInit
{
  @Input() position$: Observable<FolderIterator>;
  @Output() nodeClicked = new EventEmitter<FolderIterator>();

  constructor(private _logger: Logger) { }

  ngOnInit() { }

  onNodeClicked(position: FolderIterator)
  {
    this.nodeClicked.emit(position);
  }

  uploadFile(any) {
    debugger;
  }
}
