import { FirestoreRegistrar } from './firestore.registrar';
import * as functions from 'firebase-functions';
import { FIREBASE_REGIONS } from '../regions.type';

/**
 * Firestore registrar.
 */
export class FirestoreDeleteRegistrar<T, R> extends FirestoreRegistrar<T, R>
{
  /**
   *  Firestore registration. For registering a function that listens to an on-delete firestore event.
   *
   * @param documentPath - Path to document e.g. 'prospects/{prospectId}'.
   *                       Can be more extensive path e.g. repository of subcollections.
   */
  constructor(documentPath: string, private _region: FIREBASE_REGIONS = 'europe-west1') { super(documentPath); }

  register(func: (dataSnap: any, context: any) => Promise<R>): functions.CloudFunction<any>
  {
    return functions.region(this._region)
                    .firestore.document(this._documentPath)
                    .onDelete(func);
  }

}
