import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthorizeMenuComponent } from './authorize-menu/authorize-menu.component';
import {MatTreeModule} from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RoleModule } from './role/role.module';



@NgModule({
  declarations: [
    AdminHomeComponent,
    AuthorizeMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: "", component: AdminHomeComponent }]),
    MatSidenavModule, MatTreeModule, MatIconModule, MatButtonModule,
    RoleModule
    
  ]
})
export class AdminHomeModule { }
