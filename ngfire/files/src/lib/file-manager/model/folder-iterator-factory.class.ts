import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IStorageReference } from '../file-manager-types.types';
import { FolderIterator } from './folder-iterator.class';

import { FileManagerService } from '../services/file-manager.service';

export class FolderIteratorFactory
{
  constructor(public rootPath: string,
              private _fileManagerService: FileManagerService)
  { }

  root(): Observable<FolderIterator>
  {
    const root$ = this._fileManagerService.getRootRef(this.rootPath);

    return root$.pipe(
      map(rt => this._toIterator('.',
                                 this.rootPath,
                                 rt.contents.items,
                                 rt.contents.prefixes)));
  }

  forChild(path: string, childName: string, parent: FolderIterator): Observable<FolderIterator>
  {
    const path$ = this._fileManagerService.getPath(`${path}/${childName}`);

    return path$.pipe(
      map(rt => this._toIterator(childName,
                                 this.rootPath,
                                 rt.contents.items,
                                 rt.contents.prefixes,
                                 parent)));
  }

  private _toIterator(name: string, base: string, items: IStorageReference[], subFolders: IStorageReference[], parent?: FolderIterator)
  {
    return new FolderIterator(name, base, items.map(item => item.name), subFolders.map(folder => folder.name), this, parent);
  }
}
