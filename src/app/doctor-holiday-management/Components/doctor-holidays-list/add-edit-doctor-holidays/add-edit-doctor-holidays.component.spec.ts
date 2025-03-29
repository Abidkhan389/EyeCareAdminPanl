import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDoctorHolidaysComponent } from './add-edit-doctor-holidays.component';

describe('AddEditDoctorHolidaysComponent', () => {
  let component: AddEditDoctorHolidaysComponent;
  let fixture: ComponentFixture<AddEditDoctorHolidaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditDoctorHolidaysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDoctorHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
