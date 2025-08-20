import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Step } from 'src/app/core/models/add-drone-stepper.model';
import { AddDroneWizardStateService } from 'src/app/core/services/add-drone-wizard-state.service';

type EnvironmentOption = 'indoors' | 'outdoors';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss'],
})
export class StepTwoComponent implements OnInit {
  cancelModalVisible = false;

  @Input() steps!: Step[];
  @Input() currentStepIndex!: number;
  @Input() droneOption: 'yes' | 'no' | null = null;
@Input() initialValue: any;
  @Output() next = new EventEmitter<EnvironmentOption>();
  @Output() back = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  selectedOption: EnvironmentOption | null = null;

  constructor(
    private router: Router,
    private wizardStateService: AddDroneWizardStateService
  ) {}

ngOnInit() {
  // Agar wizard state se already restore kar rahe ho,
  // to initialValue ko fallback ke liye use kar sakte ho
  const saved = this.wizardStateService.getStepData(this.currentStepIndex);

  if (saved?.selectedOption) {
    this.selectedOption = saved.selectedOption as EnvironmentOption;
  } else if (this.initialValue?.selectedOption) {
    this.selectedOption = this.initialValue.selectedOption;
  }
}


  selectOption(option: EnvironmentOption) {
    this.selectedOption = option;

    // 🟢 Save immediately when user selects
    this.wizardStateService.saveStepData(this.currentStepIndex, {
      selectedOption: this.selectedOption,
    });
  }

  continue() {
    if (!this.selectedOption) return;

    // 🟢 Ensure latest selection saved
    this.wizardStateService.saveStepData(this.currentStepIndex, {
      selectedOption: this.selectedOption,
    });

    this.next.emit(this.selectedOption); // indoors/outdoors
  }

  // -------- UI Logic --------
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

  // -------- Cancel Flow --------
  showCancelModal() {
    this.cancelModalVisible = true;
  }

  cancelConfirmed() {
    this.cancelModalVisible = false;
    this.router.navigate(['/dashboard']);
  }

  cancelDismissed() {
    this.cancelModalVisible = false;
  }

  onCancelClick() {
    this.cancel.emit();
  }
}
