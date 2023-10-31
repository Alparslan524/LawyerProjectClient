import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule, AppRoutingModule, RouterModule.forChild([{ path: "", component: SidebarComponent }]),
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }
