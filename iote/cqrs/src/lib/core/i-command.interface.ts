export enum DbMethods {
  'CREATE',
  'UPDATE',
  'DELETE'
}

export interface ICommand{
  method:  DbMethods;
  /** Object to be simulated by optimistic ui*/
  subject: any
}
