import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule, AppRoutingModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }
