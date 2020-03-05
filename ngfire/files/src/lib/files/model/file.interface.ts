import { IObject } from "@iote/bricks";

export interface IFile extends IObject
{
  path:    string;

  type: 'image' | 'any' /* | otherType | ... */;

  name: string;
  description: string;
}
