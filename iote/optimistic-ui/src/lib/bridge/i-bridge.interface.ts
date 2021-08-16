import { DbMethods } from '@iote/cqrs';
import { IObject } from '@iote/bricks';
import { ICommand } from '@iote/cqrs';
import { IOptimisticEffectsStore } from '../store/i-optimistic-effects-store.class';

import { IOptimisticEffect } from './../model/i-optimistic-effect.model';

export interface IBridge<C extends ICommand<P>, P extends IObject>
{
  run(command: C): IOptimisticEffect<P>[];

  revert(command: C): IOptimisticEffect<P>[];
}

export abstract class Bridge<C extends ICommand<P>, P extends IObject> implements IBridge<C, P>
{

  constructor(private _affectedStoreName: string,
              private _duration: number,
              private _eventsStore$$: IOptimisticEffectsStore<P>)
  {
  }

  run(command: C): IOptimisticEffect<P>[]
  {
    const events = this.execute(command).map(obj => this._createEvent(obj, command));

    this._eventsStore$$.add(events);

    return events;
  }

  revert(command: C): IOptimisticEffect<P>[]
  {
    const events = this.execute(command).map(obj => this._createEvent(obj, command));

    this._eventsStore$$.remove(events);

    return events;
  }

  abstract execute(command: C) : P[]

  private _createEvent(obj: P, command: C): IOptimisticEffect<P>
  {
    (obj as any).isOptimistic = true;

    if(command.method === DbMethods.DELETE)
    {
      (obj as any).del = true;
    }

    return {
      id: obj.id,
      createdOn: new Date(),
      affectedStoreName: this._affectedStoreName,
      duration: this._duration,
      action: command.method,
      payload: obj
    }
  }
}

