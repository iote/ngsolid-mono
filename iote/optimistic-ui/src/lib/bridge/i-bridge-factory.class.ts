import { IObject } from '@iote/bricks';
import { ICommand } from '@iote/cqrs';
import { IBridge } from './i-bridge.interface';

export interface IBridgeFactory
{
  get<C extends ICommand, P extends IObject>(fName: string): IBridge<C, P>[];
}
