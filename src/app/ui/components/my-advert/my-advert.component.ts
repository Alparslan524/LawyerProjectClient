import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListMyAdvert } from 'src/app/contracts/Adverts/list_my_advert';
import { CreateAdvertDialogComponent } from 'src/app/dialogs/models/create-advert-dialog/create-advert-dialog.component';
import { DialogService } from 'src/app/service/common/dialog.service';
import { AdvertService } from 'src/app/service/common/models/advert.service';

@Component({
  selector: 'app-my-advert',
  templateUrl: './my-advert.component.html',
  styleUrls: ['./my-advert.component.scss']
})
export class MyAdvertComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private dialogService: DialogService, private advertService: AdvertService) {
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
}
