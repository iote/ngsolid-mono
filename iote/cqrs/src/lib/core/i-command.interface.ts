import { IObject } from "@iote/bricks";

export enum DbMethods {
  'CREATE',
  'UPDATE',
  'DELETE'
}

export interface ICommand<T extends IObject>{
  method:  DbMethods;
  /** Object to be simulated by optimistic ui*/
  subject: T;
}
