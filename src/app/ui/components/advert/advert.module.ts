import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { AdvertComponent } from './advert.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { DeleteDirective } from 'src/app/directive/common/delete.directive';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { FileUploadModule } from 'src/app/service/common/file-upload/file-upload.module';


@NgModule({
  declarations: [
    AdvertComponent,
    CreateComponent,
    ListComponent,
    DeleteDirective

  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: "", component: AdvertComponent }]),
    MatTableModule, MatSidenavModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule, MatPaginatorModule, MatDialogModule,
    MatDialogModule, FileUploadModule
  ]
})
export class AdvertModule { }
