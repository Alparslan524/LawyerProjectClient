import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Role } from 'src/app/contracts/Roles/List_Role';
import { AlertifyService, MessageType, Position } from 'src/app/service/common/alertify.service';
import { RoleService } from 'src/app/service/common/models/role.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private roleService: RoleService, private alertifyService: AlertifyService) {
    super(spinner)
  }

  displayedColumns: string[] = ['name', 'edit', 'delete'];
  dataSource: MatTableDataSource<List_Role> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit() {
    await this.getRoles();
  }

  async getRoles() {
    this.showSpinner(SpinnerType.SquareJellyBox);

    const allRoles: { datas: List_Role[], totalRoleCount: number } = await this.roleService.getRoles(this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5,//paginator yok ise default değerler, var ise paginator değerleri
      () => this.hideSpinner(SpinnerType.SquareJellyBox),
      errorMessage => this.alertifyService.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      }));

    this.dataSource = new MatTableDataSource<List_Role>(allRoles.datas);
    this.paginator.length = allRoles.totalRoleCount;
  }

  async pageChanged() {
    await this.getRoles();
  }
}