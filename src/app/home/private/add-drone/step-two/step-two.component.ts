import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

type EnvironmentOption = 'indoors' | 'outdoors';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss'],
})
export class StepTwoComponent {
  @Input() steps!: Step[];
  @Input() currentStepIndex!: number;

  @Output() next = new EventEmitter<EnvironmentOption>();
  @Output() back = new EventEmitter<void>();

  selectedOption: EnvironmentOption | null = null;

  selectOption(option: EnvironmentOption) {
    this.selectedOption = option;
  }

  continue() {
    if (this.selectedOption) {
      this.next.emit(this.selectedOption);
    }
  }

  get isIndoorSelected() {
  return this.selectedOption === 'indoors';
}
get isOutdoorSelected() {
  return this.selectedOption === 'outdoors';
}


  cancel() {
    // Optionally add modal here
  }
}
