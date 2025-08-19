import { Step } from './add-drone-stepper.model';

export interface AddDroneWizardState {
  /** Current step index in wizard */
  currentStepIndex: number;

  /** Which flow user selected */
  selectedFlow:
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

  /** Stepper steps state */
  steps: Step[];

  /** Currently selected droneId (if any) */
  selectedDroneId?: string;
}
