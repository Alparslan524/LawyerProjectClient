import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service.service';
import { CreateAdvert } from 'src/app/contracts/Adverts/create_advert';
import { HttpErrorResponse } from '@angular/common/http';
import { ListAdvert } from 'src/app/contracts/Adverts/list_advert';

@Injectable({
  providedIn: 'root'
})
export class AdvertService {

  constructor(private httpClientService: HttpClientService) { }

  create(createAdvert: CreateAdvert, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
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
      action:"getall",
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallBack()).catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message));
    return await promiseData;
  }

}
