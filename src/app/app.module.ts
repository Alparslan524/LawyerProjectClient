import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { RegisterModule } from './ui/components/register/register.module';
import { SidebarModule } from './ui/components/sidebar/sidebar.module';
import { JwtModule } from '@auth0/angular-jwt';
import { RegisterComponent } from './ui/components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { HttpErrorInterceptorService } from './service/common/interceptor/http-error-interceptor.service';
import {MatButtonModule} from '@angular/material/button';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpClientModule,
    AppRoutingModule, ReactiveFormsModule,
    AdminModule, UiModule,
    MatSidenavModule,MatButtonModule,
    NgxSpinnerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem("accessToken"),
        allowedDomains: ["localhost:7076"]
      }
    }),
    SocialLoginModule, GoogleSigninButtonModule,
    NgxExtendedPdfViewerModule
  ],
  providers: [{ provide: "baseUrl", useValue: "https://localhost:7076/api", multi: true },
  {
    provide: "SocialAuthServiceConfig",
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("855017375266-l577p56g8mgvmpk8bsscdqjcvmqie8g9.apps.googleusercontent.com")
        }
      ],
      onError: err => console.log(err)
    } as SocialAuthServiceConfig
  },
  {
    provide:HTTP_INTERCEPTORS,useClass:HttpErrorInterceptorService,multi:true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
