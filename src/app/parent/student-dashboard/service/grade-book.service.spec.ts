import { TestBed } from '@angular/core/testing';

import { GradeBookService } from './grade-book.service';

describe('GradeBookService', () => {
  let service: GradeBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradeBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
