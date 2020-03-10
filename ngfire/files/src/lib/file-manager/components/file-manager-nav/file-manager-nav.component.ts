import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage,  } from '@angular/fire/storage';

import { Logger } from '@iote/bricks-angular';

/**

 */
@Component({
  selector: 'ngfire-file-manager-nav',
  styleUrls: ['./file-manager-nav.component.scss'],
  templateUrl: './file-manager-nav.component.html'
})
export class FileManagerNavComponent implements OnInit
{
  constructor(private _storage: AngularFireStorage,
              private _logger: Logger)
  { }

  ngOnInit()
  {

  }

}
