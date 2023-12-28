import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AnnualLeave } from 'src/app/contracts/Calculations/AnnualLeave';
import { CalculationService } from 'src/app/service/common/models/calculation.service';

@Component({
  selector: 'app-annual-leave',
  templateUrl: './annual-leave.component.html',
  styleUrls: ['./annual-leave.component.scss']
})
export class AnnualLeaveComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private fb: FormBuilder, private calculationService: CalculationService) {
    super(spinner);
  }

  annualLeaveForm: FormGroup;
  ngOnInit(): void {
    this.annualLeaveForm = this.fb.group({
      dateOfEntry: ['', Validators.required],
      netSalary: ['', Validators.required],
    })
  }


  annualFee: number;
  annualLeaveDay: number;

  async getAnnualLeave() {
    this.annualLeaveForm.disable();
    this.showSpinner(SpinnerType.SquareJellyBox);

    const getAnnualLeave: AnnualLeave = new AnnualLeave();
    getAnnualLeave.DateOfEntry = this.annualLeaveForm.get('dateOfEntry').value;
    getAnnualLeave.NetSalary = this.annualLeaveForm.get('netSalary').value;


    const annualLeave: { annualLeaveDay: number, annualFee: number } = await this.calculationService.getAnnualLeave(getAnnualLeave)
    this.annualFee = annualLeave.annualFee;
    this.annualLeaveDay = annualLeave.annualLeaveDay;


    this.annualLeaveForm.enable();
    this.hideSpinner(SpinnerType.SquareJellyBox);
  }

}