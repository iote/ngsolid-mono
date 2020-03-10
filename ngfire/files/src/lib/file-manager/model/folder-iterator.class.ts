import { Observable, of } from 'rxjs';
import { take, map } from 'rxjs/operators';

import * as _ from 'lodash';

import { FolderIteratorFactory } from './folder-iterator-factory.class';

export class FolderIterator
{
  private _childrenExpanded: FolderIterator[] = [];

  constructor(public name: string,
              public path: string,
              public files: string[],
              private _children: string[],
              private _factory: FolderIteratorFactory,
              private _parent?: FolderIterator)
  { }

  expand(childName: string): Observable<FolderIterator>
  {
    if(this._children.find(ch => ch === childName) )
    {
      const eChild =  this._childrenExpanded.find(ch => ch.name === childName);
      if(!eChild)
      {
        const expanded$ = this._factory.forChild(this.path, childName, this);

        return expanded$.pipe(take(1),
                              map(exp => { this._childrenExpanded.push(exp); return exp; }));
      }
      else return of(eChild);
    }

    else throw new Error('Child is not known.');
  }

  getChildren()
  {
    return this._children.map(child => { const exp = this._childrenExpanded.find(e => e.name = child);
                                         return exp ? exp : child; });
  }

  parent(): FolderIterator
  {
    if(this._parent)
      return this._parent;

    throw new Error('Parent is not known. Already in root element');
  }

  isRoot = () => this.parent != null;
}
