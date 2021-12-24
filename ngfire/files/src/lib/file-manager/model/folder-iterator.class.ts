import { map } from 'rxjs/operators';
import * as _ from 'lodash';

import { FolderIteratorFactory } from './folder-iterator-factory.class';
import { UploadTaskSnapshot, UploadTask } from '@angular/fire/storage/interfaces';

export class FolderIterator
{
  public expanding = false;

  constructor(public name: string,
              public path: string,
              public level: number,
              public isFolder: boolean,
              private _factory: FolderIteratorFactory,
              public parent: FolderIterator | null = null,
              public hasExpanded: boolean = false,
              public children: FolderIterator[] = [])
  { }

  expand()
  {
    if(!this.hasExpanded)
    {
      return this._factory
                 .getChildren(this)
                 .pipe(map(children =>{ this.children = children ? children : this.children; this.hasExpanded = true; }));
    }
    return;
  }

  updateName(newName: string, newType: string) {

    const oldPath = this.path;

    const split = this.path.split('/');
    split.pop();
    split.push(`${newName}.${newType}`);
    const newPath = split.join('/');

    return this._factory.movePath(oldPath, newPath)
               .pipe(map(() => {
                 this.path = newPath;
                 this.name = `${newName}.${newType}`;
               }));

  }

  downloadUrl() {
    return this._factory.downloadUrl(this);
  }

  upload(files: FileList)
  {
    return this._factory
               .upload(this, files)
               .pipe(map((doneFiles : UploadTaskSnapshot[]) => {
                  const nChildren= this._factory.getChildrenFromUpload(this, doneFiles);
                  this.children = this.children.concat(nChildren);
                  return this;
                }));
  }

  delete()
  {
    if(this.parent == null)
      throw new Error('Root element cannot be deleted');

    return this._factory
               .deleteChild(this.parent, this);
  }

  addFolder(name: string) {
    return this._factory.addChildFolder(this, name);
  }

  isRoot = () => this.parent == null;
}
