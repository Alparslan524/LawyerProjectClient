import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/service/common/alertify.service';
import { AuthService } from 'src/app/service/common/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends BaseComponent implements OnInit {
  title = 'LawyerProjectClient';
  constructor(spinner: NgxSpinnerService, private authService: AuthService, private router: Router, private alertifyService: AlertifyService) {
    super(spinner)
    // authService.identityCheck();
  }


  ngOnInit(): void {

  }

  signOut() {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""])
    this.alertifyService.message("Oturum kapatıldı", {
      messageType: MessageType.Success,
      position: Position.TopRight
    });
  }
}
