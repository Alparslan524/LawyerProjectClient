import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/service/common/alertify.service';
import { UserService } from 'src/app/service/common/models/user.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private userService: UserService, private alertifyService: AlertifyService, private fb: FormBuilder) { super(spinner) }

  passwordForm: FormGroup;

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      email: ['', Validators.required],
    })
  }


  passwordReset() {
    this.showSpinner(SpinnerType.SquareJellyBox);
    this.userService.passwordReset(this.passwordForm.get('email').value, () => {
      this.alertifyService.message("Şifre yenileme maili başarıyla gönderilmiştir!", {
        messageType: MessageType.Success,
        position: Position.TopRight
      })
      this.hideSpinner(SpinnerType.SquareJellyBox);
    })
  }
}
