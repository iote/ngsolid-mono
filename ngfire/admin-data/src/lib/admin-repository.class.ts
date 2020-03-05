import { FirebaseFirestore } from '@firebase/firestore-types'

import { IObject } from '@iote/bricks';
import { Repository } from '@iote/cqrs';
import { Query } from '@ngfire/firestore-qbuilder';

/**
 * Repository to be used inside of Firebase Functions.
 *
 * Admin powered.
 */
export class AdminRepository<T extends IObject> implements Repository<T>
{
  constructor(private _collectionName: string,
              private _db: FirebaseFirestore)
  { }

  public getDocumentById(id: string): Promise<T>
  {
    return this._db.collection(this._collectionName)
                   .doc(id).get()
                   .then(d => {
                      const obj = <T> d.data();
                      obj.id = id;
                      return obj;
                    });
  }

  public getDocuments(query: Query): Promise<T[]>
  {
    return <Promise<T[]>>
      query.__buildForFireStore(this._db.collection(this._collectionName))
           .get()
           .then(this._mergeWithDocId);
  }

  public create(data: T): Promise<T>
  {
    data.createdOn = new Date();

    if(!data.createdBy)
      // Watch out for race conditions. Not single threaded, should find safer RNG
      data.createdBy = 'admin-' + data.createdOn.getTime();

    return this._db.collection(this._collectionName)
                   .add(data)
                   // All values filled here. Safe since will return catch clause on error.
                   .then(v => {
                      data.id = v.id;
                      return data;
                    });
  }

  public update(t: T): Promise<T>
  {
    if (!t.id)
      throw new Error("Trying to update POJO-object. Need active document with database id.");

    t.updatedOn = new Date();

    return this._db.collection(this._collectionName)
                        .doc(t.id)
                        .update(t)
                        .then(wr => t);
  }

  delete(id: string): Promise<boolean>
  {
    return this._db.collection(this._collectionName)
                   .doc(id)
                   .delete()
                   .then(() => true)
                   .catch(() => false);
  }

  /**
   * Gets documents owned by user (user_id field == uid).
   */
  public getUserDocuments(query = new Query(), uid: string): Promise<T[]>
  {
    query.where('createdBy', '==', uid);

    return this.getDocuments(query);
  }

  /** By default, Firebase does not store document id. We therefore merge documents with their id. */
  private _mergeWithDocId(actions: any) : T[]
  {
    return actions.docs.map((a: any) => {
      const data = <T> a.data();
            data.id = a.id;

      return data;
    });
  }
}
