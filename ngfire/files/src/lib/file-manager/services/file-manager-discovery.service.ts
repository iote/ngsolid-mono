import { Injectable } from '@angular/core';
import { __DateToStorage } from '@ngfire/time';
import { AngularFireStorage } from '@angular/fire/storage';
import { Logger } from '@iote/bricks-angular';

@Injectable()
export class FileManagerDiscoveryService
{
  constructor(private _storage: AngularFireStorage,
              private _logger: Logger)
  {}



}
