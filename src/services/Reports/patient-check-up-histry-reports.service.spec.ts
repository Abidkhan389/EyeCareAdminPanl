import { TestBed } from '@angular/core/testing';

import { PatientCheckUpHistryReportsService } from './patient-check-up-histry-reports.service';

describe('PatientCheckUpHistryReportsService', () => {
  let service: PatientCheckUpHistryReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientCheckUpHistryReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
