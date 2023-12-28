import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CalculationService } from 'src/app/service/common/models/calculation.service';

@Component({
  selector: 'app-net-gross',
  templateUrl: './net-gross.component.html',
  styleUrls: ['./net-gross.component.scss']
})
export class NetGrossComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private fb: FormBuilder, private calculationService: CalculationService) {
    super(spinner);
  }

  netForm: FormGroup;
  ngOnInit(): void {
    this.netForm = this.fb.group({
      netToGross: ['', Validators.required],
    })
  }

  grossFee: number;

  async getNetToGross() {
    this.netForm.disable();
    this.showSpinner(SpinnerType.SquareJellyBox);

    this.grossFee = (await this.calculationService.getNetToGross(this.netForm.get('netToGross').value)).grossFee;
    
    this.netForm.enable();
    this.hideSpinner(SpinnerType.SquareJellyBox);
  }





}
