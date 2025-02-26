import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayInsFormComponent } from './pay-ins-form.component';

describe('PayInsFormComponent', () => {
  let component: PayInsFormComponent;
  let fixture: ComponentFixture<PayInsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayInsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayInsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
