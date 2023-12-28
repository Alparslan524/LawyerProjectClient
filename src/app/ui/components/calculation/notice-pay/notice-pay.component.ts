import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NoticePay } from 'src/app/contracts/Calculations/NoticePay';
import { CalculationService } from 'src/app/service/common/models/calculation.service';

@Component({
  selector: 'app-notice-pay',
  templateUrl: './notice-pay.component.html',
  styleUrls: ['./notice-pay.component.scss']
})
export class NoticePayComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private fb: FormBuilder, private calculationService: CalculationService) {
    super(spinner);
  }

  noticeForm: FormGroup;
  ngOnInit(): void {
    this.noticeForm = this.fb.group({
      dateOfEntry: ['', Validators.required],
      dateOfRelease: ['', Validators.required],
      netSalary: ['', Validators.required],
    })
  }

  noticePay: number;

  async getNoticePay() {
    this.noticeForm.disable();
    this.showSpinner(SpinnerType.SquareJellyBox);

    const getNoticePay: NoticePay = new NoticePay();
    getNoticePay.DateOfEntry = this.noticeForm.get('dateOfEntry').value;
    getNoticePay.DateOfRelease = this.noticeForm.get('dateOfRelease').value;
    getNoticePay.NetSalary = this.noticeForm.get('netSalary').value;

    this.noticePay = (await this.calculationService.getNoticeePay(getNoticePay)).noticePay;

    this.noticeForm.enable();
    this.hideSpinner(SpinnerType.SquareJellyBox);
  }

}
