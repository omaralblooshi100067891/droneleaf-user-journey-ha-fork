import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-select-drone-step',
  templateUrl: './select-drone-step.component.html',
  styleUrls: ['./select-drone-step.component.scss'],
})
export class SelectDroneStepComponent  {

 @Input() steps!: Step[];
  @Input() currentStepIndex!: number;

  @Output() next = new EventEmitter<string>();
  @Output() back = new EventEmitter<void>();

  selectedDroneOption: string | null = null;

  selectOption(option: string) {
    this.selectedDroneOption = option;
  }

continue() {
  if (this.selectedDroneOption) {
    this.next.emit(this.selectedDroneOption); // send selected value to parent
  }
}


  cancel(){}

  goBack() {
    this.back.emit();
  }

}
