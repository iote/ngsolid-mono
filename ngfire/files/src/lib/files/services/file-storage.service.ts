import { Injectable } from "@angular/core";

import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '@s4y/external/iote/bricks';
import {  Repository, UserService } from '@s4y/external/ngfire/angular';

import { IFile } from '../model/file.interface';
import { AngularFireStorage } from '@angular/fire/storage';




@Injectable()
export class FileStorageService
{
  private _fileRepository: Repository<IFile>;



  constructor(db: AngularFirestore, private _userService: UserService<User>, private fireStorage: AngularFireStorage)
  {
    this._fileRepository = new Repository<IFile>('files', db, this._userService);
  }




  uploadSingleFile(event: any, n: number) {
    const file = event.target.files[0];
    const task = this.fireStorage.upload(`profileImages/${n}`, file);
    return task.snapshotChanges()
  }

  createFileRef(path: string, name: string, type: any, description:string)
  {
    const file: any = { name, path, type };
    if (description)
      file.description = description;

    return this._fileRepository
               .create(file);
  }

}
