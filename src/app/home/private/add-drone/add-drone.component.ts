import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

type FlowType =
  | 'yes'
  | 'no'
  | 'indoors_yes'
  | 'outdoors_yes'
  | 'indoors_no'
  | 'outdoors_no'
  | 'new_template'
  | 'existing_template'
  | 'custom'
  | 'organization'
  | 'marketplaceTemplate'
  | 'droneMarketplace'
  | 'tier1'
  | 'tier2'
  | 'already'
  | null;

@Component({
  selector: 'app-add-drone',
  templateUrl: './add-drone.component.html',
  styleUrls: ['./add-drone.component.scss'],
})
export class AddDroneComponent implements OnInit {
  currentStepIndex = 0;
  selectedDroneOption: string | null = null;
  selectedFlow: FlowType = null;

  @Output() close = new EventEmitter<void>();

  // Default empty — will be set dynamically after Step One
  steps: Step[] = [];

  // Define flows separately
  stepsForYes: Step[] = [
    { title: 'Environment', completed: false },
    { title: 'Flight Range', completed: false },
    { title: 'Camera Setup', completed: false },
    { title: 'Insurance', completed: false },
    { title: 'Confirmation', completed: false },
    { title: 'Confirmation', completed: false },
    { title: 'Confirmation', completed: false },
    { title: 'Confirmation', completed: false },
    { title: 'Confirmation', completed: false },
    { title: 'Confirmation', completed: false },
    { title: 'Confirmation', completed: false },
  ];

  stepsForCustom: Step[] = [
    { title: 'Custom Drone', completed: false },
    { title: 'Choose Method', completed: false },
    { title: 'Tier One', completed: false },
    { title: 'Template Choice', completed: false },
    { title: 'New Template', completed: false },
    { title: 'Template Form', completed: false },
    { title: 'Motor Test', completed: false },
  ];

  stepsForNo: Step[] = [
    { title: 'Select Drone Type', completed: false },
    { title: 'Drone Marketplace', completed: false },
    { title: 'Purchase Plan', completed: false },
    { title: 'Setup & Training', completed: false },
    { title: 'Confirmation', completed: false },
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  goToStep(stepIndex: number, option?: any) {
    console.log('goToStep CALLED → stepIndex:', stepIndex, 'option:', option);
    // Step One flow init
    if (option === 'yes' || option === 'no') {
      this.selectedFlow = option;
      this.steps =
        option === 'yes' ? [...this.stepsForYes] : [...this.stepsForNo];
      this.currentStepIndex = 0;
      return;
    }

    // Step Two branching
    if (option === 'indoors') {
      this.selectedFlow =
        this.selectedFlow === 'yes' ? 'indoors_yes' : 'indoors_no';
      this.currentStepIndex = 1; // Indoor flow start
      return;
    }

    if (option === 'outdoors') {
      this.selectedFlow =
        this.selectedFlow === 'yes' ? 'outdoors_yes' : 'outdoors_no';
      this.currentStepIndex = 100; // Outdoor flow start
      return;
    }

    // Step 3 branching
    if (option === 'new_template') {
      this.selectedFlow = 'new_template';
      this.currentStepIndex = 2; // ya jo bhi step index rakhna hai
      return;
    }

    // if (option === 'existing_template') {
    //   this.selectedFlow = 'existing_template';
    //   this.currentStepIndex = 8;
    //   return;
    // }

    // Select Drone Step (4 options)
    if (option === 'custom') {
      this.selectedFlow = 'custom';
      this.currentStepIndex = 4;
      return;
    }

    // if (option === 'organization') {
    //   this.selectedFlow = 'organization';
    //   this.currentStepIndex = 20;
    //   return;
    // }
    // if (option === 'marketplaceTemplate') {
    //   this.selectedFlow = 'marketplaceTemplate';
    //   this.currentStepIndex = 21;
    //   return;
    // }
    // if (option === 'droneMarketplace') {
    //   this.selectedFlow = 'droneMarketplace';
    //   this.currentStepIndex = 22;
    //   return;
    // }

    if (option === 'tier1' || option === 'tier2' || option === 'already') {
      this.selectedFlow = option;
      this.currentStepIndex = 6;
      return;
    }

    // Step Seven branching
    if (option === 'existing' || option === 'new') {
      this.currentStepIndex = 8;
      return;
    }

    // Normal step progression
    if (this.steps.length > 0 && stepIndex > this.currentStepIndex) {
      this.steps[this.currentStepIndex].completed = true;
    }

    this.currentStepIndex = stepIndex;
  }

  handleStepCancel() {
    this.cancelModalVisible = true;
  }

  cancelConfirmed() {
    this.cancelModalVisible = false;
    this.close.emit();
  }

  cancelDismissed() {
    this.cancelModalVisible = false;
  }

  closeWizard(): void {
    this.router.navigate(['/dashboard']);
  }

  cancelModalVisible = false;
}
