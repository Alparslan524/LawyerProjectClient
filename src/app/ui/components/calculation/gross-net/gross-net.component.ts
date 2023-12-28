import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CalculationService } from 'src/app/service/common/models/calculation.service';

@Component({
  selector: 'app-gross-net',
  templateUrl: './gross-net.component.html',
  styleUrls: ['./gross-net.component.scss']
})
export class GrossNetComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private fb: FormBuilder, private calculationService: CalculationService) {
    super(spinner);
  }

  grossForm: FormGroup;
  ngOnInit(): void {
    this.grossForm = this.fb.group({
      grossToNet: ['', Validators.required],
    })
  }

  netFee: number;

  async getGrossToNet() {
    this.grossForm.disable();
    this.showSpinner(SpinnerType.SquareJellyBox);

    this.netFee = (await this.calculationService.getGrossToNet(this.grossForm.get('grossToNet').value)).netFee;
    
    this.grossForm.enable();
    this.hideSpinner(SpinnerType.SquareJellyBox);
  }



}
