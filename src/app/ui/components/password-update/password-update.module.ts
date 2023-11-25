import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PasswordUpdateComponent } from './password-update.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [PasswordUpdateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: PasswordUpdateComponent }
    ]),
    ReactiveFormsModule
  ]
})
export class PasswordUpdateModule { }
