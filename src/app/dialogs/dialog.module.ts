import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FileUploadModule } from '../service/common/file-upload/file-upload.module';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { CreateAdvertDialogComponent } from './models/create-advert/create-advert-dialog.component';
import { CreateCaseDialogComponent } from './models/create-case/create-case-dialog.component';
import { SelectCasePdfDialogComponent } from './select-case-pdf-dialog/select-case-pdf-dialog.component';
import { SignOutDialogComponent } from './sign-out-dialog/sign-out-dialog.component';
import { PdfViewDialogComponent } from './pdf-view-dialog/pdf-view-dialog.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { UpdateCaseComponent } from './models/update-case/update-case.component';
import { UpdateAdvertComponent } from './models/update-advert/update-advert.component';
import { AuthorizeMenuDialogComponent } from './authorize-menu-dialog/authorize-menu-dialog.component';
import {MatListModule} from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthorizeUserDialogComponent } from './authorize-user-dialog/authorize-user-dialog.component';





@NgModule({
  declarations: [
    DeleteDialogComponent,
    CreateCaseDialogComponent, CreateAdvertDialogComponent,
    SelectCasePdfDialogComponent,
    SignOutDialogComponent,
    PdfViewDialogComponent,
    UpdateCaseComponent,
    UpdateAdvertComponent,
    AuthorizeMenuDialogComponent,
    AuthorizeUserDialogComponent
  ],
  imports: [
    CommonModule,

    MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, 
    MatCardModule, MatIconModule, MatSidenavModule, MatDatepickerModule, MatNativeDateModule, MatListModule, MatBadgeModule,
    
    FileUploadModule,
    NgxExtendedPdfViewerModule

  ]
})
export class DialogModule { }
