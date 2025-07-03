import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountTypeComponent } from '../account-type.component/account-type.component.component';
import { PersonalInfoFormComponent } from '../personal-info-form/personal-info-form.component';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'account-type', component: AccountTypeComponent },
      { path: 'personal-info', component: PersonalInfoFormComponent },
      { path: '', redirectTo: 'account-type', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'auth/account-type', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
