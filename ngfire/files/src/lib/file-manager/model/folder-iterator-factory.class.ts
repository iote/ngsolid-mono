import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IStorageReference } from '../file-manager-types.types';
import { FolderIterator } from './folder-iterator.class';

import { FileManagerService } from '../services/file-manager.service';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';

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
      map(rt =>{                              // filter out folders stubs (.keep files are used to keep folder structures intact)
        const fileChildren = rt.contents.items.filter(f => f.name !== '.keep')
                               .map(item => new FolderIterator(item.name, `${parent.path}/${item.name}`, parent.level + 1, false, this));
        const folderChildren = rt.contents.prefixes.map(item => new FolderIterator(item.name, `${parent.path}/${item.name}`, parent.level + 1, true, this));

        const together = folderChildren.concat(fileChildren);
        together.forEach(ch => { ch.parent = parent });
        return together;
      }));
  }

  downloadUrl(item: FolderIterator) {
    return this._fileManagerService.getDownloadUrl(item.path);
  }

  upload(item: FolderIterator, files: FileList) {
    return this._fileManagerService.uploadToFoler(item.path, files)
  }

  getChildrenFromUpload(item: FolderIterator, doneFiles: UploadTaskSnapshot[])
  {
    const done = doneFiles.filter(d => d.state === 'success');

    return done.map(f => new FolderIterator(f.metadata.name, `${item.path}/${f.metadata.name}`, item.level + 1, false, this, item));
  }

  deleteChild(parent: FolderIterator, child: FolderIterator)
  {
    const childPath = child.path;
    // Sever connection between parent and child. This will in the near term result in gc (garbage collection) of the child.
    parent.children = parent.children.filter(ch => ch.path !== childPath);

    return this._fileManagerService.delete(childPath);
  }

  movePath(oldPath, newPath) {
    return this._fileManagerService.movePath(oldPath, newPath);
  }

}
