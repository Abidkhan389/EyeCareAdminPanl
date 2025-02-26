import { TestBed } from '@angular/core/testing';

import { STudentBehaviourSharedDataService } from './student-behaviour-shared-data.service';

describe('STudentBehaviourSharedDataService', () => {
  let service: STudentBehaviourSharedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(STudentBehaviourSharedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
