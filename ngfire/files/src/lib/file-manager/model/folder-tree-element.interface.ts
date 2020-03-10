import { FolderIterator } from './folder-iterator.class';

export interface FolderTreeElement
{
  isFile: boolean;
  name: string;

  hasExpanded?: boolean;
  expansion?: FolderIterator;
}
