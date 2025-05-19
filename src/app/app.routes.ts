import { Routes } from '@angular/router';
import { LoginComponent } from './auth/component/login/login.component';
import { RegisterComponent } from './auth/component/register/register.component';
import { LandingComponent } from './landing/pages/landing/landing.component';
import { LoginCodeComponent } from './routine/component/login-code/login-code.component';
import { DashboardComponent } from './physio/pages/dashboard/dashboard.component';
import { AccountComponent } from './physio/pages/account/account.component';
import { PrivacyComponent } from './physio/pages/privacy/privacy.component';
import { ChangePasswordComponent } from './physio/pages/change-password/change-password.component';
import { PayComponent } from './payment/pages/pay/pay.component';
import { AccountPaymentComponent } from './payment/pages/account-payment/account-payment.component';
import { RoutineManageComponent } from './physio/pages/routine-manage/routine-manage.component';
import { RoutineCreatorComponent } from './physio/pages/routine-manage/routine-creator/routine-creator.component';
import { MedicalRecordComponent } from './physio/pages/medical-record/medical-record.component';
import { PatientRecordComponent } from './physio/pages/medical-record/patient-record/patient-record.component';
import { ExerciseComponent } from './routine/pages/exercise/exercise.component';
import { ExerciseSummaryComponent } from './routine/pages/exercise-summary/exercise-summary.component';

export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'login/code', component: LoginCodeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'account', component: AccountComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'change/password', component: ChangePasswordComponent },
  { path: 'payment', component: PayComponent },
  { path: 'account/payment', component: AccountPaymentComponent },
  { path: 'routinemanage', component: RoutineManageComponent },
  { path: 'routinecreator', component: RoutineCreatorComponent },
  { path: 'routinemanage/:id', component: RoutineCreatorComponent },
  { path: 'medicalrecordmanage', component: MedicalRecordComponent },
  { path: 'patientrecord', component: PatientRecordComponent },
  { path: 'exercise', component: ExerciseComponent },
  { path: 'exercise/summary', component: ExerciseSummaryComponent },
];
