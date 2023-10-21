import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdvertComponent } from './advert.component';
import { MatTableModule } from '@angular/material/table';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from "@angular/material/button";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdvertComponent,
    CreateComponent,
    ListComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: "", component: AdvertComponent }]),
    MatTableModule, MatSidenavModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule
  ]
})
export class AdvertModule { }
