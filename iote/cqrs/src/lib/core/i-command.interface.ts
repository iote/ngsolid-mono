export enum DbMethods {
  'CREATE',
  'UPDATE',
  'DELETE'
}

export interface ICommand{
  /** Function Handler data */
  payload: any;

  method:  DbMethods;
  /** Object to be simulated by optimistic ui*/
  subject: any
}
