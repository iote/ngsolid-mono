import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { SubSink } from 'subsink';

import { FileManagerService } from '../../services/file-manager.service';
import { FolderIterator } from '../../model/folder-iterator.class';
import { Logger } from '@iote/bricks-angular';

/** */
@Component({
  selector: 'ngfire-file-manager-pane',
  styleUrls: ['./file-manager-pane.component.scss'],
  templateUrl: './file-manager-pane.component.html'
})
export class FileManagerPaneComponent implements OnInit
{
  @Input() position$: Observable<FolderIterator>;

  constructor(private _logger: Logger) { }

  ngOnInit() { }
}
