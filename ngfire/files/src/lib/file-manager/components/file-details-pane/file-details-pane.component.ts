import { Component, OnInit, Input } from '@angular/core';

import { Logger } from '@iote/bricks-angular';

import { FolderIterator } from '../../model/folder-iterator.class';
import * as _ from 'lodash';

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

  constructor(private _logger: Logger) { }

  ngOnInit() {

  }

  download() {
    const urlFetch = this.file.downloadUrl();

    urlFetch.subscribe(url => {
      window.location.href = url;
    });
  }

}
