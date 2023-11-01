import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/service/common/auth.service';

@Component({
  selector: 'app-constitution',
  templateUrl: './constitution.component.html',
  styleUrls: ['./constitution.component.scss']
})
export class ConstitutionComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private authService: AuthService) {
    super(spinner);
    authService.identityCheck();
  }

  ngOnInit(): void {
  }


}
