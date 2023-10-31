import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service.service';
import { User } from 'src/app/entities/User';
import { CreateUser } from 'src/app/contracts/User/create-user';
import { Observable, firstValueFrom } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/Token/tokenResponse';
import { AlertifyService, MessageType, Position } from '../alertify.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private alertifyService: AlertifyService) { }

  async create(user: User) {
    const observable: Observable<CreateUser | User> = this.httpClientService.post<CreateUser | User>({
      controller: "users",
      action: "createuser"
    }, user);
    return await firstValueFrom(observable) as CreateUser;
  }

  async login(userNameOrEmail: string, password: string, callBack?: () => void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "auth",
      action: "login"
    }, { userNameOrEmail, password })
    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      this.alertifyService.message("Kullanıcı girişi başarılı", {
        messageType: MessageType.Success,
        position: Position.TopRight
      })
    }
    callBack();
  }

}
