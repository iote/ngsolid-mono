import {Component, EventEmitter, OnInit, Input, Output, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, ControlContainer } from '@angular/forms';
import { ValidatorFn, AbstractControl } from '@angular/forms';

import * as _ from 'lodash';
import { Logger } from '@s4y/external/iote/bricks-angular';
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
    debugger
    console.log(this._data)
    this.createFolderForm = this._fb.group({
      name: ['', [Validators.required, this.ValidateExisting(this._data.names)]]
      });
      debugger
    this.createFolderForm.get('name').valueChanges.subscribe(event => {
      this.createFolderForm.get('name').setValue(event.toLowerCase(), {emitEvent: false});

  });
}

 
// Create Bill
  createFolder(frm)
  {
    if(this.createFolderForm.valid)
    {
       this._dialogRef.close(frm.name);
    }
  }

  exitModal = () => this._dialogRef.close();
  
  ValidateExisting(names: string[]): ValidatorFn
  {
    const namesArray = names.map(name => name.toLowerCase());
      return (control: AbstractControl): { [key: string]: any } | null => {
          const returnVal = namesArray.includes(control.value)
                              ? { nameExists: true} as ValidationErrors
                              : null;
          
          return returnVal
     }
    }
    get name() { return this.createFolderForm.get('name'); }

  }