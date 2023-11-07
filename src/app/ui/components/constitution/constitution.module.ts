import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstitutionComponent } from './constitution.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';



@NgModule({
  declarations: [
    ConstitutionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: "", component: ConstitutionComponent }]),
    MatSidenavModule,
  ]
})
export class ConstitutionModule { }
