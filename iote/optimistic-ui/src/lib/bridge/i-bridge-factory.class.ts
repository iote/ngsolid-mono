import { IObject } from '@iote/bricks';
import { ICommand } from '@iote/cqrs';
import { IBridge } from './i-bridge.interface';

export abstract class IBridgeFactory
{
  abstract get<C extends ICommand<P>, P extends IObject>(fName: string): IBridge<C, P>[];
}
