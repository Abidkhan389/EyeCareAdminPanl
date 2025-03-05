import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDoctorAvailabilityComponent } from './view-doctor-availability.component';

describe('ViewDoctorAvailabilityComponent', () => {
  let component: ViewDoctorAvailabilityComponent;
  let fixture: ComponentFixture<ViewDoctorAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDoctorAvailabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDoctorAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
