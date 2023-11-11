import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListMyAdvert } from 'src/app/contracts/Adverts/list_my_advert';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { CreateAdvertDialogComponent } from 'src/app/dialogs/models/create-advert-dialog/create-advert-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/service/common/alertify.service';
import { DialogService } from 'src/app/service/common/dialog.service';
import { AdvertService } from 'src/app/service/common/models/advert.service';

@Component({
  selector: 'app-my-advert',
  templateUrl: './my-advert.component.html',
  styleUrls: ['./my-advert.component.scss']
})
export class MyAdvertComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private dialogService: DialogService, private advertService: AdvertService, private alertifyService: AlertifyService) {
    super(spinner)

  }

  myAdverts: ListMyAdvert[];

  async ngOnInit() {
    await this.getMyAdverts();
  }


  async getMyAdverts() {
    this.showSpinner(SpinnerType.SquareJellyBox);
    this.myAdverts = await this.advertService.readMyAdvert(localStorage.getItem("userNameOrEmail"), () => {
      this.hideSpinner(SpinnerType.SquareJellyBox);
    });
    this.myAdverts = this.myAdverts.reverse();
  }


  createAdvertDialog() {
    this.dialogService.openDialog({
      componentType: CreateAdvertDialogComponent,
      afterClosed: () => {
        this.getMyAdverts();
      }
    })
  }

  async deleteAdvert(objectId: number) {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.SquareJellyBox);
        await this.advertService.delete(objectId);
        await this.getMyAdverts();
        this.hideSpinner(SpinnerType.SquareJellyBox);
        this.alertifyService.message("İlan başarıyla silinmiştir", {
          messageType: MessageType.Success,
          position: Position.TopRight
        })
      }
    })
  }

  updateAdvert() {
    alert("güncellenecek")
  }
}
