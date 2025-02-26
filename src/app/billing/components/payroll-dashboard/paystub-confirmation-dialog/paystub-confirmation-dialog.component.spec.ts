import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaystubConfirmationDialogComponent } from './paystub-confirmation-dialog.component';

describe('PaystubConfirmationDialogComponent', () => {
  let component: PaystubConfirmationDialogComponent;
  let fixture: ComponentFixture<PaystubConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaystubConfirmationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaystubConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
