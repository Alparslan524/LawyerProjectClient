import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'app-my-lawsuit',
  templateUrl: './my-lawsuit.component.html',
  styleUrls: ['./my-lawsuit.component.scss']
})
export class MyLawsuitComponent extends BaseComponent {
  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }
}
