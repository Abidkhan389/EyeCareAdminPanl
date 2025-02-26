import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPaymentViewComponent } from './student-payment-view.component';

describe('StudentPaymentViewComponent', () => {
  let component: StudentPaymentViewComponent;
  let fixture: ComponentFixture<StudentPaymentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentPaymentViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentPaymentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
