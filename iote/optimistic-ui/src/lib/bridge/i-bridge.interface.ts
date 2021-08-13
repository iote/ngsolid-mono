import { DbMethods } from '@iote/cqrs';
import { IObject } from '@iote/bricks';
import { ICommand } from '@iote/cqrs';
import { BaseOptimisticEventsStore } from '../store/base-optimistic-event-store.class';

import { OptimisticEvent, OptimisticEventType } from './../model/optimistic-event.model';

export interface IBridge<C extends ICommand, P extends IObject>
{
  run(command: C): OptimisticEvent<P>[];

  revert(command: C): OptimisticEvent<P>[];
}

export abstract class Bridge<C extends ICommand, P extends IObject> implements IBridge<C, P>
{

  constructor(private _affectedStoreName: string,
              private _duration: number,
              private _eventsStore$$: BaseOptimisticEventsStore<P>)
  {
  }

  run(command: C): OptimisticEvent<P>[]
  {
    const events = this.execute(command).map(obj => this._createEvent(obj, command));

    this._eventsStore$$.add(events);

    return events;
  }

  revert(command: C): OptimisticEvent<P>[]
  {
    const events = this.execute(command).map(obj => this._createEvent(obj, command));

    this._eventsStore$$.remove(events);

    return events;
  }

  abstract execute(command: C) : P[]

  private _createEvent(obj: P, command: C): OptimisticEvent<P>
  {
    (obj as any).isOptimistic = true;

    if(command.method === DbMethods.DELETE)
    {
      (obj as any).del = true;
    }

    return {
      affectedStoreName: this._affectedStoreName,
      duration: this._duration,
      action: command.method,
      payload: obj
    }
  }
}

