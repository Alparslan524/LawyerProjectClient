import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service.service';
import { CreateCase } from 'src/app/contracts/Case/create_case';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  constructor(private httpClientService: HttpClientService) { }

  create(createCase: CreateCase, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "cases",
      action: "add"
    }, createCase).subscribe(result => {
      successCallBack();
    }, (errorResponse: HttpErrorResponse) => {
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


}
