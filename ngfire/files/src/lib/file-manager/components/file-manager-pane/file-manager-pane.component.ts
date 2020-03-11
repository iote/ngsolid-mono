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
  position: FolderIterator;
  /** Mock event. Only used in case of delete of current item. In that case, will be triggered to navigate to parent. */
  @Output() nodeClicked = new EventEmitter<FolderIterator>();

  constructor(private _logger: Logger) { }

  ngOnInit() {
    this.position$.subscribe(pos => this.position = pos);
  }

  onNodeClicked(position: FolderIterator)
  {
    this.nodeClicked.emit(position);
  }

  uploadFile(files: FileList)
  {
    this.position
        .upload(files).subscribe(() => true);
  }
}
