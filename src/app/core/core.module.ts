
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import {TextInputComponent} from "./components/inputs/text-input/text-input.component";
import { SelectInputComponent } from './components/select-input/select-input.component';
import { PhoneInputComponent } from './components/phone-input/phone-input.component';




@NgModule({
  declarations: [InputComponent,ButtonComponent,TextInputComponent,SelectInputComponent,PhoneInputComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    TextInputComponent,
    SelectInputComponent,
    PhoneInputComponent

  ],
})
export class CoreModule { }
