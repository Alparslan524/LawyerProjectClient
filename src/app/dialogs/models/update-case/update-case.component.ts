import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from 'src/app/service/common/alertify.service';
import { CaseService } from 'src/app/service/common/models/case.service';
import { SpinnerType } from 'src/app/base/base.component';
import { UpdateCase } from 'src/app/contracts/Case/update_case';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-update-case',
  templateUrl: './update-case.component.html',
  styleUrls: ['./update-case.component.scss']
})
export class UpdateCaseComponent extends BaseDialog<UpdateCaseComponent> implements OnInit {
  constructor(dialogRef: MatDialogRef<UpdateCaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateCase,
    private fb: FormBuilder, private spinner: NgxSpinnerService,
    private caseService: CaseService, private alertify: AlertifyService) {
    super(dialogRef)
  }

  caseTypes = ['Boş', 'Boşanma Davası', 'Tazminat Davası', 'Kira Davası'];
  caseTypeValue: number;
  caseTypeString: string;
  caseForm: FormGroup;

  ngOnInit(): void {
    this.caseForm = this.fb.group({
      caseNumber: [this.data.caseNumber, Validators.required],
      caseNot: [this.data.caseNot, Validators.required],
      caseDescription: [this.data.caseDescription, Validators.required],
      caseType: [this.getCaseTypeValueUpdateCase(), Validators.required],
      caseDate: [formatDate(this.data.caseDate, 'yyyy-MM-dd', 'en-US'), Validators.required]
    })
  }

  async update() {
    this.caseForm.disable();
    this.spinner.show(SpinnerType.SquareJellyBox);
    const update_case: UpdateCase = new UpdateCase();
    update_case.objectId = this.data.objectId;
    update_case.caseNumber = this.caseForm.get('caseNumber').value;
    update_case.caseNot = this.caseForm.get('caseNot').value;
    update_case.caseDescription = this.caseForm.get('caseDescription').value;
    update_case.caseType = this.getCaseTypeValue();
    update_case.caseDate = this.caseForm.get('caseDate').value;

    await this.caseService.update(update_case, async () => {
      this.alertify.message("Dava Başarıyla Güncellenmiştir!", {
        messageType: MessageType.Success,
        position: Position.TopRight
      })
    }, errorMessage => {
      this.alertify.message(errorMessage, {
        dismissOthers: true,
        position: Position.TopRight,
        messageType: MessageType.Error
      })
    })
    this.caseForm.reset();
    this.caseForm.enable();
    this.close();
    this.spinner.hide(SpinnerType.SquareJellyBox);
  }

  getCaseTypeValue(): number {
    switch (this.caseForm.value.caseType) {
      case 'Boş':
        this.caseTypeValue = 0;
        break;
      case 'Boşanma Davası':
        this.caseTypeValue = 1;
        break;
      case 'Tazminat Davası':
        this.caseTypeValue = 2;
        break;
      case 'Kira Davası':
        this.caseTypeValue = 3;
        break;
      default:
        this.caseTypeValue = -1; // Handle unexpected cases
        break;
    }
    return this.caseTypeValue;
  }

  getCaseTypeValueUpdateCase(): string {
    switch (this.data.caseType) {
      case 0:
        this.caseTypeString = 'Boş'
        break;
      case 1:
        this.caseTypeString = 'Boşanma Davası'
        break;
      case 2:
        this.caseTypeString = 'Tazminat Davası'
        break;
      case 3:
        this.caseTypeString = 'Kira Davası'
        break;
      default:
        this.caseTypeString = null; // Handle unexpected cases
        break;
    }
    return this.caseTypeString;
  }
}
