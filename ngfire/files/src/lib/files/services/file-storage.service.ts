import { Injectable } from "@angular/core";

import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '@iote/bricks';
import {  Repository, UserService } from '@ngfire/angular';

import { IFile } from '../model/file.interface';

@Injectable()
export class FileStorageService
{
  private _fileRepository: Repository<IFile>;

  constructor(db: AngularFirestore, private _userService: UserService<User>)
  {
    this._fileRepository = new Repository<IFile>('files', db, this._userService);
  }

  createFileRef(path, name, type, description)
  {
    const file: any = { name, path, type };
    if (description)
      file.description = description;

    return this._fileRepository
               .create(file);
  }

}
