import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateAdvert } from 'src/app/contracts/Adverts/create_advert';
import { AlertifyService, MessageType, Position } from 'src/app/service/common/alertify.service';
import { AdvertService } from 'src/app/service/common/models/advert.service';
import { BaseDialog } from '../../base/base-dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-advert',
  templateUrl: './create-advert.component.html',
  styleUrls: ['./create-advert.component.scss']
})
export class CreateAdvertComponent extends BaseDialog<CreateAdvertComponent> implements OnInit {

  advertForm: FormGroup;
  caseTypes = ['Boş', 'Boşanma Davası', 'Tazminat Davası', 'Kira Davası'];

  constructor(dialogRef: MatDialogRef<CreateAdvertComponent>, private fb: FormBuilder,
    private advertService: AdvertService, private alertify: AlertifyService, private spinner: NgxSpinnerService) {
    super(dialogRef)
  }

  ngOnInit(): void {
    this.advertForm = this.fb.group({
      idUserFK: ['', Validators.required],
      caseType: ['', Validators.required],
      caseDate: ['', Validators.required],
      price: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      district: ['', Validators.required],
      casePlace: ['', Validators.required],
    })
  }




  create() {
    this.spinner.show(SpinnerType.SquareJellyBox);

    let caseTypeValue: number;

    switch (this.advertForm.value.caseType) {
      case 'Boş':
        caseTypeValue = 0;
        break;
      case 'Boşanma Davası':
        caseTypeValue = 1;
        break;
      case 'Tazminat Davası':
        caseTypeValue = 2;
        break;
      case 'Kira Davası':
        caseTypeValue = 3;
        break;
      default:
        caseTypeValue = -1; // Handle unexpected cases
        break;
    }

    const create_advert: CreateAdvert = new CreateAdvert();
    create_advert.IdUserFK = this.advertForm.get('idUserFK').value;
    create_advert.CaseType = caseTypeValue;
    create_advert.CaseDate = this.advertForm.get('caseDate').value;
    create_advert.Price = this.advertForm.get('price').value;
    create_advert.City = this.advertForm.get('city').value;
    create_advert.Address = this.advertForm.get('address').value;
    create_advert.District = this.advertForm.get('district').value;
    create_advert.CasePlace = this.advertForm.get('casePlace').value;

    this.advertService.create(create_advert, () => {
      this.spinner.hide(SpinnerType.SquareJellyBox);
      this.alertify.message("İlan başarıyla eklenmiştir!!", {
        messageType: MessageType.Success,
        position: Position.TopRight,
        dismissOthers: true
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
}