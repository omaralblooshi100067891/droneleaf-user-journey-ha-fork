import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent   {
   @Input() step: number = 1;
  @Input() totalSteps: number = 4;

  get steps(): number[] {
    return Array(this.totalSteps).fill(0);
  }

  get currentStep(): number {
    return this.step;
  }

}
