import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpdateAdvert } from 'src/app/contracts/Adverts/update_advert';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdvertService } from 'src/app/service/common/models/advert.service';
import { AlertifyService, MessageType, Position } from 'src/app/service/common/alertify.service';
import { formatDate } from '@angular/common';
import { SpinnerType } from 'src/app/base/base.component';
import { DialogService } from 'src/app/service/common/dialog.service';

@Component({
  selector: 'app-update-advert',
  templateUrl: './update-advert.component.html',
  styleUrls: ['./update-advert.component.scss']
})
export class UpdateAdvertComponent extends BaseDialog<UpdateAdvertComponent> implements OnInit {
  constructor(dialogRef: MatDialogRef<UpdateAdvertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateAdvert,
    private fb: FormBuilder, private spinner: NgxSpinnerService,
    private advertService: AdvertService, private alertify: AlertifyService) {
    super(dialogRef)
  }

  advertForm: FormGroup;
  caseTypes = ['Boş', 'Boşanma Davası', 'Tazminat Davası', 'Kira Davası'];
  caseTypeString: string;
  caseTypeValue: number;

  ngOnInit(): void {
    this.advertForm = this.fb.group({
      caseType: [this.getCaseTypeValueUpdateCase(), Validators.required],
      caseDate: [formatDate(this.data.caseDate, 'yyyy-MM-dd', 'en-US'), Validators.required],
      price: [this.data.price, Validators.required],
      city: [this.data.city, Validators.required],
      address: [this.data.address, Validators.required],
      district: [this.data.district, Validators.required],
      casePlace: [this.data.casePlace, Validators.required],
      description: [this.data.description, Validators.required]
    })
  }

  async update() {
    this.advertForm.disable();
    this.spinner.show(SpinnerType.SquareJellyBox);


    const update_advert: UpdateAdvert = new UpdateAdvert();
    update_advert.objectId = this.data.objectId;
    update_advert.caseType = this.getCaseTypeValue();
    update_advert.caseDate = this.advertForm.get('caseDate').value;
    update_advert.price = this.advertForm.get('price').value;
    update_advert.city = this.advertForm.get('city').value;
    update_advert.address = this.advertForm.get('address').value;
    update_advert.district = this.advertForm.get('district').value;
    update_advert.casePlace = this.advertForm.get('casePlace').value;
    update_advert.description = this.advertForm.get('description').value;

    await this.advertService.update(update_advert, async () => {
      this.alertify.message("İlan başarıyla eklenmiştir!!", {
        messageType: MessageType.Success,
        position: Position.TopRight,
      })
    }, errorMessage => {
      this.alertify.message(errorMessage, {
        position: Position.TopRight,
        messageType: MessageType.Error
      })
    })
    this.advertForm.reset();
    this.advertForm.enable();
    this.close();
    this.spinner.hide(SpinnerType.SquareJellyBox);
  }

  getCaseTypeValue(): number {
    switch (this.advertForm.value.caseType) {
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
