import { IObject } from '@iote/bricks';

export interface OptimisticEffect extends IObject
{
  isOptimistic: boolean;

  shouldDelete?: boolean;
}
