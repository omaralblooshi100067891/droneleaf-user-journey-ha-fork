import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountTypeComponent } from '../account-type.component/account-type.component.component';
import { PersonalInfoFormComponent } from '../register-steps/personal-info-form/personal-info-form.component';
import { EmailVerificationComponent } from '../register-steps/email-verification/email-verification.component';
import { RegisterComponent } from '../register/register.component';
import { BusinessRegisterComponent } from '../business-register/business-register.component';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [
  { path: 'account-type', component: AccountTypeComponent },
  { path: 'personal-info', component: PersonalInfoFormComponent },
  { path: 'email-verification', component: EmailVerificationComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'business-register', component: BusinessRegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'account-type', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
