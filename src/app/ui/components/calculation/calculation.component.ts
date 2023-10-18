import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/service/common/alertify.service';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent extends BaseComponent {
  constructor(spinner: NgxSpinnerService, private alertifyService: AlertifyService) {
    super(spinner);
  }

  message = "Alertify Çalşışıyor!!"
  natificationError() {
    this.alertifyService.message(this.message, {
      dismissOthers: false,
      messageType: MessageType.Error,
      position: Position.TopRight
    });
  }

  natificationSuccess() {
    this.alertifyService.message(this.message, {
      dismissOthers: false,
      messageType: MessageType.Success,
      position: Position.TopRight
    });
  }

  natificationDismisOther() {
    this.alertifyService.dismiss();
  }

}
