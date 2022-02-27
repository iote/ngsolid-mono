import { HandlerContext } from '@s4y/external/iote/cqrs';
import * as functions from 'firebase-functions';
import { FunctionContext } from './context.interface';


export interface HttpsContext extends FunctionContext
{
  request: functions.Request;
  response: functions.Response<any>;
}
