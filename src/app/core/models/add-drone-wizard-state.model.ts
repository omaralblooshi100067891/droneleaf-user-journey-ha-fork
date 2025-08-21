import { Step } from './add-drone-stepper.model';

export type WizardFlow =
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

export type StepType =
  | 'initial'
  | 'environment'
  | 'indoors_setup'
  | 'outdoors_setup'
  | 'template_selection'
  | 'select_drone'
  | 'custom_drone'
  | 'drone_method'
  | 'tier_one'
  | 'template_type'
  | 'create_template'
  | 'template_form'
  | 'motor_test';

export interface StepNode {
  type: StepType;
  flow: WizardFlow;
  parent?: StepType; // For back navigation
  data?: any; // Step-specific data
}

export interface AddDroneWizardState {
  currentStep: StepType;
  stepHistory: StepType[]; // For back navigation
  selectedFlow: WizardFlow;
  steps: Step[];
  stepData: { [stepType: string]: any };
}
