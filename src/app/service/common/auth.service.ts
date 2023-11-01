import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private spinner: NgxSpinnerService, private jwtHelper: JwtHelperService) { }

  identityCheck() {
    const token: string = localStorage.getItem("accessToken");
    //const decodeToken = this.jwtHelper.decodeToken(token);
    //const expirationDate: Date = this.jwtHelper.getTokenExpirationDate(token);

    let expired: boolean
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch {
      expired = true;
    }
    _isAuthenticated = token != null && !expired //Token null değilse ve expire olmamışsa, süresi dolmamışsa authenticate olmuştur
  }

  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }
}

export let _isAuthenticated: boolean;