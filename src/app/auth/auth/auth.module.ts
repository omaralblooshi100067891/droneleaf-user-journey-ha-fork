import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AccountTypeComponent } from '../account-type.component/account-type.component.component';
import { IonicModule } from '@ionic/angular';
import { PersonalInfoFormComponent } from '../personal-info-form/personal-info-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AccountTypeComponent,
    PersonalInfoFormComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthModule { }
