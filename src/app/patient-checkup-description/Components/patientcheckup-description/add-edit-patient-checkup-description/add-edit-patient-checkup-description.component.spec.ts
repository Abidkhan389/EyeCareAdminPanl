import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPatientCheckupDescriptionComponent } from './add-edit-patient-checkup-description.component';

describe('AddEditPatientCheckupDescriptionComponent', () => {
  let component: AddEditPatientCheckupDescriptionComponent;
  let fixture: ComponentFixture<AddEditPatientCheckupDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditPatientCheckupDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPatientCheckupDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
