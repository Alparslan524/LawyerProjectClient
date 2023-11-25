import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdvertModule } from './advert/advert.module';
import { CalculationModule } from './calculation/calculation.module';
import { CaseModule } from './case/case.module';
import { MyAdvertModule } from './my-advert/my-advert.module';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { PasswordUpdateModule } from './password-update/password-update.module';
import { ProfileModule } from './profile/profile.module';
import { SidebarModule } from './sidebar/sidebar.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AdvertModule, CalculationModule, CaseModule, SidebarModule, MyAdvertModule, ProfileModule, PasswordResetModule, PasswordUpdateModule
  ]
})
export class ComponentsModule { }
