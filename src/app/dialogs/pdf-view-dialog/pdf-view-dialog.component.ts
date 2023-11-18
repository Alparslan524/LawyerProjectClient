import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogService } from 'src/app/service/common/dialog.service';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-pdf-view-dialog',
  templateUrl: './pdf-view-dialog.component.html',
  styleUrls: ['./pdf-view-dialog.component.scss']
})
export class PdfViewDialogComponent extends BaseDialog<PdfViewDialogComponent> implements OnInit {
  constructor(dialogRef: MatDialogRef<PdfViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public path: string,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService) {
    super(dialogRef);
  }

  url : string = "https://belleten.gov.tr/tam-metin-pdf/2238/tur"; 

  ngOnInit(): void {
    
  }


}
