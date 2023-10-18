import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertComponent } from './advert.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from '@angular/cdk/dialog';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';



@NgModule({
  declarations: [
    AdvertComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: "", component: AdvertComponent }]),
    MatDialogModule, MatButtonModule, MatCardModule
  ]
})
export class AdvertModule { }
