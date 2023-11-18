import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetitionComponent } from './petition.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PetitionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: "", component: PetitionComponent }]),
    MatSidenavModule,
  ]
})
export class PetitionModule { }
