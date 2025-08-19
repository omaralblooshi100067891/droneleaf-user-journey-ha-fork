// src/app/core/services/add-drone-wizard-state.service.ts
import { Injectable } from '@angular/core';
import { AddDroneWizardState } from '../models/add-drone-wizard-state.model';

const STORAGE_KEY = 'addDroneWizardState';

@Injectable({ providedIn: 'root' })
export class AddDroneWizardStateService {
  save(state: AddDroneWizardState): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  load(): AddDroneWizardState | null {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) as AddDroneWizardState : null;
  }

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
