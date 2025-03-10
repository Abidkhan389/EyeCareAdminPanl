import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineDoctorManagementComponent } from './medicine-doctor-management.component';

describe('MedicineDoctorManagementComponent', () => {
  let component: MedicineDoctorManagementComponent;
  let fixture: ComponentFixture<MedicineDoctorManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicineDoctorManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineDoctorManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
