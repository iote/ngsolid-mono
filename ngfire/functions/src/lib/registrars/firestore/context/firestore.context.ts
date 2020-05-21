import { Context } from '../../../context/context.interface';
import { EventContext } from 'firebase-functions';

export interface FirestoreContext extends Context
{
  eventContext: EventContext;
}