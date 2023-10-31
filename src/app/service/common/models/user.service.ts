import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service.service';
import { User } from 'src/app/entities/User';
import { CreateUser } from 'src/app/contracts/User/create-user';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService) { }

  async create(user: User) {
    const observable: Observable<CreateUser | User> = this.httpClientService.post<CreateUser | User>({
      controller: "users",
      action: "createuser"
    }, user);
    return await firstValueFrom(observable) as CreateUser;
  }

  async login(userNameOrEmail: string, password: string, callBack?: () => void): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "auth",
      action: "login"
    }, { userNameOrEmail, password })
    await firstValueFrom(observable);
    callBack();
  }

}
