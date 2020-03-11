import { Injectable } from '@angular/core';
import { __DateToStorage } from '@ngfire/time';
import { AngularFireStorage } from '@angular/fire/storage';
import { Logger } from '@iote/bricks-angular';

import { IStorageReference, IFolderReference } from '../file-manager-types.types';
import { Observable, from } from 'rxjs';
import { FolderIteratorFactory } from '../model/folder-iterator-factory.class';
import { FolderIterator } from '../model/folder-iterator.class';
import { __MoveFirebaseFile } from './util/move-file.function';
import { __FileDownloadUrl } from './util/download-file.function';
import { HttpClient } from '@angular/common/http';
import { __UploadFiles } from './util/upload-files.function';

@Injectable()
export class FileManagerService
{
  constructor(private _storage: AngularFireStorage,
              private _logger: Logger)
  {}

  public getIterator(rootPath: string, rootPathName?: string): Observable<FolderIterator>
  {
    const factory = new FolderIteratorFactory(rootPath, this, rootPathName);

    return factory.root();
  }

  /** Gets the root folder structure. */
  getRootRef(basePath: string) : Observable<IFolderReference>
  {
    const root = this._storage.storage.ref('/').child(basePath);

    return this._contentsOfPath(root);
  }

  /** Gets the folder path. */
  getPath(path: string) : Observable<IFolderReference>
  {
    const ref = this._storage.storage.ref(path);

    return this._contentsOfPath(ref);
  }

  private _contentsOfPath(path: IStorageReference)
  {
    return from(path.list()
                    .then(contents => ({ folder: path, contents })));
  }

  public movePath(oldPath, newPath) {
    return from(__MoveFirebaseFile(this._storage, oldPath, newPath));
  }

  public getDownloadUrl(path: string) {
    return from(__FileDownloadUrl(this._storage, path));
  }

  public uploadToFoler(path: string, files: FileList) {
    return from(__UploadFiles(this._storage, path, files));
  }

}
