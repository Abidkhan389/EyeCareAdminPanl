import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPaymentFormComponent } from './student-payment-form.component';

describe('StudentPaymentFormComponent', () => {
  let component: StudentPaymentFormComponent;
  let fixture: ComponentFixture<StudentPaymentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentPaymentFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentPaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
