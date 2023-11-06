import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-out-dialog',
  templateUrl: './sign-out-dialog.component.html',
  styleUrls: ['./sign-out-dialog.component.scss']
})
export class SignOutDialogComponent extends BaseDialog<SignOutDialogComponent> {
  constructor(
    dialogRef: MatDialogRef<SignOutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SignOutDialogState,
  ) {
    super(dialogRef)
  }
}

export enum SignOutDialogState {
  Yes,
  No
}