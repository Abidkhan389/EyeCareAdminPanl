import { TestBed } from '@angular/core/testing';

import { AppResourceServiceService } from './app-resource-service.service';

describe('AppResourceServiceService', () => {
  let service: AppResourceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppResourceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
