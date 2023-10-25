import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { CreateAdvertComponent } from 'src/app/dialogs/models/create-advert/create-advert.component';
import { CreateCaseComponent } from 'src/app/dialogs/models/create-case/create-case.component';
import { SelectCasePdfDialogComponent } from 'src/app/dialogs/select-case-pdf-dialog/select-case-pdf-dialog.component';
import { DialogService } from 'src/app/service/common/dialog.service';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent extends BaseComponent {
  constructor(spinner: NgxSpinnerService, private dialogService: DialogService) {
    super(spinner);
  }

  fileUpload(id: number) {
    this.dialogService.openDialog({
      componentType: SelectCasePdfDialogComponent,
      data: id,
      options: {
        width: '700px'
      }
    })
  }

  createCaseDialog() {
    this.dialogService.openDialog({
      componentType: CreateCaseComponent
    })
  }

  createAdvertDialog() {
    this.dialogService.openDialog({
      componentType: CreateAdvertComponent
    })
  }

}
