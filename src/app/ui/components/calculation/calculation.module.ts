import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculationComponent } from './calculation.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';



@NgModule({
  declarations: [
    CalculationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: "", component: CalculationComponent }]),
    MatSidenavModule,
  ]
})
export class CalculationModule { }
