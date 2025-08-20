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

export interface AddDroneWizardState {
  currentStepIndex: number;
  selectedFlow: WizardFlow;
  steps: Step[];
  stepData: { [stepIndex: number]: any };
}
