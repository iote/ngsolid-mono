import { IObject } from '@s4y/external/iote/bricks';
import { Repository } from './repositories/repository.interface';

export interface DbFactory
{
  create<T extends IObject>(collection: string): Repository<T>;
}
