import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayInsComponent } from './pay-ins.component';

describe('PayInsComponent', () => {
  let component: PayInsComponent;
  let fixture: ComponentFixture<PayInsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayInsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayInsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
