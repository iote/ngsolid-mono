import { IObject } from '@iote/bricks';
import { Query } from '@ngfire/firestore-qbuilder';

/**
 * Repository to be used inside of Handlers.
 */
export interface Repository<T extends IObject>
{
  getDocumentById(id: string): Promise<T>;
  getDocuments(query: Query): Promise<T[]>;

  create(data: T, id?: string, extendId?: boolean): Promise<T>;
  update(t: T): Promise<T>;
  delete(id: string): Promise<boolean>;

  /** Gets documents owned by user (user_id field == uid). */
  getUserDocuments(query: Query, uid: string): Promise<T[]>;
}
