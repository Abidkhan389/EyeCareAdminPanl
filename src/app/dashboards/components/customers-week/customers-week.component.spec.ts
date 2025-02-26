import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersWeekComponent } from './customers-week.component';

describe('CustomersWeekComponent', () => {
  let component: CustomersWeekComponent;
  let fixture: ComponentFixture<CustomersWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersWeekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
