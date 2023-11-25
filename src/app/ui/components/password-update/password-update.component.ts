import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/service/common/alertify.service';
import { UserService } from 'src/app/service/common/models/user.service';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.scss']
})
export class PasswordUpdateComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private userService: UserService, private activatedRoute: ActivatedRoute,
    private alertifyService: AlertifyService, private router: Router, private fb: FormBuilder) { super(spinner) }

  state: any;
  passwordForm: FormGroup;

  ngOnInit(): void {
    this.showSpinner(SpinnerType.SquareJellyBox);

    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    })

    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId: string = params["userId"]
        const resetToken: string = params["resetToken"]
        this.state = await this.userService.verifyResetToken(resetToken, userId, () => {
          this.hideSpinner(SpinnerType.SquareJellyBox);
        })
      }
    });
  }

  updatePassword() {
    this.showSpinner(SpinnerType.SquareJellyBox);
    if (this.passwordForm.get('password').value != this.passwordForm.get('passwordConfirm').value) {
      this.alertifyService.message("Lütfen şifreleri aynı giriniz!", {
        messageType: MessageType.Error,
        position: Position.TopRight
      })
      this.hideSpinner(SpinnerType.SquareJellyBox);
      return;
    }
    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId: string = params["userId"]
        const resetToken: string = params["resetToken"]
        await this.userService.updatePassword(userId, resetToken, this.passwordForm.get('password').value, this.passwordForm.get('passwordConfirm').value, () => {
          this.hideSpinner(SpinnerType.SquareJellyBox);
          this.alertifyService.message("Şifre başarıyla güncellenmiştir.", {
            messageType: MessageType.Success,
            position: Position.TopRight
          })
          this.router.navigate([""])
        }, error => {
          console.log(error)
        });
        this.hideSpinner(SpinnerType.SquareJellyBox);
      }
    })
  }
}