import { TestBed } from '@angular/core/testing';

import { MedicinetypeService } from './medicinetype.service';

describe('MedicinetypeService', () => {
  let service: MedicinetypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicinetypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
