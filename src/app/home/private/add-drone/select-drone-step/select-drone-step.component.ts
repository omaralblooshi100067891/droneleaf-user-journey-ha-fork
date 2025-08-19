import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

type DroneOption = 'custom' | 'organization' | 'marketplaceTemplate' | 'droneMarketplace';

@Component({
  selector: 'app-select-drone-step',
  templateUrl: './select-drone-step.component.html',
  styleUrls: ['./select-drone-step.component.scss'],
})
export class SelectDroneStepComponent {
  cancelModalVisible = false;

  @Input() steps!: Step[];
  @Input() currentStepIndex!: number;

  @Output() next = new EventEmitter<DroneOption>();
  @Output() back = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  selectedDroneOption: DroneOption | null = null;

  constructor(private router: Router) {}

  selectOption(option: DroneOption) {
    this.selectedDroneOption = option;
  }

continue() {
  if (this.selectedDroneOption) {
    console.log('✅ Emitting option:', this.selectedDroneOption); // Debug
    this.next.emit(this.selectedDroneOption); // send selected value to parent
  } else {
    console.warn('⚠️ No option selected!');
  }
}


  showCancelModal() {
    this.cancelModalVisible = true;
  }

  cancelConfirmed() {
    this.cancelModalVisible = false;
    console.log('Cancelled');
    this.router.navigate(['/dashboard']);
  }

  cancelDismissed() {
    this.cancelModalVisible = false;
  }

  goBack() {
    this.back.emit();
  }

  onCancelClick() {
    this.cancel.emit();
  }
}
