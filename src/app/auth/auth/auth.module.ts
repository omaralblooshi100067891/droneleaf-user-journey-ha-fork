import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AccountTypeComponent } from '../account-type.component/account-type.component.component';
import { IonicModule } from '@ionic/angular';
import { PersonalInfoFormComponent } from '../register-steps/personal-info-form/personal-info-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { StepperComponent } from '../component/stepper/stepper.component';
import { EmailVerificationComponent } from '../register-steps/email-verification/email-verification.component';
import { RegisterComponent } from '../register/register.component';
import { CustomDroneDetailsComponent } from '../register-steps/custom-drone-details/custom-drone-details.component';

@NgModule({
  declarations: [
    AccountTypeComponent,
    PersonalInfoFormComponent,
    StepperComponent,
    EmailVerificationComponent,
    RegisterComponent,
    CustomDroneDetailsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    AuthRoutingModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
