import { Injectable } from '@angular/core';

import { AngularFireFunctions } from '@angular/fire/functions';

/**
 * Interface with the firebase backend.
 */
@Injectable({ providedIn: 'root' })
export class BackendService
{
  constructor(private _fns: AngularFireFunctions) { }

  /**
   * Call Firebase Cloud Function
   *
   * @param fName:  Function Name
   * @param params: Function Parameter Object
   */
  callFunction(fName: string, params: any) {
    const toCall = this._fns.httpsCallable(fName);

    return toCall(params);
  }

}
