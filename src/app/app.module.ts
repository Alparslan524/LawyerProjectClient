import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { RegisterModule } from './ui/components/register/register.module';
import { SidebarModule } from './ui/components/sidebar/sidebar.module';
import { JwtModule } from '@auth0/angular-jwt';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpClientModule,
    AppRoutingModule,
    AdminModule, UiModule, RegisterModule, SidebarModule,
    MatSidenavModule,
    NgxSpinnerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem("accessToken"),
        allowedDomains: ["localhost:7076"]
      }
    })
  ],
  providers: [{ provide: "baseUrl", useValue: "https://localhost:7076/api", multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
