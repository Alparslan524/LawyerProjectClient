import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { SeverancePay } from 'src/app/contracts/Calculations/SeverancePay';
import { CalculationService } from 'src/app/service/common/models/calculation.service';

@Component({
  selector: 'app-severance-pay',
  templateUrl: './severance-pay.component.html',
  styleUrls: ['./severance-pay.component.scss']
})
export class SeverancePayComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private fb: FormBuilder, private calculationService: CalculationService) {
    super(spinner);
  }

  severanceForm: FormGroup;
  ngOnInit(): void {
    this.severanceForm = this.fb.group({
      dateOfEntry: ['', Validators.required],
      dateOfRelease: ['', Validators.required],
      netSalary: ['', Validators.required],
    })
  }

  severancePay: number;

  async getSeverancePay() {
    this.severanceForm.disable();
    this.showSpinner(SpinnerType.SquareJellyBox);

    const getSeverancePay: SeverancePay = new SeverancePay();
    getSeverancePay.DateOfEntry = this.severanceForm.get('dateOfEntry').value;
    getSeverancePay.DateOfRelease = this.severanceForm.get('dateOfRelease').value;
    getSeverancePay.NetSalary = this.severanceForm.get('netSalary').value;

    this.severancePay = (await this.calculationService.getSeverancePay(getSeverancePay)).severancePay;

    this.severanceForm.enable();
    this.hideSpinner(SpinnerType.SquareJellyBox);
  }
  
}
