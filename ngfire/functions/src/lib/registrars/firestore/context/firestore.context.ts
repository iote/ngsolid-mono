import { FunctionContext } from '../../../context/context.interface';
import { EventContext } from 'firebase-functions';

export interface FirestoreContext extends FunctionContext
{
  eventContext: EventContext;
}
