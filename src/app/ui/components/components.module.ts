import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NewsModule } from './news/news.module';
import { AdvertModule } from './advert/advert.module';
import { CalculationModule } from './calculation/calculation.module';
import { ConstitutionModule } from './constitution/constitution.module';
import { MyLawsuitModule } from './my-lawsuit/my-lawsuit.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AdvertModule, CalculationModule, ConstitutionModule, MyLawsuitModule, NewsModule
  ]
})
export class ComponentsModule { }
