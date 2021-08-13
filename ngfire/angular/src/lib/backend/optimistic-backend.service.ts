import { ICommand } from '@iote/cqrs';
import { OptimisticEvent, IBridgeFactory } from '@iote/optimistic-ui';
import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BackendService } from './backend.service';

/**
 * Interface with the firebase backend.
 */
@Injectable({ providedIn: 'root' })
export class OptimisticBackendService extends BackendService
{
  constructor(_fns: AngularFireFunctions,
              private _effectFactory: IBridgeFactory)
  {
    super(_fns);
  }

  /**
   * Call Firebase Cloud Function and simulate frontend effects
   */
  callFunctionOptimistic(command: ICommand) {

    const toCall = this._fns.httpsCallable(command.fName);

    const effects = this._effectFactory.get(command.fName);

    // run effects
    effects.map(effectSimulator => effectSimulator.run(command.payload))

    return toCall(command.payload)
              .pipe(catchError(
                      (e) => {
                        effects.map(effectSimulator => effectSimulator.revert(command));
                        throw e;
                      }));1
  }

}
