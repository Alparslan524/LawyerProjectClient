import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FileUploadModule } from '../service/common/file-upload/file-upload.module';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { CreateAdvertComponent } from './models/create-advert/create-advert.component';
import { CreateCaseComponent } from './models/create-case/create-case.component';
import { SelectCasePdfDialogComponent } from './select-case-pdf-dialog/select-case-pdf-dialog.component';
import { SignOutDialogComponent } from './sign-out-dialog/sign-out-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';




@NgModule({
  declarations: [
    DeleteDialogComponent,
    CreateCaseComponent, CreateAdvertComponent,
    SelectCasePdfDialogComponent,
    SignOutDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatCardModule, MatIconModule, MatSidenavModule, MatDatepickerModule, MatNativeDateModule,
    FileUploadModule


  ]
})
export class DialogModule { }
