import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayNamePopupComponent } from './day-name-popup.component';

describe('DayNamePopupComponent', () => {
  let component: DayNamePopupComponent;
  let fixture: ComponentFixture<DayNamePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayNamePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayNamePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
