import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountTypeComponent } from '../account-type.component/account-type.component.component';
import { PersonalInfoFormComponent } from '../register-steps/personal-info-form/personal-info-form.component';
import { EmailVerificationComponent } from '../register-steps/email-verification/email-verification.component';
import { RegisterComponent } from '../register/register.component';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'account-type', component: AccountTypeComponent },
      { path: 'personal-info', component: PersonalInfoFormComponent },
      { path: 'email-verification', component: EmailVerificationComponent },
      {
        path: 'register',
        component: RegisterComponent,
      },

      { path: '', redirectTo: 'account-type', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'auth/account-type', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
