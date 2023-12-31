import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListCase } from 'src/app/contracts/Case/list_case';
import { UpdateCase } from 'src/app/contracts/Case/update_case';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { CreateAdvertDialogComponent } from 'src/app/dialogs/models/create-advert/create-advert-dialog.component';
import { CreateCaseDialogComponent } from 'src/app/dialogs/models/create-case/create-case-dialog.component';
import { UpdateCaseComponent } from 'src/app/dialogs/models/update-case/update-case.component';
import { SelectCasePdfDialogComponent } from 'src/app/dialogs/select-case-pdf-dialog/select-case-pdf-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/service/common/alertify.service';
import { AuthService } from 'src/app/service/common/auth.service';
import { DialogService } from 'src/app/service/common/dialog.service';
import { CaseService } from 'src/app/service/common/models/case.service';

declare var $: any

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private dialogService: DialogService, private caseService: CaseService, private authService: AuthService,
    private socialAuthService: SocialAuthService, private alertifyService: AlertifyService, private dialog: MatDialog) {
    super(spinner);
    // authService.identityCheck();
  }

  cases: ListCase[];

  async ngOnInit() {
    await this.getCase();
  }

  async getCase() {
    this.showSpinner(SpinnerType.SquareJellyBox);
    this.cases = await this.caseService.readByUser(localStorage.getItem("userNameOrEmail"), () => {//Buradaki id yi el ile değil o an giriş yapan kullanıcının id si olması lazım
      this.hideSpinner(SpinnerType.SquareJellyBox);
    });
    this.cases = this.cases.reverse();
  }

  delete(caseId: number) {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.SquareJellyBox);
        await this.caseService.delete(caseId, async () => {
          this.alertifyService.message("Dava başarıyla silinmiştir", {
            messageType: MessageType.Success,
            position: Position.TopRight
          })
          this.hideSpinner(SpinnerType.SquareJellyBox);
        }, error => {
          this.alertifyService.message("Dava silinirken hata ile karşılaşılmıştır!", {
            messageType: MessageType.Error,
            position: Position.TopRight
          })
        })
        this.getCase();
      }
    })
  }

  fileUpload(id: number) {
    this.dialogService.openDialog({
      componentType: SelectCasePdfDialogComponent,
      data: id,
      options: {
        width: '1400px',
        position: {
          left: "300px"
        }
      }
    })
  }

  update(caseUpdate: UpdateCase) {//DialogServiste datada bir sıkıntı çıkıyor o yüzden direkt MatDialogtan açıyoruz.
    const dialogRef = this.dialog.open(UpdateCaseComponent, ({
      data: caseUpdate,
    }));
    dialogRef.afterClosed().subscribe(async () => {
      await this.getCase();
    })
  }

  createCaseDialog() {
    this.dialogService.openDialog({
      componentType: CreateCaseDialogComponent,
      afterClosed: async () => {
        this.getCase();
      }
    })
  }

  createAdvertDialog() {
    this.dialogService.openDialog({
      componentType: CreateAdvertDialogComponent
    })
  }

}
