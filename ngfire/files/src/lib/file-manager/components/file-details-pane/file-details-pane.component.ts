import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { Logger } from '@iote/bricks-angular';

import { FolderIterator } from '../../model/folder-iterator.class';
import * as _ from 'lodash';
import { Form } from '@angular/forms';

/** */
@Component({
  selector: 'ngfire-file-details-pane',
  styleUrls: ['./file-details-pane.component.scss'],
  templateUrl: './file-details-pane.component.html'
})
export class FileDetailsPaneComponent implements OnInit
{
  @Input() file: FolderIterator;
  isSaving: boolean;

  editName: { name: string, editing: boolean, type: string;};

  @ViewChild('form') form: Form;

  constructor(private _logger: Logger) { }

  ngOnInit() {

  }

}
