import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineTypeListComponent } from './medicine-type-list.component';

describe('MedicineTypeListComponent', () => {
  let component: MedicineTypeListComponent;
  let fixture: ComponentFixture<MedicineTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicineTypeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
