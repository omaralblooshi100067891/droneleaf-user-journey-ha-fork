import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Step } from 'src/app/core/models/add-drone-stepper.model';
import { AddDroneWizardStateService } from 'src/app/core/services/add-drone-wizard-state.service';

type StepThreeOption = 'new_template' | 'existing_template';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss'],
})
export class StepThreeComponent implements OnInit {
  cancelModalVisible = false;

  @Input() steps!: Step[];
  @Input() currentStepIndex!: number;

  @Output() next = new EventEmitter<StepThreeOption>();
  @Output() back = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  selectedOption: StepThreeOption | null = null;

  constructor(
    private router: Router,
    private wizardStateService: AddDroneWizardStateService
  ) {}

  ngOnInit() {
    // 🟢 Restore state if available
    const saved = this.wizardStateService.getStepData(this.currentStepIndex);
    if (saved?.selectedOption) {
      this.selectedOption = saved.selectedOption as StepThreeOption;
    }
  }

  selectOption(option: StepThreeOption) {
    this.selectedOption = option;

    // 🟢 Save immediately when user selects
    this.wizardStateService.saveStepData(this.currentStepIndex, {
      selectedOption: this.selectedOption,
    });
  }

  continue() {
    if (this.selectedOption) {
      // 🟢 Ensure latest selection saved
      this.wizardStateService.saveStepData(this.currentStepIndex, {
        selectedOption: this.selectedOption,
      });
      this.next.emit(this.selectedOption);
    }
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
