import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { DeleteDirective } from 'src/app/directive/common/delete.directive';
import { FileUploadModule } from 'src/app/service/common/file-upload/file-upload.module';
import { AdvertComponent } from './advert.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    AdvertComponent,
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
