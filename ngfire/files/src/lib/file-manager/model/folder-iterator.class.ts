import { map } from 'rxjs/operators';
import * as _ from 'lodash';

import { FolderIteratorFactory } from './folder-iterator-factory.class';

export class FolderIterator
{
  public expanding = false;

  constructor(public name: string,
              public path: string,
              public level: number,
              public isFolder: boolean,
              private _factory: FolderIteratorFactory,
              public parent: FolderIterator = null,
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

  isRoot = () => this.parent == null;
}
