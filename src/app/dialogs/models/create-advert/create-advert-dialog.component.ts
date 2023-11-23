import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { CreateAdvert } from 'src/app/contracts/Adverts/create_advert';
import { AlertifyService, MessageType, Position } from 'src/app/service/common/alertify.service';
import { AdvertService } from 'src/app/service/common/models/advert.service';
import { BaseDialog } from '../../base/base-dialog';

@Component({
  selector: 'app-create-advert',
  templateUrl: './create-advert-dialog.component.html',
  styleUrls: ['./create-advert-dialog.component.scss']
})
export class CreateAdvertDialogComponent extends BaseDialog<CreateAdvertDialogComponent> implements OnInit {

  advertForm: FormGroup;
  
  constructor(dialogRef: MatDialogRef<CreateAdvertDialogComponent>, private fb: FormBuilder,
    private advertService: AdvertService, private alertify: AlertifyService, private spinner: NgxSpinnerService,) {
    super(dialogRef)
  }

  ngOnInit(): void {
    this.advertForm = this.fb.group({
      caseType: ['', Validators.required],
      caseDate: ['', Validators.required],
      price: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      district: ['', Validators.required],
      casePlace: ['', Validators.required],
      description: ['', Validators.required]
    })
  }


  async create() {
    this.advertForm.disable();
    this.spinner.show(SpinnerType.SquareJellyBox);

    const create_advert: CreateAdvert = new CreateAdvert();
    create_advert.UserNameOrEmail = localStorage.getItem("userNameOrEmail");
    create_advert.CaseType = this.advertForm.get('caseType').value;
    create_advert.CaseDate = this.advertForm.get('caseDate').value;
    create_advert.Price = this.advertForm.get('price').value;
    create_advert.City = this.advertForm.get('city').value;
    create_advert.Address = this.advertForm.get('address').value;
    create_advert.District = this.advertForm.get('district').value;
    create_advert.CasePlace = this.advertForm.get('casePlace').value;
    create_advert.Description = this.advertForm.get('description').value;

    await this.advertService.create(create_advert, async () => {
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
    this.spinner.hide(SpinnerType.SquareJellyBox);
  }
}