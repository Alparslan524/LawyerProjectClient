import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { HttpClientService } from 'src/app/service/common/http-client-service.service';
import { AdvertService } from 'src/app/service/common/models/advert.service';

declare var $: any

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {
  //element => Directiveyi kullandığımız HTML nesnesi
  constructor(private element: ElementRef, private _renderer: Renderer2, private httpClientService: HttpClientService,
    private advertService: AdvertService, private spinner: NgxSpinnerService) {
      
    const img = _renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/icons-delete-30.png");
    img.setAttribute("style", "cursor: pointer;");
    _renderer.appendChild(element.nativeElement, img);

  }

  @Input() id: number;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  async onClick() {
    this.spinner.show(SpinnerType.SquareJellyBox);
    const td: HTMLTableCellElement = this.element.nativeElement;
    await this.advertService.delete(this.id)
    $(td.parentElement).fadeOut(2000, () => {
      this.callback.emit();
    });
  }


}
