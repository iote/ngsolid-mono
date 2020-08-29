import { FunctionRegistrar } from "../function-registrar.interface";
import * as functions from 'firebase-functions';

import { FunctionContext } from "../../context/context.interface";

/**
 * PubSub registrar.
 */
export class PubSubRegistrar<T> extends FunctionRegistrar<T, void>
{
  constructor(private _topic: string)
  { super(); }

  register(func: (dataSnap: any, context: any) => Promise<void>): functions.CloudFunction<functions.pubsub.Message>
  {
    return functions
            .pubsub.topic(this._topic)
            .onPublish((message: functions.pubsub.Message, context: functions.EventContext) => func(message, context));
  }

  before(message: any, context: any): { data: T, context: FunctionContext; }
  {
    const msg  = message as functions.pubsub.Message;
    const data = JSON.parse(Buffer.from(msg.data, 'base64').toString()) as T;

    return { data, context };
  }

  after(result: void, _: any): any {
    return;
  }

  onError(e: Error) {
    return new Promise((_) => { console.error(e.message); console.error(JSON.stringify(e.stack)); throw e; });
  }

}
