import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [InputComponent,ButtonComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  exports: [
    InputComponent,
    ButtonComponent
  ],
})
export class CoreModule { }
