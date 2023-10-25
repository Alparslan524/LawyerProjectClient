import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateAdvertComponent } from './models/create-advert/create-advert.component';
import { CreateCaseComponent } from './models/create-case/create-case.component';




@NgModule({
  declarations: [
    DeleteDialogComponent,
    FileUploadDialogComponent,
    CreateCaseComponent,
    CreateAdvertComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule
  ]
})
export class DialogModule { }
