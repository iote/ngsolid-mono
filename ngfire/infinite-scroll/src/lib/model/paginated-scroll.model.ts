import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { scan, take, tap } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IObject } from '@iote/bricks';

import { PaginationConfig } from './pagination-config.interface';

/**
 * Model for a paginated endless scroll linked to the DB.
 *
 * Used in e.g. scrolling through the chats.
 *
 * @see https://fireship.io/lessons/infinite-scroll-firestore-angular/ - Inspiration for this design.
 *
 * @export
 * @class PaginatedScroll
 */
@Injectable()
export class PaginatedScroll<T extends IObject>
{
  // Source data
  private _done = new BehaviorSubject(false);
  private _loading = new BehaviorSubject(false);
  private _data = new BehaviorSubject([]);

  private query: PaginationConfig;

  // Observable data
  data: Observable<T[]>;
  done: Observable<boolean> = this._done.asObservable();
  loading: Observable<boolean> = this._loading.asObservable();


  constructor(private _afs: AngularFirestore,
              path: string, field: string, opts?: any)
  {
    this._init(path, field, opts);
  }

  private _init(path: string, field: string, opts?: any)
  {
    // Initial query sets options and defines the Observable
    // passing opts will override the defaults
    this.query = { path, field,
      limit: 10,
      reverse: false,
      prepend: false,
      ...opts };

    const first = this._afs.collection(this.query.path, ref => {
      return ref
              .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
              .limit(this.query.limit);
    });

    this._mapAndUpdate(first)

    // Create the observable array for consumption in components
    this.data = this._data.asObservable()
                          // Scan reducer - https://www.learnrxjs.io/learn-rxjs/operators/transformation/scan
                          .pipe(scan((acc, val: T[]) => this.query.prepend
                            	  	                              ? val.concat(acc)
                                                                : acc.concat(val)));
  }

  // Retrieves additional data from firestore
  more()
  {
    const cursor = this.getCursor();

    const more = this._afs.collection(this.query.path, ref => {
      return ref
              .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
              .limit(this.query.limit)
              .startAfter(cursor);
    });

    this._mapAndUpdate(more);
  }


  // Determines the doc snapshot to paginate query
  private getCursor()
  {
    const current = this._data.value;

    if (current.length)
    {
      return this.query.prepend ? current[0].doc
                                : current[current.length - 1].doc;
    }

    return null;
  }

  // Maps the snapshot to usable format the updates source
  private _mapAndUpdate(col: AngularFirestoreCollection<any>) : Subscription
  {
    if (this._done.value || this._loading.value)
      return;

    // loading
    this._loading.next(true);

    // Map snapshot with doc ref (needed for cursor)
    return col.snapshotChanges()
              .pipe(tap(arr => {
                let values = arr.map(snap => {
                  const data = snap.payload.doc.data();
                  const doc = snap.payload.doc;
                  return { ...data, doc }
                });

                // If prepending, reverse the batch order
                values = this.query.prepend ? values.reverse()
                                            : values;

                // update source with new values, done loading
                this._data.next(values);
                this._loading.next(false);

                // no more values, mark done
                if (!values.length)
                  this._done.next(true);
              }),
              take(1))
            .subscribe();
  }

}
