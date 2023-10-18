import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { DialogService } from 'src/app/service/common/dialog.service';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.scss']
})
export class AdvertComponent extends BaseComponent {
  constructor(spinner: NgxSpinnerService, private dialogService: DialogService) {
    super(spinner);
  }

  async deleteDialogDeneme(){
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data:DeleteState.Yes,
      afterClosed: async () => {
        await alert("Delete Dialog Başarıyla çalıştı!")
      }
    })
  }

}
