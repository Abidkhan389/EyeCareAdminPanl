import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientReportsByDoctorComponent } from './patient-reports-by-doctor.component';

describe('PatientReportsByDoctorComponent', () => {
  let component: PatientReportsByDoctorComponent;
  let fixture: ComponentFixture<PatientReportsByDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientReportsByDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientReportsByDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
