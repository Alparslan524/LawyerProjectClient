import { Component, Inject, Output, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/service/common/file-upload/file-upload.component';
import { CaseService } from 'src/app/service/common/models/case.service';
import { ListCasePdf } from 'src/app/contracts/Case/list_case_pdf';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { MatCard } from '@angular/material/card';
import { DialogService } from 'src/app/service/common/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';

declare var $: any

@Component({
  selector: 'app-select-case-pdf-dialog',
  templateUrl: './select-case-pdf-dialog.component.html',
  styleUrls: ['./select-case-pdf-dialog.component.scss']
})
export class SelectCasePdfDialogComponent extends BaseDialog<SelectCasePdfDialogComponent> implements OnInit {
  constructor(dialogRef: MatDialogRef<SelectCasePdfDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectCasePdfDialogState | string,
    private spinner: NgxSpinnerService,
    private caseService: CaseService,
    private dialogService: DialogService) {
    super(dialogRef)
  }

  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    accept: ".pdf",
    action: `upload/${this.data}`,
    controller: "cases",
    explanation: "Dosyaları Seçiniz...",
  }

  pdfFiles: ListCasePdf[];

  async ngOnInit() {
    this.spinner.show(SpinnerType.SquareJellyBox);
    this.pdfFiles = await this.caseService.readPdf(this.data as number, () => {
      this.spinner.hide(SpinnerType.SquareJellyBox);
    });
  }

  async deletePdf(pdfFileId: number, event: any) {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.SquareJellyBox);
        await this.caseService.deletePdf(this.data as number, pdfFileId, () => {
          this.spinner.hide(SpinnerType.SquareJellyBox);
          var card = $(event.srcElement).parent().parent().parent();
          card.fadeOut(2000)
        })
      }
    })
  }

}

export enum SelectCasePdfDialogState {
  Close
}