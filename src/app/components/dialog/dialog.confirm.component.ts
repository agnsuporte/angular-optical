import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: String;
  texto: String;
}

@Component({
  selector: 'dialog-confirm',
  templateUrl: './dialog.confirm.component.html',
  styleUrls: ['./dialog.confirm.component.css'],
})
export class DialogConfirmComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  
  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
