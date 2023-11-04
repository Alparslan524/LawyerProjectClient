import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/service/common/alertify.service';
import { AuthService } from 'src/app/service/common/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends BaseComponent implements OnInit {
  title = 'LawyerProjectClient';
  constructor(spinner: NgxSpinnerService, private authService: AuthService, private router: Router, private alertifyService: AlertifyService,
    private socialAuthService: SocialAuthService) {
    super(spinner)
    // authService.identityCheck();
  }


  ngOnInit(): void {

  }

  signOut() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userNameOrEmail");
    
    this.socialAuthService.signOut();
    this.authService.identityCheck();
    
    this.router.navigate([""])
    
    this.alertifyService.message("Oturum kapatıldı", {
      messageType: MessageType.Success,
      position: Position.TopRight
    });
  }
}
