
export type IStorageReference = firebase.storage.Reference;
export type IStorageContents = firebase.storage.ListResult;

export interface IFolderReference {
  folder: IStorageReference;
  contents: IStorageContents;
}
