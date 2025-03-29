import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorHolidaysListComponent } from './doctor-holidays-list.component';

describe('DoctorHolidaysListComponent', () => {
  let component: DoctorHolidaysListComponent;
  let fixture: ComponentFixture<DoctorHolidaysListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorHolidaysListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorHolidaysListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
