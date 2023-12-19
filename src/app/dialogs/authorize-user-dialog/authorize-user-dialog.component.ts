import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from 'src/app/service/common/models/role.service';
import { UserService } from 'src/app/service/common/models/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from 'src/app/service/common/alertify.service';
import { List_Role } from 'src/app/contracts/Roles/List_Role';
import { SpinnerType } from 'src/app/base/base.component';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-authorize-user-dialog',
  templateUrl: './authorize-user-dialog.component.html',
  styleUrls: ['./authorize-user-dialog.component.scss']
})
export class AuthorizeUserDialogComponent extends BaseDialog<AuthorizeUserDialogComponent> implements OnInit {

  constructor(dialogref: MatDialogRef<AuthorizeUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService, private userService: UserService, private spinner: NgxSpinnerService, private alertifyService: AlertifyService) {
    super(dialogref);
  }

  roles: { datas: List_Role[], totalRoleCount: number };
  assignedRoles: Array<string> = [];
  listRoles: { name: string, selected: boolean }[];

  async ngOnInit() {
    this.spinner.show(SpinnerType.SquareJellyBox);
    const assignedRoles = await this.userService.getRolesToUser(this.data, () => this.spinner.hide(SpinnerType.SquareJellyBox)
    );

    this.roles = await this.roleService.getRoles(-1, -1);

    this.listRoles = this.roles.datas.map((r: any) => {
      return {
        name: r.name,
        selected: assignedRoles?.indexOf(r.name) > -1
      }
    });
  }

  assignRoles(rolesComponent: MatSelectionList) {
    const roles: string[] = rolesComponent.selectedOptions.selected.map(o => o._elementRef.nativeElement.innerText);

    this.spinner.show(SpinnerType.SquareJellyBox);

    this.userService.assignRoleToUser(this.data, roles, () => {
      this.spinner.hide(SpinnerType.SquareJellyBox);
      this.alertifyService.message("Kullanıcıya ilgili rol/roller atanmıştır!",{
        messageType:MessageType.Success,
        position:Position.TopRight
      })
    }, error => {
      this.alertifyService.message("Kullanıcıya ilgili rol/roller atanırken hata alındı!",{
        messageType:MessageType.Error,
        position:Position.TopRight
      })
    });
  }

}
