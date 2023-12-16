import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from '@angular/cdk/dialog';
import { DeleteDirectiveModule } from 'src/app/directive/common/delete.directive/delete.directive.module';



@NgModule({
  declarations: [
    RoleComponent,
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatDialogModule,
    DialogModule,
    DeleteDirectiveModule
  ],
  exports:[RoleComponent]
})
export class RoleModule { }
