import { Component, OnInit } from '@angular/core';
import { BaseComponent } from './base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './service/common/auth.service';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {


  constructor(spinner: NgxSpinnerService, private authService: AuthService) {
    super(spinner);
    authService.identityCheck()
  }

  ngOnInit(): void {

  }

}
