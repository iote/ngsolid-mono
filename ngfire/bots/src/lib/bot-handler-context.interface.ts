import { HandlerContext } from '@s4y/external/iote/cqrs';

export interface BotHandlerContext extends HandlerContext {
  bot: any;
}
