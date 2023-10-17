import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertComponent } from './advert.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AdvertComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: "", component: AdvertComponent }])
  ]
})
export class AdvertModule { }
