import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss'],
})
export class StepThreeComponent  implements OnInit {

 @Input() steps!: Step[];
  @Input() currentStepIndex!: number;
  @Output() next = new EventEmitter<'yes' | 'no'>();

  @Output() back = new EventEmitter<void>(); // if needed

  selectedOption: 'yes' | 'no' | null = null;

  selectOption(option: 'yes' | 'no') {
    this.selectedOption = option;
  }

  continue() {
    if (this.selectedOption) {
      this.next.emit(this.selectedOption);
    }
  }

  cancel() {
    // Navigate to home or show modal confirmation
  }

  constructor() {}

  ngOnInit() {}

}
