import { TestBed } from '@angular/core/testing';

import { AddDroneWizardStateService } from './add-drone-wizard-state.service';

describe('AddDroneWizardStateService', () => {
  let service: AddDroneWizardStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddDroneWizardStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
