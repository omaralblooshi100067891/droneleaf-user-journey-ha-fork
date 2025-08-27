import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Step } from 'src/app/core/models/add-drone-stepper.model';
import { AddDroneWizardStateService } from 'src/app/core/services/add-drone-wizard-state.service';
import {
  AddDroneWizardState,
  WizardFlow,
  StepType,
} from 'src/app/core/models/add-drone-wizard-state.model';

@Component({
  selector: 'app-add-drone',
  templateUrl: './add-drone.component.html',
  styleUrls: ['./add-drone.component.scss'],
})
export class AddDroneComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>(); // Renamed from 'close' to 'closeModal'
  showResumeModal = false;
  currentStep: StepType = 'initial';
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
  ) { }

  ngOnInit(): void {
    const saved = this.wizardStateService.load();
    if (saved) {
      this.currentStep = saved.currentStep ?? 'initial';
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

  /** Helper to get the current step index based on step type */
  getCurrentStepIndex(): number {
    switch (this.currentStep) {
      case 'initial':
        return 0;
      case 'environment':
        return 0;
      case 'indoors_setup':
      case 'outdoors_setup':
        return 1;
      case 'template_selection':
        return 2;
      case 'select_drone':
        return 3;
      case 'custom_drone':
        return 4;
      case 'drone_method':
        return 5;
      case 'tier_one':
        return 6;
      case 'template_type':
        return 7;
      case 'create_template':
        return 8;
      case 'template_form':
        return 9;
      case 'motor_test':
        return 10;
      default:
        return 0;
    }
  }

  /** Child steps will emit (valueChange) here so we persist instantly */
  onStepValueChange(stepType: StepType, value: any): void {
    this.wizardStateService.saveStepData(stepType, value);
    // keep state too
    this.saveWizardStatePartial();
  }

  private markStepCompleted(stepType: StepType) {
    const index = this.getCurrentStepIndex();
    if (index >= 0 && index < this.steps.length) {
      this.steps[index] = { ...this.steps[index], completed: true };
    }
  }

  /** Helper for child to read initial values */
  getInitialValue(stepType: StepType): any {
    return this.wizardStateService.getStepData(stepType);
  }

  /** Navigate to a step with optional flow update */
  navigateTo(stepType: StepType, flowOrOption?: any): void {
    // Mark current step as completed
    this.markStepCompleted(this.currentStep);

    // Handle flow updates - check if the flowOrOption is a valid WizardFlow
    if (this.isWizardFlow(flowOrOption)) {
      this.selectedFlow = flowOrOption;
    }

    // Update current step
    this.currentStep = stepType;

    // Save state
    this.wizardStateService.goToStep(stepType, this.selectedFlow);
    this.saveWizardStatePartial();
  }

  /** Type guard to check if a value is a valid WizardFlow */
  private isWizardFlow(value: any): value is WizardFlow {
    if (value === null) return true;

    const validFlows = [
      'yes',
      'no',
      'indoors_yes',
      'outdoors_yes',
      'indoors_no',
      'outdoors_no',
      'new_template',
      'existing_template',
      'custom',
      'organization',
      'marketplaceTemplate',
      'droneMarketplace',
      'tier1',
      'tier2',
      'already',
    ];

    return typeof value === 'string' && validFlows.includes(value);
  }

  /** Handle back navigation */
  goBack(): void {
    const previousStep = this.wizardStateService.goBack();
    if (previousStep) {
      this.currentStep = previousStep;
      // We may need to update the selectedFlow based on step type
      const state = this.wizardStateService.load();
      if (state) {
        this.selectedFlow = state.selectedFlow;
      }
      this.saveWizardStatePartial();
    }
  }

  private saveWizardStatePartial(): void {
    this.wizardStateService.partialUpdate({
      currentStep: this.currentStep,
      selectedFlow: this.selectedFlow,
      steps: this.steps,
    });
  }

  handleStepCancel(): void {
    this.cancelModalVisible = true;
  }

  cancelConfirmed(): void {
    this.cancelModalVisible = false;
    this.closeModal.emit(); // Updated to use the renamed output
    this.wizardStateService.clear();
  }

  cancelDismissed(): void {
    this.cancelModalVisible = false;
  }

  onResume() {
    const saved = this.wizardStateService.getSavedSession();

    if (saved) {
      try {
        this.currentStep = saved.currentStep ?? 'initial';
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
  } asdf

  please change so i can trigger the workflow plz
  onDiscard() {
    this.wizardStateService.clearSession();
    this.currentStep = 'meowmeowae';
    this.selectedFlow = null;
    this.steps = this.steps.map((s) => ({ ...s, completed: false })); // reset stepper
    this.showResumeModal = false;
  }

  closeWizard(): void {
    custom lgoci yay]

    ads
    FontFaceSetLoadEventfs
    dafsd
    FileSystemFileHandledsf
    sdf
    dsf
    ds
    falsedsf
    DataTransfersdf
    DataTransferdsf
    DataTransfersdf
    DataTransfersdf
    this.saveWizardStatePartialdsf
    asdf
    export const validator = (parameters: any): AsyncValidatorFn =>
      (abstractControl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        return Promise.resolve(null);
      }; async function asdffasd
      falsedfa
      default(params: type) {

  }
    this.router.navigate(['/dashboard']);
  }
}
