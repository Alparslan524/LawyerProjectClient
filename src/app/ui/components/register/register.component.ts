import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateUser } from 'src/app/contracts/User/create-user';
import { User } from 'src/app/entities/User';
import { AlertifyService, MessageType, Position } from 'src/app/service/common/alertify.service';
import { AuthService } from 'src/app/service/common/auth.service';
import { UserService } from 'src/app/service/common/models/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private fb: FormBuilder, private userService: UserService, private alertifyService: AlertifyService
    , private router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute) {
    super(spinner)
    authService.identityCheck();
  }

  frmRegister: FormGroup
  frmLogin: FormGroup
  ngOnInit(): void {
    {
      const container = document.getElementById('container');
      const registerBtn = document.getElementById('register');
      const loginBtn = document.getElementById('login');
      registerBtn.addEventListener('click', () => {
        container.classList.add("active");
      });
      loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
      });
    }

    this.frmLogin = this.fb.group({
      userNameOrEmail: ["", [Validators.required]],
      passwordLogin: ["", [Validators.required]],
    })

    this.frmRegister = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(3)]],
      userName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phoneNumber: ["", [Validators.required]],
      password: ["", [Validators.required]],
      passwordConfirm: ["", [Validators.required]]
    })
  }

  get componentRegister() {
    return this.frmRegister.controls;
  }

  submittedRegister: boolean = false;
  async onSubmitRegister(user: User) {
    this.showSpinner(SpinnerType.SquareJellyBox);
    this.submittedRegister = true;
    if (this.frmRegister.invalid) {
      return;
    }
    const result: CreateUser = await this.userService.create(user);

    if (result.success) {
      this.alertifyService.message(result.message, {
        messageType: MessageType.Success,
        position: Position.TopRight
      })
      this.hideSpinner(SpinnerType.SquareJellyBox);
    }
    else {
      this.alertifyService.message(result.message, {
        messageType: MessageType.Error,
        position: Position.TopRight
      })
      this.hideSpinner(SpinnerType.SquareJellyBox);
    }
  }


  get componentLogin() {
    return this.frmLogin.controls;
  }

  submittedLogin: boolean = false;
  async onSubmitLogin(user: User) {
    this.submittedLogin = true;
    if (this.frmLogin.invalid) {
      return;
    }
    this.showSpinner(SpinnerType.SquareJellyBox);
    await this.userService.login(this.frmLogin.value.userNameOrEmail, this.frmLogin.value.passwordLogin, () => {
      this.authService.identityCheck()

      var returnUrl: string;
      this.activatedRoute.queryParams.subscribe(params => {
        //Daha önce geldiği bir yer var ise oraya yönlendirecek. Eğer yok ise sidebar/adverte yönlendirecek
        returnUrl = params["returnUrl"]
      });

      if (returnUrl) {
        this.router.navigate([returnUrl])
      }
      else {
        this.router.navigate(["sidebar/advert"])
      }
      this.hideSpinner(SpinnerType.SquareJellyBox);
    })
  }



}
