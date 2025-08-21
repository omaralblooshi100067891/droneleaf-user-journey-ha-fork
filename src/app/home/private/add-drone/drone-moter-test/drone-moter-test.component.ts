import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from 'src/app/core/models/add-drone-stepper.model';
import { AddDroneWizardStateService } from 'src/app/core/services/add-drone-wizard-state.service';

@Component({
  selector: 'app-drone-moter-test',
  templateUrl: './drone-moter-test.component.html',
  styleUrls: ['./drone-moter-test.component.scss'],
})
export class DroneMoterTestComponent implements OnInit {
  @Output() cancel = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  @Input() steps!: Step[];
  @Input() currentStepIndex!: any;

  cancelModalVisible = false;

  step: number = 1;
  propellersRemoved: boolean | null = null;
  motorTestResult: 'yes' | 'no' | 'some' | null = null;

  constructor(private wizardStateService: AddDroneWizardStateService) {}

  ngOnInit() {
    // 🟢 Restore saved state if available
    const saved = this.wizardStateService.getStepData(this.currentStepIndex);
    if (saved) {
      this.step = saved.step ?? 1;
      this.propellersRemoved = saved.propellersRemoved ?? null;
      this.motorTestResult = saved.motorTestResult ?? null;
    }
  }

  // ✅ Save current state
  private saveState() {
    this.wizardStateService.saveStepData(this.currentStepIndex, {
      step: this.step,
      propellersRemoved: this.propellersRemoved,
      motorTestResult: this.motorTestResult,
    });
  }

  continue() {
    if (this.step === 3 && this.motorTestResult === 'yes') {
      this.saveState();
      this.next.emit();
    }
  }

  // Change this method in drone-moter-test.component.ts
  onSelectMotorResult(result: 'yes' | 'no' | 'some') {
    this.motorTestResult = result;
    this.step = 3; // Always move to step 3 to show results
    this.saveState();
  }

  // Update this method
  handleMotorButtonClick() {
    if (this.step === 1 && this.propellersRemoved) {
      this.step = 2;
      this.motorTestResult = null;
    } else if (this.step === 3 && this.motorTestResult === 'no') {
      // When on step 3 with "no" result and user clicks retry
      this.motorTestResult = null; // reset result
      this.step = 2; // go back to step 2
    }
    this.saveState();
  }

  isMotorBtnDisabled(): boolean {
    if (this.step === 1) {
      return this.propellersRemoved !== true;
    }
    if (this.step === 2) {
      return this.motorTestResult !== null; // Disable during selection
    }
    if (this.step === 3) {
      return this.motorTestResult !== 'no'; // Only enable for 'no' result
    }
    return true;
  }

  motorBtnLabel(): string {
    if (this.step === 3 && this.motorTestResult === 'no') {
      return 'Retry Motor Test';
    }
    return 'Start Motor Test';
  }

  motorBtnClasses(): string {
    if (this.isMotorBtnDisabled()) {
      return 'bg-gray-200 text-gray-500 cursor-not-allowed';
    }
    if (
      (this.step === 1 && this.propellersRemoved) ||
      (this.step === 3 && this.motorTestResult === 'no')
    ) {
      return 'bg-[#009169] hover:bg-[#007a58] text-white';
    }
    return 'bg-gray-200 text-gray-500';
  }

  handlePropellersSelection(value: boolean) {
    this.propellersRemoved = value;
    this.saveState();
  }

  retryMotorTest() {
    this.step = 2;
    this.motorTestResult = null;
    this.saveState();
  }

  onCancelClick() {
    this.cancelModalVisible = true;
  }

  cancelConfirmed() {
    this.cancelModalVisible = false;
    this.wizardStateService.clear(); // ✅ saara wizard state clear
    this.cancel.emit();
  }

  cancelDismissed() {
    this.cancelModalVisible = false;
  }
}
