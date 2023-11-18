import { Component, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { ListCasePdf } from 'src/app/contracts/Case/list_case_pdf';
import { DialogService } from 'src/app/service/common/dialog.service';
import { FileUploadOptions } from 'src/app/service/common/file-upload/file-upload.component';
import { CaseService } from 'src/app/service/common/models/case.service';
import { BaseDialog } from '../base/base-dialog';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';
import { PdfViewDialogComponent } from '../pdf-view-dialog/pdf-view-dialog.component';

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
    afterClosed: () => {
      this.getPdfFiles();
    }
  }

  pdfFiles: ListCasePdf[];

  async ngOnInit() {
    this.spinner.show(SpinnerType.SquareJellyBox);
    await this.getPdfFiles();
  }

  async getPdfFiles() {
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

  async showPdf(path: string) {
    this.dialogService.openDialog({
      componentType: PdfViewDialogComponent,
      data: path
    })
  }

}

export enum SelectCasePdfDialogState {
  Close
}