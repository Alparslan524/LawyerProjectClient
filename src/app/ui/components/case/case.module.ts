import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseComponent } from './case.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CaseComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: "", component: CaseComponent }])
  ]
})
export class CaseModule { }
