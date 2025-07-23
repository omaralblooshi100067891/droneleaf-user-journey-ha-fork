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
import { BusinessRegisterComponent } from '../business-register/business-register.component';
import { BusinessInfoComponent } from '../business-register-steps/business-info/business-info.component';
import { CustomDroneDetailComponent } from '../business-register-steps/custom-drone-detail/custom-drone-detail.component';
import { CompanyDetailComponent } from '../business-register-steps/company-detail/company-detail.component';
import { LoginComponent } from '../login/login.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AccountTypeComponent,
    PersonalInfoFormComponent,
    StepperComponent,
    EmailVerificationComponent,
    RegisterComponent,
    CustomDroneDetailsComponent,
    BusinessRegisterComponent,
    BusinessInfoComponent,
    CustomDroneDetailComponent,
    CompanyDetailComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    AuthRoutingModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class AuthModule { }
