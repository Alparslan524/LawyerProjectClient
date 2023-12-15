import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service.service';
import { Menu } from 'src/app/contracts/ApplicationConfigurations/menu';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClientService: HttpClientService) { }

  async getAuthorizeDefinitionEndPoints() {
    const observable: Observable<Menu[]> = await this.httpClientService.get<Menu[]>({
      controller: "applicationservices"
    })
    return await firstValueFrom(observable);
  }

}
