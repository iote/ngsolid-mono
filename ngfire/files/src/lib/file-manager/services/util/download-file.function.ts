import { AngularFireStorage } from '@angular/fire/storage';

export function __FileDownloadUrl(storage: AngularFireStorage, path: string)
{
  return storage.storage.ref().child(path).getDownloadURL();
}
