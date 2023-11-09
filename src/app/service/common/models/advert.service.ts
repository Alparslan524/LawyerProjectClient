import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service.service';
import { CreateAdvert } from 'src/app/contracts/Adverts/create_advert';
import { HttpErrorResponse } from '@angular/common/http';
import { ListAdvert } from 'src/app/contracts/Adverts/list_advert';
import { Observable, firstValueFrom } from 'rxjs';
import { ListMyAdvert } from 'src/app/contracts/Adverts/list_my_advert';

@Injectable({
  providedIn: 'root'
})
export class AdvertService {

  constructor(private httpClientService: HttpClientService) { }

  async create(createAdvert: CreateAdvert, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "adverts",
      action: "createadvert"
    }, createAdvert).subscribe(result => {
      successCallBack();//Başarıyla bitti dönüyoruz
    }, (errorResponse: HttpErrorResponse) => {//Başarıyla bitmezse, sunucu hata verirse
      const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;//Hatayı yakalıyoruz(sunucudan gelen tip şeklinde)
      let message = "";
      _error.forEach((v, index) => {//yakaldığımız diziyi ayrıştırıyoruz ve birleştiriyoruz.
        v.value.forEach((_v, _index) => {
          message += `${_v}<br>`;
        });
      });
      errorCallBack(message);
    });
  }

  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalCount: number; adverts: ListAdvert[] }> {
    const promiseData: Promise<{ totalCount: number; adverts: ListAdvert[] }> = this.httpClientService.get<{ totalCount: number; adverts: ListAdvert[] }>({
      controller: "adverts",
      action: "getall",
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallBack()).catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message));
    return await promiseData;
  }

  async delete(id: number) {
    const deleteObservable: Observable<any> = this.httpClientService.putById<any>({
      controller: "adverts",
      action: "deleteadvert"
    }, id)
    await firstValueFrom(deleteObservable);
  }

  async readMyAdvert(userNameOrEmail: string, successCallBack?: () => void): Promise<ListMyAdvert[]> {
    const getObservable: Observable<ListMyAdvert[]> = this.httpClientService.get<ListMyAdvert[]>({
      controller: "adverts",
      action: `getbyid/${userNameOrEmail}`,
    })
    const adverts: ListMyAdvert[] = await firstValueFrom(getObservable);
    successCallBack();
    return adverts;
  }
}
