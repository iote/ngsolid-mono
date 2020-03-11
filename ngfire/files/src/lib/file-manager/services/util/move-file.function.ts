import { AngularFireStorage } from '@angular/fire/storage';

// src: https://stackoverflow.com/questions/38601548/how-to-move-files-with-firebase-storage
/**
 * Moves a file in firebase storage from its current location to the destination
 * returns the status object for the moved file.
 * @param {String} currentPath The path to the existing file from storage root
 * @param {String} destinationPath The desired pathe for the existing file after storage
 */
export function __MoveFirebaseFile(storage: AngularFireStorage, currentPath: string, destinationPath: string)
{
  const oldRef = storage.storage.ref().child(currentPath)

  return oldRef
        .getDownloadURL()
        .then(url => { fetch(url).then(htmlReturn => {
          let fileArray = new Uint8Array()
          const reader = htmlReturn.body.getReader()

          //get the reader that reads the readable stream of data
          reader
            .read()
            .then(
              function appendStreamChunk({ done, value }) {
                //If the reader doesn't return "done = true" append the chunk that was returned to us
                // rinse and repeat until it is done.
                if (value)
                  fileArray = mergeTypedArrays(fileArray, value)
                if (done)
                  return fileArray;
                else
                  // "Readout not complete, reading next chunk"
                  return reader.read().then(appendStreamChunk);
              })
            .then(file => {
                //Write the file to the new storage place
                const status = storage.storage.ref()
                                      .child(destinationPath)
                                      .put(file);
                //Remove the old reference
                oldRef.delete();

                return status;
              });
        });
    });
}

// src: https://stackoverflow.com/questions/14071463/how-can-i-merge-typedarrays-in-javascript
function mergeTypedArrays(a, b)
{
  // Checks for truthy values on both arrays
  if(!a && !b)
    throw new Error('Please specify valid arguments for parameters a and b.');

  // Checks for truthy values or empty arrays on each argument
  // to avoid the unnecessary construction of a new array and
  // the type comparison
  if(!b || b.length === 0) return a;
  if(!a || a.length === 0) return b;

  // Make sure that both typed arrays are of the same type
  if(Object.prototype.toString.call(a) !== Object.prototype.toString.call(b))
    throw new Error('The types of the two arguments passed for parameters a and b do not match.');

  const c = new a.constructor(a.length + b.length);
  c.set(a);
  c.set(b, a.length);

  return c;
}
