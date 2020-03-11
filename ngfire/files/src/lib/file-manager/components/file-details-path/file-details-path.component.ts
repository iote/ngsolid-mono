import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { Logger } from '@iote/bricks-angular';

import { FolderIterator } from '../../model/folder-iterator.class';
import * as _ from 'lodash';
import { Form } from '@angular/forms';

/** */
@Component({
  selector: 'ngfire-file-details-path',
  styleUrls: ['./file-details-path.component.scss'],
  templateUrl: './file-details-path.component.html'
})
export class FileDetailsPathComponent implements OnInit
{
  @Input() file: FolderIterator;
  isSaving: boolean;

  editName: { name: string, editing: boolean, type: string;};

  @ViewChild('form') form: Form;

  constructor(private _logger: Logger) { }

  ngOnInit() {
    // Seperate file and type - note that a filename can contain multiple '.' in the name. The filetype is the last part.
    const name = this.file.name.split('.');
    const type = name.pop();
    this.editName = { name: name.join('.'), editing: false, type };
  }

  getFilePath() {
    const path = this.file.path.split('/');
    path.shift();
    path.pop();
    path.push(`${this.editName.name}.${this.editName.type}`);
    return _.join(path, '/');
  }

  isDuplicate = (name) => this.file.parent.children.find(pCh => pCh.name === name && pCh.path !== this.file.path);

  save() {
    this.isSaving = true;
    this.file
        .updateName(this.editName.name, this.editName.type)
        .subscribe(() => { this.isSaving = false; this.editName.editing = false; });
  }

}
