export enum DbMethods {
  'CREATE',
  'UPDATE',
  'DELETE'
}

export interface ICommand{
  /** Cloud function name */
  fName: string;

  /** Function Handler data */
  payload: any;

  method:  DbMethods;
}
