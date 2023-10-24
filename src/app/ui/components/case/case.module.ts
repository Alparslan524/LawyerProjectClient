import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseComponent } from './case.component';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@angular/cdk/dialog';



@NgModule({
  declarations: [
    CaseComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: "", component: CaseComponent }]),
    DialogModule
  ]
})
export class CaseModule { }
