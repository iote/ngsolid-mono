import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IStorageReference } from '../file-manager-types.types';
import { FolderIterator } from './folder-iterator.class';

import { FileManagerService } from '../services/file-manager.service';

export class FolderIteratorFactory
{
  constructor(public rootPath: string,
              private _fileManagerService: FileManagerService,
              public rootPathName?: string)
  { }

  root(): Observable<FolderIterator>
  {
    const root$ = this._fileManagerService.getRootRef(this.rootPath);

    return root$.pipe(
      map(rt => this._toRootIterator(this.rootPathName ? this.rootPathName : '.',
                                     this.rootPath,
                                     0,
                                     rt.contents.items,
                                     rt.contents.prefixes)));
  }

  private _toRootIterator(name: string, base: string, level: number, items: IStorageReference[], subFolders: IStorageReference[])
  {
    const root = new FolderIterator(name, base, level, true, this);

    const fileChildren = items.map(item => new FolderIterator(item.name, `${base}/${item.name}`, level + 1, false, this, root));
    const folderChildren = subFolders.map(item => new FolderIterator(item.name, `${base}/${item.name}`, level + 1, true, this, root));

    const together = folderChildren.concat(fileChildren);
    root.children = together;

    return root;
  }

  getChildren(parent: FolderIterator): Observable<FolderIterator[]>
  {
    const path$ = this._fileManagerService.getPath(parent.path);

    return path$.pipe(
      map(rt =>{
        const fileChildren = rt.contents.items.map(item => new FolderIterator(item.name, `${parent.path}/${item.name}`, parent.level + 1, false, this));
        const folderChildren = rt.contents.prefixes.map(item => new FolderIterator(item.name, `${parent.path}/${item.name}`, parent.level + 1, true, this));

        const together = folderChildren.concat(fileChildren);
        together.forEach(ch => { ch.parent = parent });
        return together;
      }));
  }

  movePath(oldPath, newPath) {
    return this._fileManagerService.movePath(oldPath, newPath);
  }

}
