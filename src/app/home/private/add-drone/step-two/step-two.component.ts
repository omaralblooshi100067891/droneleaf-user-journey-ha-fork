import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() currentStepIndex!: any;
  @Input() initialValue: any;
  @Output() next = new EventEmitter<EnvironmentOption>();
  @Output() back = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() valueChange = new EventEmitter<any>();

  selectedOption: EnvironmentOption | null = null;

  constructor(private wizardStateService: AddDroneWizardStateService) {}

  ngOnInit() {
    // Load saved data if available
    const saved = this.wizardStateService.getStepData(this.currentStepIndex);

    if (saved?.selectedOption) {
      this.selectedOption = saved.selectedOption as EnvironmentOption;
    } else if (this.initialValue?.selectedOption) {
      this.selectedOption = this.initialValue.selectedOption;
    }
  }

  selectOption(option: EnvironmentOption) {
    this.selectedOption = option;

    // Save and emit changes
    const data = { selectedOption: this.selectedOption };
    this.wizardStateService.saveStepData(this.currentStepIndex, data);
    this.valueChange.emit(data);
  }

  continue() {
    if (this.selectedOption) {
      this.next.emit(this.selectedOption);
    }
  }

  goBack() {
    this.back.emit();
  }

  onCancelClick() {
    this.cancel.emit();
  }

  // Fix the missing template properties
  get shouldShowAlert(): boolean {
    return this.isIndoorSelected || this.isOutdoorSelected;
  }

  get isIndoorSelected(): boolean {
    return this.selectedOption === 'indoors';
  }

  get isOutdoorSelected(): boolean {
    return this.selectedOption === 'outdoors';
  }

  cancelConfirmed() {
    this.cancelModalVisible = false;
    this.cancel.emit();
  }

  cancelDismissed() {
    this.cancelModalVisible = false;
  }
}
