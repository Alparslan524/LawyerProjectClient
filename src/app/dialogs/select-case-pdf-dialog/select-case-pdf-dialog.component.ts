import { Component, Inject, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/service/common/file-upload/file-upload.component';

@Component({
  selector: 'app-select-case-pdf-dialog',
  templateUrl: './select-case-pdf-dialog.component.html',
  styleUrls: ['./select-case-pdf-dialog.component.scss']
})
export class SelectCasePdfDialogComponent extends BaseDialog<SelectCasePdfDialogComponent>{
  constructor(dialogRef: MatDialogRef<SelectCasePdfDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectCasePdfDialogState | number) {

    super(dialogRef)
  }

  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    accept: ".pdf",
    action: `upload/${this.data}`,
    controller: "cases",
    explanation: "Dosyaları Seçiniz...",
  }

}
export enum SelectCasePdfDialogState {
  Close
}