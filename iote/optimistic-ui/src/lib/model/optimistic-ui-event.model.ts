export enum UIEventType{
  create = 'CREATE',
  update = 'UPDATE',
  delete = 'DELETE'
}

export interface OptimisticUiEvent<T>{

  /** affectedStoreName: Name of the store that needs to be updated */
  affectedStoreName: string;

  /** duration(in milliseconds) after which the optimistic ui change needs to be reverted */
  duration: number;

  /** Type of action (Either a create, update, or delete) */
  actionType: UIEventType,

  payload: T
}
