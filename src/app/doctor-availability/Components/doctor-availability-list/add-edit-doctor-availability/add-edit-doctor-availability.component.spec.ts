import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDoctorAvailabilityComponent } from './add-edit-doctor-availability.component';

describe('AddEditDoctorAvailabilityComponent', () => {
  let component: AddEditDoctorAvailabilityComponent;
  let fixture: ComponentFixture<AddEditDoctorAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditDoctorAvailabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDoctorAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
