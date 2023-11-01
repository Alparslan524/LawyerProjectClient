import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdvertModule } from './advert/advert.module';
import { CalculationModule } from './calculation/calculation.module';
import { CaseModule } from './case/case.module';
import { ConstitutionModule } from './constitution/constitution.module';
import { NewsModule } from './news/news.module';
import { RegisterModule } from './register/register.module';
import { SidebarModule } from './sidebar/sidebar.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AdvertModule, CalculationModule, ConstitutionModule, CaseModule, NewsModule, SidebarModule,
  ]
})
export class ComponentsModule { }
