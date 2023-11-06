import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { SignOutDialogComponent, SignOutDialogState } from 'src/app/dialogs/sign-out-dialog/sign-out-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/service/common/alertify.service';
import { AuthService } from 'src/app/service/common/auth.service';
import { DialogService } from 'src/app/service/common/dialog.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends BaseComponent implements OnInit {
  title = 'LawyerProjectClient';
  constructor(spinner: NgxSpinnerService, private authService: AuthService, private router: Router, private alertifyService: AlertifyService,
    private socialAuthService: SocialAuthService, private dialogService: DialogService) {
    super(spinner)
    // authService.identityCheck();
  }


  ngOnInit(): void {
    
  }

  async signOut() {
    this.showSpinner(SpinnerType.SquareJellyBox);
    await this.dialogService.openDialog({
      componentType: SignOutDialogComponent,
      data: SignOutDialogState,
      afterClosed: () => {
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
    })
    this.hideSpinner(SpinnerType.SquareJellyBox);
  }
}
