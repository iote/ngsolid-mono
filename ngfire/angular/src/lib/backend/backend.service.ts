import { Injectable } from '@angular/core';

import * as firebase from "firebase/app";
import 'firebase/functions';

import { from } from 'rxjs';

/**
 * Interface with the firebase backend.
 */
@Injectable({ providedIn: 'root' })
export class BackendService
{
  
  /**
   * Call Firebase Cloud Function
   * 
   * @param fName:  Function Name
   * @param params: Function Parameter Object
   */
  callFunction(fName: string, params: any) {
    const toCall = firebase.functions().httpsCallable(fName);

    return from(toCall(params));
  }

}
