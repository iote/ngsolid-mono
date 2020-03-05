import { Query as FirestoreQuery } from '@firebase/firestore-types';

export type PredicateType = 'where' | 'and' | 'orderBy' | 'limit' | 'min' | 'max';

export abstract class Predicate {

  public readonly type: PredicateType;

  constructor(type: PredicateType) {
    this.type = type;
  }
  
  abstract build(query: FirestoreQuery): FirestoreQuery;
}
