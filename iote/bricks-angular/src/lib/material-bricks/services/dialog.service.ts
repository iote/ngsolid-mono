import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

/**
 * Service that shows a Dialog to the user, to create or edit objects.
 * 
 * Uses Angular Material Dialog internally: https://material.angular.io/components/dialog/overview
 */
@Injectable()
export class DialogService {

    constructor(private _dialog: MatDialog) { }

    showDialog(dialogClass, data?) {
        let dialogData = {};
        if (data) {
            dialogData = data;
        }
        const dialogRef = this._dialog.open(dialogClass, {
            width: '400px',
            data: dialogData
        });

        dialogRef.afterClosed().subscribe(result => {
        });

        
    }

}
