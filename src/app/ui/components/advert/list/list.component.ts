import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListAdvert } from 'src/app/contracts/Adverts/list_advert';
import { AlertifyService, MessageType, Position } from 'src/app/service/common/alertify.service';
import { FileUploadOptions } from 'src/app/service/common/file-upload/file-upload.component';
import { AdvertService } from 'src/app/service/common/models/advert.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private advertService: AdvertService, private alertifyService: AlertifyService) {
    super(spinner);
  }

  //FileUpload kullanımı örnek
  @Output() fileUploadOptions:Partial<FileUploadOptions> = {
    action:"upload",
    controller:"cases",
    explanation:"Dosyaları Seçiniz...",
    accept:".png, .jpg, .pdf, .jpeg"
  };

  displayedColumns: string[] = ['objectId', 'caseType', 'caseDate', 'price', 'city', 'address', 'district', 'casePlace', 'createDate', 'updatedDate', 'delete'];
  dataSource: MatTableDataSource<ListAdvert> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit() {
    await this.getAdverts();
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
  }



  async pageChanged() {
    await this.getAdverts();
  }
}
