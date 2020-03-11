import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { from } from 'rxjs';

import { Logger } from '@iote/bricks-angular';

import { MultiLangFolder } from '../model/multi-lang-folder.interface';
import { IStorageReference, IStorageContents } from '../file-manager-types.types';


/** Service to initialise the file manager. Feeds the initial folder structure. */
@Injectable()
export class FileManagerInitalisationService
{
  constructor(private _storage: AngularFireStorage,
              private _logger: Logger)
  {}

  /** Initialises the root folder structure if root is empty */
  initialiseFolderStructure(basePath: string, baseFolders: MultiLangFolder[])
  {
    return from(this._makeRoot(basePath)
                    .then(() => this._getRoot(basePath))
                    .then(root => root.list()
                                      .then(contents => this._initFolderStructureInner(root, contents, baseFolders))));
  }

  private _initFolderStructureInner(root: IStorageReference, rootContents: IStorageContents, baseFolders: MultiLangFolder[])
  {
    if(rootContents.items.length === 1 && rootContents.prefixes.length === 0)
    {
      const emptyFile = this._toByteArray('');
      const creates = baseFolders.map(base => root.child(`${base.key}/.keep`).put(emptyFile));

      return Promise.all(creates);
    }
  }

  /** Gets the root folder structure. */
  private _makeRoot = (basePath: string) => this._storage.storage.ref('').child(`${basePath}/.keep`).put(this._toByteArray(''));
  private _getRoot = (basePath: string) => this._storage.storage.ref('/').child(basePath);

  private _toByteArray(str: string) : Uint8Array
  {
    const utf8 = unescape(encodeURIComponent(str));

    const arr  = [];
    for (let i = 0; i < utf8.length; i++) {
      arr.push(utf8.charCodeAt(i));
    }
    return new Uint8Array(arr);
  }

}
