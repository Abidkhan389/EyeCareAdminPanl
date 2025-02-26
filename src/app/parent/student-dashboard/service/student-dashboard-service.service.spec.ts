import { TestBed } from '@angular/core/testing';

import { StudentDashboardServiceService } from './student-dashboard-service.service';

describe('StudentDashboardServiceService', () => {
  let service: StudentDashboardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentDashboardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
