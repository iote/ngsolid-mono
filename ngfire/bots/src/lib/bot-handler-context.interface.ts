import { HandlerContext } from '@iote/cqrs';

export interface BotHandlerContext extends HandlerContext {
  bot: any;
}
