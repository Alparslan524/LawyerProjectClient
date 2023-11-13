import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { async } from 'rxjs';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HubUrls } from 'src/app/constants/hub-urls';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { ListAdvert } from 'src/app/contracts/Adverts/list_advert';
import { CreateAdvertDialogComponent } from 'src/app/dialogs/models/create-advert-dialog/create-advert-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/service/common/alertify.service';
import { DialogService } from 'src/app/service/common/dialog.service';
import { FileUploadOptions } from 'src/app/service/common/file-upload/file-upload.component';
import { AdvertService } from 'src/app/service/common/models/advert.service';
import { SignalRService } from 'src/app/service/common/signalr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private advertService: AdvertService, private alertifyService: AlertifyService,
    private dialogService: DialogService, private signalRService: SignalRService) {
    super(spinner);
    signalRService.start(HubUrls.AdvertHub);
  }




  dataSource: MatTableDataSource<ListAdvert> = null;
  adverts: ListAdvert[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit() {
    await this.getAdverts();
    this.signalRService.on(ReceiveFunctions.AdvertAddedMessageReceiveFunction, async message => {
      this.alertifyService.message(message, {
        messageType: MessageType.Notify,
        position: Position.TopRight
      })
      await this.getAdverts();//İstenirse sayfa güncellenemsi kapatıulabilir.
    })
  }

  async getAdverts() {
    this.showSpinner(SpinnerType.SquareJellyBox);
    const allAdverts: { totalCount: number, adverts: ListAdvert[] } = await this.advertService.read(this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 60, () => this.hideSpinner(SpinnerType.SquareJellyBox),
      errorMessage => this.alertifyService.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      }));
    this.dataSource = new MatTableDataSource<ListAdvert>(allAdverts.adverts);
    this.paginator.length = allAdverts.totalCount;
    this.adverts = this.dataSource.data;
    this.adverts = this.adverts.reverse();
  }

  async pageChanged() {
    await this.getAdverts();
  }
}
