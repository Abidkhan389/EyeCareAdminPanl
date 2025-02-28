import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMedicineTypeComponent } from './view-medicine-type.component';

describe('ViewMedicineTypeComponent', () => {
  let component: ViewMedicineTypeComponent;
  let fixture: ComponentFixture<ViewMedicineTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMedicineTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMedicineTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
