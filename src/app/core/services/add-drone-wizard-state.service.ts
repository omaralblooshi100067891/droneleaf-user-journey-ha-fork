import { Injectable } from '@angular/core';
import {
  AddDroneWizardState,
  StepType,
  WizardFlow,
} from '../models/add-drone-wizard-state.model';

@Injectable({ providedIn: 'root' })
export class AddDroneWizardStateService {
  private STORAGE_KEY = 'droneWizard';
  private wizardActive = false;

  // ---- Core Save/Load ----
  private rawSave(state: AddDroneWizardState): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
  }

  load(): AddDroneWizardState | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) return null;
    try {
      const parsed = JSON.parse(data) as AddDroneWizardState;
      return {
        currentStep: parsed.currentStep ?? 'initial',
        stepHistory: parsed.stepHistory ?? [],
        selectedFlow: parsed.selectedFlow ?? null,
        steps: parsed.steps ?? [],
        stepData: parsed.stepData ?? {},
      };
    } catch {
      this.clear();
      return null;
    }
  }

  clear(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  private defaultState(): AddDroneWizardState {
    return {
      currentStep: 'initial',
      stepHistory: [],
      selectedFlow: null,
      steps: [],
      stepData: {},
    };
  }

  /** Merge & save partial updates without dropping stepData */
  partialUpdate(patch: Partial<AddDroneWizardState>): AddDroneWizardState {
    const current = this.load() ?? this.defaultState();
    const merged: AddDroneWizardState = {
      ...current,
      ...patch,
      stepData: { ...current.stepData, ...(patch.stepData ?? {}) },
    };
    this.rawSave(merged);
    return merged;
  }

  // ---- Step Navigation ----
  goToStep(stepType: StepType, flow?: WizardFlow): void {
    const current = this.load() ?? this.defaultState();

    // Save history for back navigation
    const stepHistory = [...current.stepHistory];
    if (current.currentStep) {
      stepHistory.push(current.currentStep);
    }

    this.partialUpdate({
      currentStep: stepType,
      stepHistory,
      selectedFlow: flow ?? current.selectedFlow,
    });
  }

  goBack(): StepType | null {
    const current = this.load() ?? this.defaultState();
    if (current.stepHistory.length === 0) {
      return null;
    }

    // Pop the last step from history
    const stepHistory = [...current.stepHistory];
    const previousStep = stepHistory.pop() || 'initial';

    this.partialUpdate({
      currentStep: previousStep,
      stepHistory,
    });

    return previousStep;
  }

  // ---- Per-step Form Data ----
  saveStepData(stepType: StepType, data: any): void {
    const current = this.load() ?? this.defaultState();
    const stepData = { ...(current.stepData ?? {}) };
    stepData[stepType] = data;
    this.partialUpdate({ stepData });
  }

  getStepData<T = any>(stepType: StepType): T | null {
    const state = this.load();
    return state?.stepData ? (state.stepData[stepType] as T) ?? null : null;
  }

  clearStepData(stepType: StepType): void {
    const state = this.load();
    if (!state?.stepData) return;
    const stepData = { ...state.stepData };
    delete stepData[stepType];
    this.partialUpdate({ stepData });
  }

  // ---- Wizard Active Flag (for beforeunload confirm) ----
  setWizardActive(active: boolean) {
    this.wizardActive = active;
  }

  isWizardActive(): boolean {
    return this.wizardActive;
  }

  // ---- Session Helpers ----
  getSavedSession(): AddDroneWizardState | null {
    return this.load();
  }

  clearSession(): void {
    this.clear();
  }
}
