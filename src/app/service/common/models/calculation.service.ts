import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SeverancePay } from 'src/app/contracts/Calculations/SeverancePay';
import { Observable, firstValueFrom } from 'rxjs';
import { NoticePay } from 'src/app/contracts/Calculations/NoticePay';
import { AnnualLeave } from 'src/app/contracts/Calculations/AnnualLeave';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor(private httpClientService: HttpClientService) { }

  async getNetToGross(netFee: number, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ grossFee: number }> {
    const promiseData: Promise<{ grossFee: number }> = this.httpClientService.get<{ grossFee: number }>({
      controller: "calculations",
      action: `getnettogross/${netFee}`
    }).toPromise();

    promiseData.then(d => successCallBack()).catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message));
    return await promiseData;
  }

  async getGrossToNet(grossFee: number, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ netFee: number }> {
    const promiseData: Promise<{ netFee: number }> = this.httpClientService.get<{ netFee: number }>({
      controller: "calculations",
      action: `getgrosstonet/${grossFee}`
    }).toPromise();
    promiseData.then(d => successCallBack()).catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message));
    return await promiseData;
  }

  async getSeverancePay(severancePay: SeverancePay, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ severancePay: number }> {
    const promiseData: Promise<{ severancePay: number }> = this.httpClientService.post<any>({
      controller: "calculations",
      action: "getseverancepay"
    }, severancePay).toPromise();
    promiseData.then(d => successCallBack()).catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message));
    return await promiseData;
  }

  async getNoticeePay(noticePay: NoticePay, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ noticePay: number }> {
    const promiseData: Promise<{ noticePay: number }> = this.httpClientService.post<any>({
      controller: "calculations",
      action: "getnoticepay"
    }, noticePay).toPromise();
    promiseData.then(d => successCallBack()).catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message));
    return await promiseData;
  }

  async getAnnualLeave(annualLeave: AnnualLeave, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ annualLeaveDay: number, annualFee: number }> {
    const promiseData: Promise<{ annualLeaveDay: number, annualFee: number }> = this.httpClientService.post<any>({
      controller: "calculations",
      action: "getannualleave"
    }, annualLeave).toPromise();
    promiseData.then(d => successCallBack()).catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message));
    return await promiseData;
  }

}