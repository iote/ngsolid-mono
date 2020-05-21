import { FirestoreRegistrar } from './firestore.registrar';
import { CloudFunction, firestore } from 'firebase-functions';

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
  constructor(documentPath: string) { super(documentPath); }

  register(func: (dataSnap: any, context: any) => Promise<R>): CloudFunction<any>
  {
    return firestore.document(this._documentPath)
                    .onDelete(func);
  }

}