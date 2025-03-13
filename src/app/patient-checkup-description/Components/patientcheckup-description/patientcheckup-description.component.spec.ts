import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientcheckupDescriptionComponent } from './patientcheckup-description.component';

describe('PatientcheckupDescriptionComponent', () => {
  let component: PatientcheckupDescriptionComponent;
  let fixture: ComponentFixture<PatientcheckupDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientcheckupDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientcheckupDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
