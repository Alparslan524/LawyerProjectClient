import { Component, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/service/common/alertify.service';
import { RoleService } from 'src/app/service/common/models/role.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent {

  constructor(spinner: NgxSpinnerService, private roleService: RoleService, private alertify: AlertifyService) {
    super(spinner)
  }


  @Output() createdRole: EventEmitter<string> = new EventEmitter();
  //Create Product düğmesine basıldığında tabloyu güncelleyecek

  create(name: HTMLInputElement) {
    this.showSpinner(SpinnerType.SquareJellyBox);

    this.roleService.create(name.value, () => {
      this.hideSpinner(SpinnerType.SquareJellyBox);
      this.alertify.message("Rol Başarıyla Eklendi!", {
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.createdRole.emit(name.value);
    }, errorMessage => {
      this.alertify.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
    });
  }
}