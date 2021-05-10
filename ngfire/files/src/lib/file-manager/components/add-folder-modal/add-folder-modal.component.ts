import {Component, EventEmitter, OnInit, Input, Output, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslocoLoader, Translation, TRANSLOCO_LOADER } from '@ngneat/transloco';



import * as _ from 'lodash';
import { Logger } from '@iote/bricks-angular';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'ngfire-add-folder-modal',
  styleUrls: ['./add-folder-modal.component.scss'],
  templateUrl: './add-folder-modal.component.html',
})
/** Creates a bill/invoice =  a debit towards a supplier. */
export class AddFolderModalComponent implements OnInit
{
  
  @Output() folderNamed = new EventEmitter<string>();
  

  // Form Data
  createFolderForm: FormGroup;
  
 
  constructor(private _fb: FormBuilder,
              private _dialogRef: MatDialogRef<AddFolderModalComponent>,
              @Inject(MAT_DIALOG_DATA) private _data: any,
              private _logger: Logger)
  {}

  ngOnInit()
  {
    this.createFolderForm = this._fb.group({
      name: ['', [Validators.required,Validators.maxLength(30)]]
    });
  }
   
  // --
  // Create Bill

  createFolder(frm)
  {
    if(this.createFolderForm.valid)
    {
      this._dialogRef.close(frm.name);
    }
  }
  
  exitModal = () => this._dialogRef.close();

}
