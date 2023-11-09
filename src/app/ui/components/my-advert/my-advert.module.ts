import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MyAdvertComponent } from './my-advert.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';



@NgModule({
  declarations: [
    MyAdvertComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: "", component: MyAdvertComponent }]),
    MatButtonModule, MatSidenavModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatDialogModule,MatCardModule,MatIconModule,MatDatepickerModule,
  ]
})
export class MyAdvertModule { }
