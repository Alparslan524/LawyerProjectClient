import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseComponent } from './case.component';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@angular/cdk/dialog';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    CaseComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: "", component: CaseComponent }]),
    MatCardModule, MatButtonModule,MatIconModule,
    DialogModule
  ]
})
export class CaseModule { }
