import { ICommand } from '@iote/cqrs';
import { IBridgeFactory } from '@iote/optimistic-ui';
import { Injectable } from '@angular/core';

import { AngularFireFunctions } from '@angular/fire/functions';
import { catchError } from 'rxjs/operators';
import { BackendService } from './backend.service';
import { of } from 'rxjs';
import { IObject } from '@iote/bricks';
import { AngularFirestore } from '@angular/fire/firestore';

/**
 * Interface with the firebase backend.
 */
@Injectable({ providedIn: 'root' })
export class OptimisticBackendService extends BackendService
{
  constructor(_fns: AngularFireFunctions,
              private _afs: AngularFirestore,
              private _effectFactory: IBridgeFactory)
  {
    super(_fns);
  }

  /**
   * Call Firebase Cloud Function and simulate frontend effects
   */
  callFunction<T extends IObject>(fName: string, command: ICommand<T>) {
    // Assign Id
    command.subject.id = command.subject.id ?? this._afs.createId();

    const uiEffectBridges = this._effectFactory.get(fName);

    // Run effects
    const effects = uiEffectBridges.map(effectsBridge => effectsBridge.run(command));

    // Call backend
    const toCall = this._fns.httpsCallable(fName);

    return toCall(command)
              .pipe(catchError(
                      (e) => {
                        uiEffectBridges.map(effectsBridge => effectsBridge.revert(command));
                        throw e;
                      }));
  }

}
