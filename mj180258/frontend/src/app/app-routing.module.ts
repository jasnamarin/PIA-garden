import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPublicComponent } from './login-public/login-public.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { AdminComponent } from './admin/admin.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CompanyPageComponent } from './company-page/company-page.component';
import { DecoratorComponent } from './decorator/decorator.component';
import { OwnerComponent } from './owner/owner.component';
import { SignupComponent } from './signup/signup.component';
import { AdminAuthGuard } from './utils/auth-guard';

const routes: Routes = [
  { component: LandingPageComponent, path: '' },
  { component: LoginPublicComponent, path: 'login' },
  { component: LoginAdminComponent, path: 'adminlogin' },
  { component: SignupComponent, path: 'signup' },
  { component: AdminComponent, path: 'admin', canActivate: [AdminAuthGuard] },
  { component: DecoratorComponent, path: 'decorator' },
  { component: OwnerComponent, path: 'owner' },
  { component: ChangePasswordComponent, path: 'password' },
  { component: CompanyPageComponent, path: 'firm' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
