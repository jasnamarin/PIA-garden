import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPublicComponent } from './login-public/login-public.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { AdminComponent } from './admin/admin.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { ProfileComponent } from './profile/profile.component';
import { CompanyPageComponent } from './company-page/company-page.component';
import { DecoratorComponent } from './decorator/decorator.component';
import { OwnerComponent } from './owner/owner.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './utils/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginPublicComponent,
    LoginAdminComponent,
    AdminComponent,
    LandingPageComponent,
    ChangePasswordComponent,
    CompanyListComponent,
    ProfileComponent,
    CompanyPageComponent,
    DecoratorComponent,
    OwnerComponent,
    SignupComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
