import { TestBed } from '@angular/core/testing';

import { FinancialOperationsService } from './financial-operations.service';

describe('FinancialOperationsService', () => {
  let service: FinancialOperationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialOperationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
