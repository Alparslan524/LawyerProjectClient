import { Component, OnInit } from '@angular/core';
import { BaseComponent } from './base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {
  title = 'LawyerProjectClient';

  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }

  ngOnInit(): void {

  }

}
