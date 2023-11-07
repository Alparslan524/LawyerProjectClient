import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { CaseComponent } from './case.component';



@NgModule({
  declarations: [
    CaseComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: "", component: CaseComponent }]),
    MatCardModule, MatButtonModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatSidenavModule,
    DialogModule
  ]
})
export class CaseModule { }
