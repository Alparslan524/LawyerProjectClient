import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyLawsuitComponent } from './my-lawsuit.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MyLawsuitComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: "", component: MyLawsuitComponent }])
  ]
})
export class MyLawsuitModule { }
