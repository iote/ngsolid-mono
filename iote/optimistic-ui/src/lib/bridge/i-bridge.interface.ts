import { DbMethods } from '@iote/cqrs';
import { IObject } from '@iote/bricks';
import { ICommand } from '@iote/cqrs';

import * as _ from 'lodash';

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

  abstract execute(command: C) : P[]

  run(command: C): IOptimisticEffect<P>[]
  {
    const events = this.execute(command).map(obj => this._createEvent(obj, command));

    this._eventsStore$$.add(events);

    setTimeout(() => this.revert(command), this._duration);

    return events;
  }

  revert(command: C): IOptimisticEffect<P>[]
  {
    const events = this.execute(command).map(obj => this._createEvent(obj, command));

    if(events.length)
      this._eventsStore$$.remove(events);

    return events;
  }

  private _createEvent(payload: P, command: C): IOptimisticEffect<P>
  {
    const obj = _.cloneDeep(payload);

    (obj as any).isOptimistic = true;

    (obj as any).del = command.method === DbMethods.DELETE;

    obj.createdOn = new Date();

    return {
      id: obj.id,
      createdOn: obj.createdOn,
      affectedStoreName: this._affectedStoreName,
      duration: this._duration,
      action: command.method,
      payload: obj
    }
  }
}

