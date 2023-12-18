import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from 'src/app/service/common/models/role.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { List_Role } from 'src/app/contracts/Roles/List_Role';
import { MatSelectionList } from '@angular/material/list';
import { SpinnerType } from 'src/app/base/base.component';
import { AuthorizationEndpointService } from 'src/app/service/common/models/authorization-endpoint.service';
import { AlertifyService, MessageType, Position } from 'src/app/service/common/alertify.service';

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrls: ['./authorize-menu-dialog.component.scss']
})
export class AuthorizeMenuDialogComponent extends BaseDialog<AuthorizeMenuDialogComponent> implements OnInit {

  constructor(dialogref: MatDialogRef<AuthorizeMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService, private authorizationEndpointService: AuthorizationEndpointService, private spinner: NgxSpinnerService,
    private alertifyService:AlertifyService) {
    super(dialogref);
  }
  roles: { datas: List_Role[], totalRoleCount: number };
  assignedRoles: Array<string> = [];
  listRoles: { name: string, selected: boolean }[];

  async ngOnInit() {
    const assignedRoles = await this.authorizationEndpointService.getRolesToEndpoint(this.data.code, this.data.menuName);

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

    this.authorizationEndpointService.assignRoleEndpoint(roles, this.data.code, this.data.menuName, () => {
      this.spinner.hide(SpinnerType.SquareJellyBox);
      this.alertifyService.message("Roller başarıyla ilişkilendirilmiştir",{
        messageType:MessageType.Success,
        position:Position.TopRight
      })
    }, error => {
      this.alertifyService.message(error,{
        messageType:MessageType.Error,
        position:Position.TopRight
      })
    });

  }
}