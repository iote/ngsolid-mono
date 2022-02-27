import { IObject } from "@s4y/external/iote/bricks";

export interface IFile extends IObject
{
  path:    string;

  type: 'image' | 'any' /* | otherType | ... */;

  name: string;
  description: string;
}
