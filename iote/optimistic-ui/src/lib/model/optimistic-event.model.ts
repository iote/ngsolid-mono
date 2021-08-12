import { IObject } from '@iote/bricks';

export enum OptimisticEventType{
  create = 'Create',
  update = 'Update',
  delete = 'Delete'
}

export interface OptimisticEvent extends IObject{

  /** affectedStoreName: Name of the store that needs to be updated */
  affectedStoreName: string;

  /** duration(in milliseconds) after which the optimistic ui change needs to be reverted */
  duration: number;

  /** Type of action (Either a create, update, or delete) */
  actionType: OptimisticEventType,

  /** Object to be affected by the event action */
  payload: any
}
