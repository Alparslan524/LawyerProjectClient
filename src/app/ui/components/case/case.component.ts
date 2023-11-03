import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListCase } from 'src/app/contracts/Case/list_case';
import { CreateAdvertComponent } from 'src/app/dialogs/models/create-advert/create-advert.component';
import { CreateCaseComponent } from 'src/app/dialogs/models/create-case/create-case.component';
import { SelectCasePdfDialogComponent } from 'src/app/dialogs/select-case-pdf-dialog/select-case-pdf-dialog.component';
import { AuthService } from 'src/app/service/common/auth.service';
import { DialogService } from 'src/app/service/common/dialog.service';
import { CaseService } from 'src/app/service/common/models/case.service';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private dialogService: DialogService, private caseService: CaseService, private authService: AuthService) {
    super(spinner);
    // authService.identityCheck();
  }

  cases: ListCase[];

  async ngOnInit() {
    this.showSpinner(SpinnerType.SquareJellyBox);
    this.cases = await this.caseService.readByUserId("a76342da-8d4e-4344-9eff-2e7d5624b5d8", () => {//Buradaki id yi el ile değil o an giriş yapan kullanıcının id si olması lazım
      this.hideSpinner(SpinnerType.SquareJellyBox);
    });
  }

  fileUpload(id: number) {
    this.dialogService.openDialog({
      componentType: SelectCasePdfDialogComponent,
      data: id,
      options: {
        width: '1400px'
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
