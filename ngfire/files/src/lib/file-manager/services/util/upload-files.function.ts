import { AngularFireStorage } from '@angular/fire/storage';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';

export function __UploadFiles(storage: AngularFireStorage, root: string, files: FileList) : Promise<UploadTaskSnapshot[]>
{
  const folder = storage.storage.ref().child(root);

  const uploads = [];

  for(let i = 0; i < files.length; i++) {
    const file = files.item(i);

    if(file && files.item)
      uploads.push(folder.child(file.name).put(file));
  }

  return Promise.all(uploads);
}
