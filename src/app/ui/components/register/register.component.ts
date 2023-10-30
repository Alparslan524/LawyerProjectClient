import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { CreateUser } from 'src/app/contracts/User/create-user';
import { User } from 'src/app/entities/User';
import { AlertifyService, MessageType, Position } from 'src/app/service/common/alertify.service';
import { UserService } from 'src/app/service/common/models/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private fb: FormBuilder, private userService: UserService, private alertifyService: AlertifyService) {
    super(spinner)
  }

  frm: FormGroup
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


    this.frm = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(3)]],
      userName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phoneNumber: ["", [Validators.required]],
      password: ["", [Validators.required]],
      passwordConfirm: ["", [Validators.required]]
    })

  }

  get component() {
    return this.frm.controls;
  }

  submitted: boolean = false;
  async onSubmitRegister(user: User) {
    this.submitted = true;
    if (this.frm.invalid) {
      return;
    }
    const result: CreateUser = await this.userService.create(user);
    
    if (result.success) {
      this.alertifyService.message(result.message,{
        messageType:MessageType.Success,
        position:Position.TopRight
      })
    }
    else {
      this.alertifyService.message(result.message,{
        messageType:MessageType.Error,
        position:Position.TopRight
      })
    }
  }



}
