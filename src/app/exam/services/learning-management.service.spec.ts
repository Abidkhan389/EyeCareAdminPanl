import { TestBed } from '@angular/core/testing';

import { LearningManagementService } from './learning-management.service';

describe('LearningManagementService', () => {
  let service: LearningManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
