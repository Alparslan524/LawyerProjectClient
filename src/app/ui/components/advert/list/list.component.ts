import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { async } from 'rxjs';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListAdvert } from 'src/app/contracts/Adverts/list_advert';
import { CreateAdvertDialogComponent } from 'src/app/dialogs/models/create-advert-dialog/create-advert-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/service/common/alertify.service';
import { DialogService } from 'src/app/service/common/dialog.service';
import { FileUploadOptions } from 'src/app/service/common/file-upload/file-upload.component';
import { AdvertService } from 'src/app/service/common/models/advert.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private advertService: AdvertService, private alertifyService: AlertifyService, private dialogService: DialogService) {
    super(spinner);
  }



  displayedColumns: string[] = ['objectId', 'caseType', 'caseDate', 'price', 'city', 'address', 'district', 'casePlace', 'createDate', 'updatedDate', 'delete'];
  dataSource: MatTableDataSource<ListAdvert> = null;
  adverts: ListAdvert[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit() {
    await this.getAdverts();
  }

  createAdvertDialog() {
    this.dialogService.openDialog({
      componentType: CreateAdvertDialogComponent,
      afterClosed: () => {
        this.getAdverts();
      }
    })
  }

  async getAdverts() {
    this.showSpinner(SpinnerType.SquareJellyBox);
    const allAdverts: { totalCount: number, adverts: ListAdvert[] } = await this.advertService.read(this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.SquareJellyBox),
      errorMessage => this.alertifyService.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      }));
    this.dataSource = new MatTableDataSource<ListAdvert>(allAdverts.adverts);
    this.paginator.length = allAdverts.totalCount;
    this.adverts = this.dataSource.data;
  }

  async pageChanged() {
    await this.getAdverts();
  }
}
