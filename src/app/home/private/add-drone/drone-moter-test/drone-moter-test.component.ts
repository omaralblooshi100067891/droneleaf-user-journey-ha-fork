import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-drone-moter-test',
  templateUrl: './drone-moter-test.component.html',
  styleUrls: ['./drone-moter-test.component.scss'],
})
export class DroneMoterTestComponent  implements OnInit {
    @Output() cancel = new EventEmitter<void>();
    @Output() next = new EventEmitter<void>();
      cancelModalVisible = false;
    @Output() back = new EventEmitter<void>();
    step: number = 1;
  propellersRemoved: boolean | null = null;
  motorTestResult: 'yes' | 'no' | 'some' | null = null;
    @Input() steps!: Step[];
    @Input() currentStepIndex!: number;

  constructor() { }

continue() {
  if (this.step === 3 && this.motorTestResult === 'yes') {
    this.next.emit();
  }
}

onSelectMotorResult(result: 'yes' | 'no' | 'some') {
  this.motorTestResult = result;

  if (result === 'yes' || result === 'some') {
    this.step = 3; // ✅ show Step 3 immediately
  } else {
    this.step = 2; // stay on Step 2 if 'no'
  }
}


handleMotorButtonClick() {
  if (this.step === 1 && this.propellersRemoved) {
    this.step = 2;        // move to Step 2
    this.motorTestResult = null; // reset motor test result
  } else if (this.step === 2 && this.motorTestResult === 'no') {
    this.motorTestResult = null; // retry
    this.step = 2;
  }
}








isMotorBtnDisabled(): boolean {
  return (this.step === 1 && this.propellersRemoved !== true) ||
         (this.step === 2 && this.motorTestResult !== 'no');
}

motorBtnLabel(): string {
  return (this.step === 2 && this.motorTestResult === 'no')
    ? 'Retry Motor Test'
    : 'Start Motor Test';
}

motorBtnClasses(): string {
  if (this.isMotorBtnDisabled()) {
    return 'bg-gray-200 text-gray-500 cursor-not-allowed';
  }
  if (this.step === 1 && this.propellersRemoved) {
    return 'bg-[#009169] hover:bg-[#007a58] text-white';
  }
  if (this.step === 2 && this.motorTestResult === 'no') {
    return 'bg-[#009169] hover:bg-[#007a58] text-white';
  }
  return 'bg-gray-200 text-gray-500'; // fallback
}


    // Step 1: Propellers check
  handlePropellersSelection(value: boolean) {
    this.propellersRemoved = value;
  }

    // Step 2: Start Motor Test
  startMotorTest() {
    if (this.step === 1 && this.propellersRemoved) {
      this.step = 2;
    } else if (this.step === 2 && this.motorTestResult) {
      this.step = 3;
    }
  }

  ngOnInit() {}

    retryMotorTest() {
    this.step = 2;
    this.motorTestResult = null;
  }

    onCancelClick() {
    this.cancelModalVisible = true;
  }


  cancelConfirmed() {
    this.cancelModalVisible = false;
    this.cancel.emit();
  }

  cancelDismissed() {
    this.cancelModalVisible = false;
  }

}
