import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPatientAppointmentComponent } from './add-edit-patient-appointment.component';

describe('AddEditPatientAppointmentComponent', () => {
  let component: AddEditPatientAppointmentComponent;
  let fixture: ComponentFixture<AddEditPatientAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditPatientAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPatientAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
