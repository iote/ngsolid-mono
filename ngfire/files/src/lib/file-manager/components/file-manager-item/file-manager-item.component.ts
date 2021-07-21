
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngfire/multi-lang'

import * as translations from '../../model/folder-root-structure.const';

import { FolderIterator } from '../../model/folder-iterator.class';
import { Logger } from '@iote/bricks-angular';
import * as _ from 'lodash';

/** Component that displays a single item in a file manager setup. */
@Component({
  selector: 'ngfire-file-manager-item',
  styleUrls: ['./file-manager-item.component.scss'],
  templateUrl: './file-manager-item.component.html'
})
export class FileManagerItemComponent
{
  @Input() item: FolderIterator;
  @Output() nodeClicked = new EventEmitter<FolderIterator>();

  fileOver: boolean;

  constructor(private _logger: Logger,
              private _trl: TranslateService) { }

  meClicked = () => this.nodeClicked.emit(this.item);

  uploadFile(files: FileList)
  {
    this.item.upload(files).subscribe(() => true);
  }
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

  onDrag = (evt: 'in' | 'out') => this.fileOver = (evt === 'in');
  getFolderIcon = () => this.fileOver ? 'far fa-folder-open' : 'far fa-folder';
}

