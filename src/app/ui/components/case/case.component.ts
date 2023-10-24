import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { CreateCaseComponent } from 'src/app/dialogs/create-case/create-case.component';
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

  fileUpload() {
    alert("fileupload dialogu gelcek.")
  }

  createCaseDialog() {
    this.dialogService.openDialog({
      componentType: CreateCaseComponent
    })
  }

}
