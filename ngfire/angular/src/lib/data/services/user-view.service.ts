import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../../auth/services/user.service';

import { UserViewRepository } from '../repositories/userview-repository.model';
import { IUserObject, User } from '@s4y/external/iote/bricks';

/**
 * Service that creates UserView Repositories
 *
 * Goal: Have single point of UserView database table configuration.
 */
@Injectable({ providedIn: 'root' })
export class UserViewService {

  constructor(private _db: AngularFirestore,
              private _userService: UserService<User>)
  {}

  public createRepo<T extends IUserObject>(collectionName: string) {
    return new UserViewRepository<T>(collectionName, this._db, this._userService);
  }
}
