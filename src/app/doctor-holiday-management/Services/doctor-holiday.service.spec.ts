import { TestBed } from '@angular/core/testing';

import { DoctorHolidayService } from './doctor-holiday.service';

describe('DoctorHolidayService', () => {
  let service: DoctorHolidayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorHolidayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
