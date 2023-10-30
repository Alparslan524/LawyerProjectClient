import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends BaseComponent implements OnInit {
  title = 'LawyerProjectClient';
  constructor(spinner: NgxSpinnerService) {
    super(spinner)
  }


  ngOnInit(): void {

  }
}
