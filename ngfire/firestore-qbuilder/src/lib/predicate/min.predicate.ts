import { Predicate } from "./predicate.interface";
import { Query as FirestoreQuery } from '@firebase/firestore-types';

export class MinPredicate extends Predicate
{
  constructor(private _fieldName: string, private _n?: number) {
    super('min');
  }

  build(query: FirestoreQuery): FirestoreQuery {
    return query.orderBy(this._fieldName, 'asc').limit(this._n ? this._n : 1);
  }

}
