import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { CreateCase } from 'src/app/contracts/Case/create_case';
import { AlertifyService, MessageType, Position } from 'src/app/service/common/alertify.service';
import { CaseService } from 'src/app/service/common/models/case.service';
import { BaseDialog } from '../../base/base-dialog';


@Component({
  selector: 'app-create-case',
  templateUrl: './create-case-dialog.component.html',
  styleUrls: ['./create-case-dialog.component.scss']
})
export class CreateCaseDialogComponent extends BaseDialog<CreateCaseDialogComponent> implements OnInit {
  constructor(dialogRef: MatDialogRef<CreateCaseDialogComponent>, private fb: FormBuilder, private spinner: NgxSpinnerService,
    private caseService: CaseService, private alertify: AlertifyService) {
    super(dialogRef);
  }

  caseForm: FormGroup;

  ngOnInit(): void {
    this.caseForm = this.fb.group({
      caseNumber: ['', Validators.required],
      caseNot: ['', Validators.required],
      caseDescription: ['', Validators.required],
      caseType: ['', Validators.required],
      caseDate: ['', Validators.required]
    })
  }

  async create() {
    this.caseForm.disable();
    this.spinner.show(SpinnerType.SquareJellyBox);

    const create_case: CreateCase = new CreateCase();
    create_case.UserNameOrEmail = localStorage.getItem("userNameOrEmail");
    create_case.CaseNumber = this.caseForm.get('caseNumber').value;
    create_case.CaseNot = this.caseForm.get('caseNot').value;
    create_case.CaseDescription = this.caseForm.get('caseDescription').value;
    create_case.CaseType = this.caseForm.get('caseType').value;
    create_case.CaseDate = this.caseForm.get('caseDate').value;

    await this.caseService.create(create_case, async () => {
      this.alertify.message("Dava Başarıyla Eklenmiştir!", {
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
    this.spinner.hide(SpinnerType.SquareJellyBox);
  }
}
