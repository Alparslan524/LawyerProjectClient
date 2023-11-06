import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { CreateCase } from 'src/app/contracts/Case/create_case';
import { ListCasePdf } from 'src/app/contracts/Case/list_case_pdf';
import { HttpClientService } from '../http-client-service.service';
import { ListCase } from 'src/app/contracts/Case/list_case';

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

  async readByUser(UserNameOrEmail: string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<ListCase[]> {
    const getObservable: Observable<ListCase[]> = this.httpClientService.get<ListCase[]>({
      controller: "cases",
      action: `getbyuser/${UserNameOrEmail}`,
    });
    const cases: ListCase[] = await firstValueFrom(getObservable);
    successCallBack();
    return cases
  }

  async readPdf(id: number, successCallBack?: () => void): Promise<ListCasePdf[]> {
    const getObservable: Observable<ListCasePdf[]> = this.httpClientService.get<ListCasePdf[]>({
      controller: "cases",
      action: `getcasepdffile/${id}`
    })
    const cases: ListCasePdf[] = await firstValueFrom(getObservable);
    successCallBack();
    return cases;
  }

  async deletePdf(id: number, pdfId: number, successCallBack?: () => void) {
    const deleteObservable = this.httpClientService.delete({
      controller: "cases",
      action: "deletepdf",
      queryString: `pdfId=${pdfId}`
    }, id)
    await firstValueFrom(deleteObservable);
    successCallBack();
  }

  async delete(id: number, successCallBack?: () => void,errorCallBack?: (errorMessage: string) => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "cases",
      action: `delete/${id}`
    }, id)
    await firstValueFrom(observable);
    successCallBack();
  }

}
