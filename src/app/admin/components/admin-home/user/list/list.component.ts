import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_User } from 'src/app/contracts/User/list-user';
import { AuthorizeUserDialogComponent } from 'src/app/dialogs/authorize-user-dialog/authorize-user-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/service/common/alertify.service';
import { DialogService } from 'src/app/service/common/dialog.service';
import { UserService } from 'src/app/service/common/models/user.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private userService: UserService, private alertifyService: AlertifyService,
    private dialogService: DialogService) {
    super(spinner)
  }

  displayedColumns: string[] = ['userName', 'nameSurname', 'email', 'twoFactorEnabled', 'role'];
  dataSource: MatTableDataSource<List_User> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit() {
    await this.getUsers();
  }

  async getUsers() {
    this.showSpinner(SpinnerType.SquareJellyBox);
    const allUsers: { totalUsersCount: number; users: List_User[] } = await this.userService.getAllUsers(this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5,
      () => this.hideSpinner(SpinnerType.SquareJellyBox),
      errorMessage => this.alertifyService.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      }));
    this.dataSource = new MatTableDataSource<List_User>(allUsers.users);
    this.paginator.length = allUsers.totalUsersCount;

  }

  async pageChanged() {
    await this.getUsers();
  }

  async assignRole(id: number) {
    this.dialogService.openDialog({
      componentType: AuthorizeUserDialogComponent,
      data: id,
      options: {
        width: "750px"
      },
      afterClosed: () => {
      }
    })
  }

}