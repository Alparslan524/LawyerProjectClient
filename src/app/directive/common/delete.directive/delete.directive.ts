import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/service/common/alertify.service';
import { DialogService } from 'src/app/service/common/dialog.service';
import { HttpClientService } from 'src/app/service/common/http-client-service.service';

declare var $: any

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {
  //element => Directiveyi kullandığımız HTML nesnesi
  constructor(private element: ElementRef, private _renderer: Renderer2, private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService, private dialog: MatDialog, private alertifyService: AlertifyService,
    private dialogService: DialogService) {

    const img = _renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/icons-delete-30.png");
    img.setAttribute("style", "cursor: pointer;");
    _renderer.appendChild(element.nativeElement, img);

  }

  @Input() id: number;
  @Input() controller: string;
  @Input() action: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  async onClick() {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        {
          this.spinner.show(SpinnerType.SquareJellyBox);
          const td: HTMLTableCellElement = this.element.nativeElement;
          //await this.advertService.delete(this.id)
          this.httpClientService.delete({
            controller: this.controller,
            action: this.action,
          }, this.id).subscribe(data => {
            $(td.parentElement).fadeOut(2000, () => {
              this.callback.emit();
              this.alertifyService.message("Başarıyla silinmiştir", {
                messageType: MessageType.Success,
                position: Position.TopRight
              })
            });
          }, (errorResponse: HttpErrorResponse) => {
            this.spinner.hide(SpinnerType.SquareJellyBox);
            this.alertifyService.message("Beklenmeyen Hata", {
              messageType: MessageType.Error,
              position: Position.TopRight
            })
          });
        }
      }
    })
  }
}
