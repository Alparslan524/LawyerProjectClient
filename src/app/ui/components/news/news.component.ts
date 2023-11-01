import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { AuthService } from 'src/app/service/common/auth.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent extends BaseComponent {
  constructor(spinner: NgxSpinnerService, private authService: AuthService) {
    super(spinner);
    authService.identityCheck();
  }

}
