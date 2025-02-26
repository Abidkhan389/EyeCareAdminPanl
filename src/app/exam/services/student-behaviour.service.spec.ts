import { TestBed } from '@angular/core/testing';

import { StudentBehaviourService } from './student-behaviour.service';

describe('StudentBehaviourService', () => {
  let service: StudentBehaviourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentBehaviourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
