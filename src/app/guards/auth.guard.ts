import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { NgxSpinnerService } from "ngx-spinner";
import { SpinnerType } from "src/app/base/base.component";
import { AlertifyService, MessageType, Position } from "../service/common/alertify.service";


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private jwtHelper: JwtHelperService, private router: Router, private alertify: AlertifyService, private spinner: NgxSpinnerService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.spinner.show(SpinnerType.SquareJellyBox);
        const token: string = localStorage.getItem("accessToken");

        //const decodeToken = this.jwtHelper.decodeToken(token);
        //const expirationDate: Date = this.jwtHelper.getTokenExpirationDate(token);
        let expired: boolean
        try {
            expired = this.jwtHelper.isTokenExpired(token);
        } catch {
            expired = true;
        }

        if (!token || expired) {
            this.router.navigate([""]);
            this.alertify.message("Oturum açmanız gerekmektedir!", {
                messageType: MessageType.Error,
                position: Position.TopRight
            })
        }
        this.spinner.hide(SpinnerType.SquareJellyBox);

        return true;
    }
}