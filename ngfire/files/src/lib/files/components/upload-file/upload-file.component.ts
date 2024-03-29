import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

import { SubSink } from 'subsink';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Logger } from '@iote/bricks-angular';

import { IFile } from '../../model/file.interface';
import { FileStorageService } from '../../services/file-storage.service';

/**
 * Upload file component. Files are stored in a separate collection but also returned to the parent component.
 *
 * Inputs:
 *   title? - Input card title
 *   types?  - ['image', 'pdf'] | ['any'] | ..
 *
 * Outputs:
 *   fileUploaded(): IFile - Returns the file active record.
 *                           To be stored as reference on parent (just store as id)
 *                             or to be stored as part of parent doc.
 */
@Component({
  selector: 'brick-upload-file',
  styleUrls: ['./upload-file.component.scss'],
  templateUrl: './upload-file.component.html'
})
export class UploadFileComponent implements OnInit, OnDestroy
{
  private _sbS = new SubSink();

  @Input()  title = 'Upload a file';
  @Input()  types: string[] = ['any'];

  uploadedType: string;

  @Input() filePath: string;
  @Input() prepareFilePathFn: (s: string) => string;

  fileName: string;
  description: string;

  @Output() fileUploaded = new EventEmitter<IFile>();

  // eslint-disable-next-line @angular-eslint/no-output-native
  error: string | null;

  @Input() defaultAttachment: { link: string, name: string, type: string };

  percentage$ : Observable<any>;
  snapshot$   : Observable<any>;
  downloadURL$: Observable<any>;

  constructor(private _logger: Logger,
              private _storage: AngularFireStorage,
              private _fileStorageService: FileStorageService)
  { }

  ngOnInit(){
    if (this.defaultAttachment)
    {
      this.downloadURL$ = of(this.defaultAttachment.link);
      this.uploadedType = this.defaultAttachment.type;
      this.fileName = this.defaultAttachment.name;
    }
  }

  /** uploadImage - Uploads an image to firestorage and firestore. */
  uploadImage(event: any)
  {
    if (this.error)
      this.error = null;

    const file = event.target.files[0];
    this.fileName = file.name;
    if (this._validateUpload(file))
      this._doUpload(file);
  }

  _validateUpload(file: any)
  {
    this.uploadedType = this._getFileType(file);

    const isValid = this.types === ['any'] || this.types.includes(this.uploadedType)
                      ? true
                      : this._validationError(`Error uploading file. Only files of ${this.types.join('/ ')} format allowed.`);

    return isValid;

  }

  private _doUpload(file: any)
  {
    // Create a unique path for the file
    let path = `files/${new Date().getTime()}_${file.name}`;

    // Override created path if one was already specified or a path creation function is specified.
    if (this.filePath)
      path = this.filePath;
    if (this.prepareFilePathFn)
      path = this.prepareFilePathFn(path);

    const fileRef = this._storage.ref(path);

    const task = this._storage.upload(path, file);
    this.percentage$ = task.percentageChanges();

    // get notified when the download URL is available
    this._sbS.sink = task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL$ = fileRef.getDownloadURL();

        // Save the path and name of the image to the firestore database
        this._sbS.sink = this._fileStorageService
                             .createFileRef(path, file.name, this.uploadedType, this.description)
                             .subscribe(storedFile => this._fileCreated({ file: storedFile, downloadLink: this.downloadURL$ }));

        this._logger.log(() => `The upload was successful ${ this.downloadURL$ }.`);
      })
    )
    .subscribe(_ => this._logger.log(() => "Upload done."));
  }

  private _fileCreated(storedFile: any)
  {
    this._logger.log(() => `Saved to Firestore successfully. Fileref: ${storedFile.file.name} | Filepath: ${storedFile.file.path}`);

    this.fileUploaded.emit(storedFile);
  }

  private _validationError(eMsg: any)
  {
    this._logger.log(() => eMsg);
    this.error = eMsg;
    return false;
  }

  private _getFileType(file: any)
  {
    if (file.type.split('/')[0] === 'image')
      return 'image';
    else if (file.type.split('/')[1] === 'pdf')
      return 'pdf';
    else
      return 'any';
  }

  ngOnDestroy()
  {
    this._sbS.unsubscribe();
  }

}
