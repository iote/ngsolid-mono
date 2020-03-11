import { AngularFireStorage } from '@angular/fire/storage';

export function __UploadFiles(storage: AngularFireStorage, root: string, files: FileList)
{
  const folder = storage.storage.ref().child(root);

  const uploads = [];

  for(let i = 0; i < files.length; i++) {
    const file = files.item(i);
    uploads.push(folder.child(file.name).put(files.item(i)));
  }

  return Promise.all(uploads);
}
