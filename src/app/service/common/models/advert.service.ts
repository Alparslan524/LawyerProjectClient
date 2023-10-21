import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service.service';
import { CreateAdvert } from 'src/app/contracts/create_advert';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdvertService {

  constructor(private httpClientService: HttpClientService) { }

  // FluentValidation olursa eğer bu create açılacak
  // create(createAdvert: CreateAdvert, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
  //   this.httpClientService.post({
  //     controller: "adverts",
  //     action:"createadvert"
  //   }, createAdvert).subscribe(result => {
  //     successCallBack();//Başarıyla bitti dönüyoruz
  //   }, (errorResponse: HttpErrorResponse) => {//Başarıyla bitmezse, sunucu hata verirse
  //     const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;//Hatayı yakalıyoruz(sunucudan gelen tip şeklinde)
  //     let message = "";
  //     _error.forEach((v, index) => {//yakaldığımız diziyi ayrıştırıyoruz ve birleştiriyoruz.
  //       v.value.forEach((_v, _index) => {
  //         message += `${_v}<br>`;
  //       });
  //     });
  //     errorCallBack(message);
  //   });
  // }

  create(createAdvert: CreateAdvert, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "adverts",
      action: "createadvert"
    }, createAdvert).subscribe(result => {
      successCallBack();//Başarıyla bitti dönüyoruz
    });
  }

  //default olarak 0.sayfa 5 tane eleman.
  // async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalCount: number; products: List_Product[] }> {//21.Ders
  //   const promiseData: Promise<{ totalCount: number; products: List_Product[] }> = this.httpClientService.get<{ totalCount: number; products: List_Product[] }>({
  //     controller: "products",
  //     queryString: `page=${page}&size=${size}`
  //   }).toPromise();

  //   promiseData.then(d => successCallBack()).catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message));
  //   return await promiseData;
  // }

}
