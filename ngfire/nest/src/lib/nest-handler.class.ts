import { Handler, HandlerContext, HandlerTools, getLogger } from '@iote/cqrs';
import { AdminRepositoryFactory } from '@ngfire/admin-data';

/**
 * Handler of an event T. Executes logic
 *
 * @param T: The data expected by the function
 * @param R: The result returned from the function
 */
export abstract class NestHandler<T, R> extends Handler<T>
{
  public executeHandler(data: T, context?: HandlerContext)
  {
    return this.execute(data, context ? context : {}, this._createTools());
  }

  /** Contains the actual logic */
  public abstract execute(data: T, context: HandlerContext, tools: HandlerTools): Promise<R>;

  private _createTools(): HandlerTools
  {
    return {
      Logger: getLogger({ production: false }),
      getRepository: AdminRepositoryFactory.create
    };
  }
}
