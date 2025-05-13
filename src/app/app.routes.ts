import { Routes } from '@angular/router';
import { LoginComponent } from './auth/component/login/login.component';
import { RegisterComponent } from './auth/component/register/register.component';
import { LandingComponent } from './landing/pages/landing/landing.component';
import { LoginCodeComponent } from './routine/component/login-code/login-code.component';
import { LoginCameraComponent } from './routine/component/login-camera/login-camera.component';
//import { DashboardComponent } from './physio/pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'login/code', component: LoginCodeComponent },
  //{ path: 'login/camera', component: LoginCameraComponent },
  //{ path: 'dashboard', component: DashboardComponent },
];
