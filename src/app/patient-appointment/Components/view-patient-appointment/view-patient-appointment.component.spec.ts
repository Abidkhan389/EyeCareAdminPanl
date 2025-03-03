import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPatientAppointmentComponent } from './view-patient-appointment.component';

describe('ViewPatientAppointmentComponent', () => {
  let component: ViewPatientAppointmentComponent;
  let fixture: ComponentFixture<ViewPatientAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPatientAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPatientAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
