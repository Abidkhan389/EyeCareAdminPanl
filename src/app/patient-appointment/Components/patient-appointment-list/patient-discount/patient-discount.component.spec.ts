import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDiscountComponent } from './patient-discount.component';

describe('PatientDiscountComponent', () => {
  let component: PatientDiscountComponent;
  let fixture: ComponentFixture<PatientDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientDiscountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
