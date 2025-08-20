import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Step } from 'src/app/core/models/add-drone-stepper.model';
import { AddDroneWizardStateService } from 'src/app/core/services/add-drone-wizard-state.service';
import {
  AddDroneWizardState,
  WizardFlow,
} from 'src/app/core/models/add-drone-wizard-state.model';

@Component({
  selector: 'app-add-drone',
  templateUrl: './add-drone.component.html',
  styleUrls: ['./add-drone.component.scss'],
})
export class AddDroneComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  showResumeModal = false;
  currentStepIndex = 0;
  selectedFlow: WizardFlow = null;
  cancelModalVisible = false;

  steps: Step[] = [
    { title: 'Step One', completed: false },
    { title: 'Step Two', completed: false },
    { title: 'Step Three', completed: false },
    { title: 'Step Four', completed: false },
    { title: 'Step Five', completed: false },
    { title: 'Step Six', completed: false },
    { title: 'Step Seven', completed: false },
    { title: 'Step Eight', completed: false },
    { title: 'Step Nine', completed: false },
    { title: 'Step Eleven', completed: false },
    { title: 'Step Twelve', completed: false },
    { title: 'Step Thirteen', completed: false },
    { title: 'Step Fourteen', completed: false },
  ];

  constructor(
    private router: Router,
    private wizardStateService: AddDroneWizardStateService
  ) {}

  ngOnInit(): void {
    const saved = this.wizardStateService.load();
    if (saved) {
      this.currentStepIndex = saved.currentStepIndex ?? 0;
      this.selectedFlow = saved.selectedFlow ?? null;
      this.showResumeModal = true;
      // prefer saved steps if present (to keep completed flags)
      if (saved.steps?.length === this.steps.length) {
        this.steps = saved.steps;
      }
    } else {
      // prime fresh state
      this.saveWizardStatePartial();
    }
  }

  /** Child steps will emit (valueChange) here so we persist instantly */
  onStepValueChange(stepIndex: number, value: any): void {
    this.wizardStateService.saveStepData(stepIndex, value);
    // keep index in state too (optional)
    this.saveWizardStatePartial();
  }

  private markStepCompleted(index: number) {
    if (index >= 0 && index < this.steps.length) {
      this.steps[index] = { ...this.steps[index], completed: true };
    }
  }

  /** Helper for child to read initial values */
  getInitialValue(stepIndex: number): any {
    return this.wizardStateService.getStepData(stepIndex);
  }
  goToStep(stepIndex: number, option?: WizardFlow | any): void {
    // Flow decisions
    if (option === 'yes' || option === 'no') {
      this.markStepCompleted(this.currentStepIndex); // ✅ mark previous
      this.selectedFlow = option;
      this.currentStepIndex = 0;
      this.saveWizardStatePartial();
      return;
    }

    if (option === 'indoors') {
      this.markStepCompleted(this.currentStepIndex); // ✅ mark previous
      this.selectedFlow =
        this.selectedFlow === 'yes' ? 'indoors_yes' : 'indoors_no';
      this.currentStepIndex = 1;
      this.saveWizardStatePartial();
      return;
    }

    if (option === 'outdoors') {
      this.markStepCompleted(this.currentStepIndex); // ✅ mark previous
      this.selectedFlow =
        this.selectedFlow === 'yes' ? 'outdoors_yes' : 'outdoors_no';
      this.currentStepIndex = 1;
      this.saveWizardStatePartial();
      return;
    }

    if (option === 'new_template') {
      this.markStepCompleted(this.currentStepIndex); // ✅ mark previous
      this.selectedFlow = 'new_template';
      this.currentStepIndex = 2;
      this.saveWizardStatePartial();
      return;
    }

    if (option === 'custom') {
      this.markStepCompleted(this.currentStepIndex); // ✅ mark previous
      this.selectedFlow = 'custom';
      this.currentStepIndex = 4;
      this.saveWizardStatePartial();
      return;
    }

    if (option === 'tier1' || option === 'tier2' || option === 'already') {
      this.markStepCompleted(this.currentStepIndex); // ✅ mark previous
      this.selectedFlow = option as WizardFlow;
      this.currentStepIndex = 6;
      this.saveWizardStatePartial();
      return;
    }

    if (option === 'existing' || option === 'new') {
      this.markStepCompleted(this.currentStepIndex); // ✅ mark previous
      this.currentStepIndex = 8;
      this.saveWizardStatePartial();
      return;
    }

    // Normal progression
    if (this.steps.length > 0 && stepIndex > this.currentStepIndex) {
      this.markStepCompleted(this.currentStepIndex); // ✅ mark previous
    }

    // clamp target index
    const clamped = Math.max(0, Math.min(stepIndex, this.steps.length - 1));
    this.currentStepIndex = clamped;
    this.saveWizardStatePartial();
  }

  private saveWizardStatePartial(): void {
    this.wizardStateService.partialUpdate({
      currentStepIndex: this.currentStepIndex,
      selectedFlow: this.selectedFlow,
      steps: this.steps,
    });
  }

  handleStepCancel(): void {
    this.cancelModalVisible = true;
  }

  cancelConfirmed(): void {
    this.cancelModalVisible = false;
    this.close.emit();
    this.wizardStateService.clear();
  }

  cancelDismissed(): void {
    this.cancelModalVisible = false;
  }

  onResume() {
    const saved = this.wizardStateService.getSavedSession();

    if (saved) {
      try {
        this.currentStepIndex = saved.currentStepIndex ?? 0;
        this.selectedFlow = saved.selectedFlow ?? null;

        if (saved.steps?.length === this.steps.length) {
          this.steps = saved.steps;
        }
      } catch (err) {
        console.error('Resume restore failed', err);
        this.onDiscard();
        return;
      }
    } else {
      this.onDiscard();
      return;
    }

    this.showResumeModal = false;
  }

  onDiscard() {
    this.wizardStateService.clearSession();
    this.currentStepIndex = 0;
    this.selectedFlow = null;
    this.steps = this.steps.map((s) => ({ ...s, completed: false })); // reset stepper
    this.showResumeModal = false;
  }

  closeWizard(): void {
    this.router.navigate(['/dashboard']);
  }


}
