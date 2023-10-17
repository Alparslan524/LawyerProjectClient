import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculationComponent } from './calculation.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CalculationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: "", component: CalculationComponent }])
  ]
})
export class CalculationModule { }
