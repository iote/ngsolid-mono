import { HandlerContext } from '@iote/cqrs';

/** Execution context.
 *
 * @see https://firebase.google.com/docs/reference/functions/functions.EventContext
 *  - For all possible build-in functionalities.
 */
export interface FunctionContext extends HandlerContext {

  isAuthenticated: boolean;
  userId: string;

  eventContext: any;
  params?: any;
}
