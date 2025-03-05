import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAvailabilityListComponent } from './doctor-availability-list.component';

describe('DoctorAvailabilityListComponent', () => {
  let component: DoctorAvailabilityListComponent;
  let fixture: ComponentFixture<DoctorAvailabilityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorAvailabilityListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorAvailabilityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
