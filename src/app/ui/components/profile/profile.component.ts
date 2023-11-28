import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { GetUser } from 'src/app/contracts/User/get-user';
import { AlertifyService, MessageType, Position } from 'src/app/service/common/alertify.service';
import { UserService } from 'src/app/service/common/models/user.service';

declare var $:any

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private userService: UserService, private fb: FormBuilder, 
    private alertify: AlertifyService) { super(spinner) }

  user: GetUser;
  userForm: FormGroup;

  async ngOnInit() {
    this.user = await this.userService.getUser(() => {
      this.hideSpinner(SpinnerType.SquareJellyBox);
    });
    this.userForm = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      phoneNumber: [this.user.phoneNumber, Validators.required],
    })
  }

  async update() {
    this.userForm.disable();
    this.showSpinner(SpinnerType.SquareJellyBox);

    const update_user: GetUser = new GetUser();
    update_user.firstName = this.userForm.get('firstName').value;
    update_user.lastName = this.userForm.get('lastName').value;
    update_user.phoneNumber = this.userForm.get('phoneNumber').value;
    update_user.email = this.user.email;

    await this.userService.updateUser(update_user,async () => {
      this.alertify.message("Güncelleme başarıyla gerçekleştirilmiştir!!", {
        messageType: MessageType.Success,
        position: Position.TopRight,
      })
    })
    this.userForm.enable();
    this.hideSpinner(SpinnerType.SquareJellyBox);

    location.reload();
  }

}
