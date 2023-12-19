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
import { UserModule } from './user/user.module';



@NgModule({
  declarations: [
    AdminHomeComponent,
    AuthorizeMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: "", component: AdminHomeComponent }]),
    MatSidenavModule, MatTreeModule, MatIconModule, MatButtonModule,
    RoleModule, UserModule
    
  ]
})
export class AdminHomeModule { }
