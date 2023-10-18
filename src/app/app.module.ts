import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule, UiModule,
    MatSidenavModule,
    NgxSpinnerModule
  ],
  providers: [{ provide: "baseUrl", useValue: "https://localhost:7032/api", multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
