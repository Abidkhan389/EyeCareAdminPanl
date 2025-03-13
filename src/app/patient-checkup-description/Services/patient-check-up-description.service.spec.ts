import { TestBed } from '@angular/core/testing';

import { PatientCheckUpDescriptionService } from './patient-check-up-description.service';

describe('PatientCheckUpDescriptionService', () => {
  let service: PatientCheckUpDescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientCheckUpDescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
