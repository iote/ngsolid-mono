import { ICommand } from '@iote/cqrs';
import { IBridgeFactory } from '@iote/optimistic-ui';
import { Injectable } from '@angular/core';

import { AngularFireFunctions } from '@angular/fire/functions';
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
  callFunctionOptimistic(fName: string, command: ICommand) {

    const toCall = this._fns.httpsCallable(fName);

    const effects = this._effectFactory.get(fName);

    // run effects
    effects.map(effectSimulator => effectSimulator.run(command.subject))

    return toCall(command.subject)
              .pipe(catchError(
                      (e) => {
                        effects.map(effectSimulator => effectSimulator.revert(command));
                        throw e;
                      }));1
  }

}
