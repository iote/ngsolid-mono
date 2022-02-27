import { Handler, HandlerTools, getLogger } from '@s4y/external/iote/cqrs';
import { AdminRepositoryFactory } from '@s4y/external/ngfire/admin-data';
import { BotHandlerContext } from './bot-handler-context.interface';
/**
 * Handler of a message T. Executes logic
 *
 * @param T: The data expected by the function
 * @param R: The result returned from the function
 */
export abstract class BotMessageHandler<T, R> extends Handler<T>
{
  public executeHandler(data: T, context: BotHandlerContext)
  {
    return this.execute(data, context, this._createTools());
  }

  /** Contains the actual logic */
  public abstract execute(data: T, context: BotHandlerContext, tools: HandlerTools): Promise<R>;

  protected _createTools(): HandlerTools
  {
    return {
      Logger: getLogger({ production: false }),
      getRepository: AdminRepositoryFactory.create
    };
  }
}
