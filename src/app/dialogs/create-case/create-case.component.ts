import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { CreateCase } from 'src/app/contracts/Case/create_case';
import { AlertifyService, MessageType, Position } from 'src/app/service/common/alertify.service';
import { CaseService } from 'src/app/service/common/models/case.service';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-create-case',
  templateUrl: './create-case.component.html',
  styleUrls: ['./create-case.component.scss']
})
export class CreateCaseComponent extends BaseDialog<CreateCaseComponent> implements OnInit {
  constructor(dialogRef: MatDialogRef<CreateCaseComponent>, private fb: FormBuilder, private spinner: NgxSpinnerService,
    private caseService: CaseService, private alertify: AlertifyService) {
    super(dialogRef);
  }

  caseTypes = ['Boş', 'Boşanma Davası', 'Tazminat Davası', 'Kira Davası'];
  caseTypeValue: number;
  caseForm: FormGroup;

  ngOnInit(): void {
    this.caseForm = this.fb.group({
      idUserFK: ['', Validators.required],
      caseNumber: ['', Validators.required],
      caseNot: ['', Validators.required],
      caseDescription: ['', Validators.required],
      caseType: ['', Validators.required],
      caseDate: ['', Validators.required]
    })
  }

  create() {
    debugger;
    this.spinner.show(SpinnerType.SquareJellyBox);

    const create_case: CreateCase = new CreateCase();
    create_case.IdUserFK = this.caseForm.get('idUserFK').value;
    create_case.CaseNumber = this.caseForm.get('caseNumber').value;
    create_case.CaseNot = this.caseForm.get('caseNot').value;
    create_case.CaseDescription = this.caseForm.get('caseDescription').value;
    create_case.CaseType = this.getCaseTypeValue();
    create_case.CaseDate = this.caseForm.get('caseDate').value;

    this.caseService.create(create_case, () => {
      this.spinner.hide(SpinnerType.SquareJellyBox);
      this.alertify.message("Dava Başarıyla Eklenmiştir!", {
        messageType: MessageType.Success,
        position: Position.TopRight
      });
    }, errorMessage => {
      this.spinner.hide(SpinnerType.SquareJellyBox);
      this.alertify.message(errorMessage, {
        dismissOthers: true,
        position: Position.TopRight,
        messageType: MessageType.Error
      })
    })
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
}
