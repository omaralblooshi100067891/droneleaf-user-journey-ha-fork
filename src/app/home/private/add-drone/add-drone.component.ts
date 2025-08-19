import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Step } from 'src/app/core/models/add-drone-stepper.model';
import { AddDroneWizardStateService } from 'src/app/core/services/add-drone-wizard-state.service';
import { AddDroneWizardState } from 'src/app/core/models/add-drone-wizard-state.model';

@Component({
  selector: 'app-add-drone',
  templateUrl: './add-drone.component.html',
  styleUrls: ['./add-drone.component.scss'],
})
export class AddDroneComponent implements OnInit {
  currentStepIndex = 0;
  selectedFlow: any = null;

  cancelModalVisible = false;

  @Output() close = new EventEmitter<void>();

  constructor(
    private router: Router,
    private wizardStateService: AddDroneWizardStateService
  ) {}

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
  { title: 'Step Ten', completed: false },
];



  ngOnInit() {
    const savedState = this.wizardStateService.load();
    if (savedState) {
      this.currentStepIndex = savedState.currentStepIndex;
      this.selectedFlow = savedState.selectedFlow;
      this.steps = savedState.steps;
    }
  }

goToStep(stepIndex: number, option?: any) {
  console.log('goToStep CALLED → stepIndex:', stepIndex, 'option:', option);

  // Step One: Yes / No flow
  if (option === 'yes' || option === 'no') {
    this.selectedFlow = option;
    this.steps = option === 'yes' ? [...this.steps] : [...this.steps];
    this.currentStepIndex = 0;
    this.saveWizardState();
    return;
  }

  // Step Two: Indoors / Outdoors
  if (option === 'indoors') {
    this.selectedFlow = this.selectedFlow === 'yes' ? 'indoors_yes' : 'indoors_no';
    this.currentStepIndex = 1;
    this.saveWizardState();
    return;
  }

  if (option === 'outdoors') {
    this.selectedFlow = this.selectedFlow === 'yes' ? 'outdoors_yes' : 'outdoors_no';
    this.currentStepIndex = 100; // adjust according to your flow
    this.saveWizardState();
    return;
  }

  // Step Three: Template selection
  if (option === 'new_template') {
    this.selectedFlow = 'new_template';
    this.currentStepIndex = 2;
    this.saveWizardState();
    return;
  }

  // Drone selection step
  if (option === 'custom') {
    this.selectedFlow = 'custom';
    this.currentStepIndex = 4;
    this.saveWizardState();
    return;
  }

  if (option === 'tier1' || option === 'tier2' || option === 'already') {
    this.selectedFlow = option;
    this.currentStepIndex = 6;
    this.saveWizardState();
    return;
  }

  // Step Seven branching
  if (option === 'existing' || option === 'new') {
    this.currentStepIndex = 8;
    this.saveWizardState();
    return;
  }

  // Fallback: Normal step progression
  if (this.steps.length > 0 && stepIndex > this.currentStepIndex) {
    this.steps[this.currentStepIndex].completed = true;
  }

  this.currentStepIndex = stepIndex;
  this.saveWizardState();
}

// Helper function to save state in service
private saveWizardState() {
  this.wizardStateService.save({
    currentStepIndex: this.currentStepIndex,
    selectedFlow: this.selectedFlow,
    steps: this.steps,
  });
}




  handleStepCancel() {
    this.cancelModalVisible = true;
  }

  cancelConfirmed() {
    this.cancelModalVisible = false;
    this.close.emit();
    this.wizardStateService.clear();
  }

  cancelDismissed() {
    this.cancelModalVisible = false;
  }

  closeWizard(): void {
    this.router.navigate(['/dashboard']);
    this.wizardStateService.clear();
  }
}
