import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculationComponent } from './calculation.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NetGrossComponent } from './net-gross/net-gross.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { GrossNetComponent } from './gross-net/gross-net.component';
import { SeverancePayComponent } from './severance-pay/severance-pay.component';
import { NoticePayComponent } from './notice-pay/notice-pay.component';
import { AnnualLeaveComponent } from './annual-leave/annual-leave.component';



@NgModule({
  declarations: [
    CalculationComponent,
    NetGrossComponent,
    GrossNetComponent,
    SeverancePayComponent,
    NoticePayComponent,
    AnnualLeaveComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: "", component: CalculationComponent }]),
    MatSidenavModule, MatCardModule, MatButtonModule, MatSidenavModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatDialogModule,MatCardModule,MatIconModule,MatDatepickerModule,
  ]
})
export class CalculationModule { }
