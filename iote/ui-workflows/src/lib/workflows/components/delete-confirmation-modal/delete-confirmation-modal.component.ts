import { Component, ViewEncapsulation, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'delete-confirmation-modal.component',
  templateUrl: 'delete-confirmation-modal.component.html',
  styleUrls: ['delete-confirmation-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DeleteConfirmationDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any)
  { }

  closeModal(result: boolean): void {
    this.dialogRef.close(result);
  }
}
