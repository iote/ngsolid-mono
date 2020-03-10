import { FolderIterator } from '../../model/folder-iterator.class';

export class FileManagerCrumb
{
  name: string;
  position: FolderIterator;
  last?: boolean;
}
