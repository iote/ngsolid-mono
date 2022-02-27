import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { from } from 'rxjs';

import { Logger } from '@s4y/external/iote/bricks-angular';

import { MultiLangFolder } from '../model/multi-lang-folder.interface';
import { IStorageReference, IStorageContents } from '../file-manager-types.types';
import { __GetEmptyFile } from './util/get-empty-file.function';


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
                                      .then((contents: any) => this._initFolderStructureInner(root, contents, baseFolders))));
  }

  private _initFolderStructureInner(root: IStorageReference, rootContents: IStorageContents, baseFolders: MultiLangFolder[])
  {
    if(rootContents.items.length === 1 && rootContents.prefixes.length === 0)
    {
      const emptyFile = __GetEmptyFile();
      const creates = baseFolders.map(base => root.child(`${base.key}/.keep`).put(emptyFile));

      return Promise.all(creates);
    }
  }

  /** Gets the root folder structure. */
  private _makeRoot = (basePath: string) => this._storage.storage.ref('').child(`${basePath}/.keep`).put(__GetEmptyFile());
  private _getRoot = (basePath: string) => this._storage.storage.ref('/').child(basePath);

}
