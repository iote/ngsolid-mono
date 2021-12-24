import { Query as FirestoreQuery } from '@firebase/firestore-types';
import { Predicate } from "./predicate.interface";

export class SkipTakePredicate extends Predicate
{
  constructor(private _startAt: number, private _n: number) {
    super('skip-take');
  }

  build(query: FirestoreQuery): FirestoreQuery {
    return query.startAt(this._startAt).limit(this._n);
  }

}
