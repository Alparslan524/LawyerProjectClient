import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule, AppRoutingModule, RouterModule.forChild([{ path: "", component: SidebarComponent }]),
    MatButtonModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }
