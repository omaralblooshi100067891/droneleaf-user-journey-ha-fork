import { Injectable } from '@angular/core';
import { AddDroneWizardState } from '../models/add-drone-wizard-state.model';

@Injectable({ providedIn: 'root' })
export class AddDroneWizardStateService {
  private STORAGE_KEY = 'droneWizard';   // ✅ Single consistent key
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
        currentStepIndex: parsed.currentStepIndex ?? 0,
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
      currentStepIndex: 0,
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

  // ---- Per-step Form Data ----
  saveStepData(stepIndex: number, data: any): void {
    const current = this.load() ?? this.defaultState();
    const stepData = { ...(current.stepData ?? {}) };
    stepData[stepIndex] = data;
    this.partialUpdate({ stepData });
  }

  getStepData<T = any>(stepIndex: number): T | null {
    const state = this.load();
    return state?.stepData ? (state.stepData[stepIndex] as T) ?? null : null;
  }

  clearStepData(stepIndex: number): void {
    const state = this.load();
    if (!state?.stepData) return;
    const stepData = { ...state.stepData };
    delete stepData[stepIndex];
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
