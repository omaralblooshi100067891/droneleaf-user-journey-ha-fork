import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

type EnvironmentOption = 'indoors' | 'outdoors';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss'],
})
export class StepTwoComponent {
  cancelModalVisible = false;
  @Input() steps!: Step[];
  @Input() currentStepIndex!: number;
  @Input() droneOption: 'yes' | 'no' | null = null;

  @Output() next = new EventEmitter<EnvironmentOption>();

  @Output() back = new EventEmitter<void>();

  selectedOption: EnvironmentOption | null = null;

  constructor(private router: Router) {}

  selectOption(option: EnvironmentOption) {
    this.selectedOption = option;
  }

continue() {
  if (!this.selectedOption) return;
  this.next.emit(this.selectedOption); // 'indoors' ya 'outdoors'
}


  get shouldShowAlert(): boolean {
    if (this.isIndoorSelected) {
      return true;
    }

    if (this.isOutdoorSelected && this.droneOption === 'yes') {
      return true;
    }

    return false;
  }

  get isIndoorSelected() {
    return this.selectedOption === 'indoors';
  }
  get isOutdoorSelected() {
    return this.selectedOption === 'outdoors';
  }

  showCancelModal() {
    this.cancelModalVisible = true;
  }

  // Called when user confirms cancel
  cancelConfirmed() {
    this.cancelModalVisible = false;
    console.log('Cancelled');
    this.router.navigate(['/dashboard']); // Or whatever route
  }

  // Called when user closes the modal
  cancelDismissed() {
    this.cancelModalVisible = false;
  }

  @Output() cancel = new EventEmitter<void>();

  onCancelClick() {
    this.cancel.emit();
  }
}
