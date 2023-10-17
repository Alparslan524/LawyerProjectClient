import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstitutionComponent } from './constitution.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ConstitutionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: "", component: ConstitutionComponent }])
  ]
})
export class ConstitutionModule { }
