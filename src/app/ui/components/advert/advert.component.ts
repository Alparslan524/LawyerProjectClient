import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { AuthService } from 'src/app/service/common/auth.service';




@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.scss']
})
export class AdvertComponent extends BaseComponent {
  constructor(spinner: NgxSpinnerService, private authService: AuthService) {
    super(spinner);
    authService.identityCheck();
  }

}
