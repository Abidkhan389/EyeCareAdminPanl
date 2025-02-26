import { TestBed } from '@angular/core/testing';

import { AppDateService } from './app-date.service';

describe('AppDateService', () => {
  let service: AppDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
