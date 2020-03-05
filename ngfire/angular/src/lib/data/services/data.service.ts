import { Injectable } from '@angular/core';

import { Repository } from '../repositories/repository.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../../auth/services/user.service';

import { IObject, User } from '@iote/bricks';

/**
 * Service that creates repositories.
 *
 * Goal: Override this class and create single point of database table configuration.
 */
@Injectable({ providedIn: 'root' })
export abstract class DataService {

  constructor(private _db: AngularFirestore,
              private _userService: UserService<User>)
  {}

  /**
   * Newer version of the data service.
   * It makes more sense to store collection names in the services responsible to manage them. We want to get rid
   * of collection definition bottleneck.
   *
   * @param collectionName: The collection name.
   */
  public getRepo<T extends IObject>(collectionName: string) {
    return this._createRepo<T>(collectionName);
  }

  private _createRepo<T extends IObject>(collectionName: string) {
    return new Repository<T>(collectionName, this._db, this._userService);
  }

}
