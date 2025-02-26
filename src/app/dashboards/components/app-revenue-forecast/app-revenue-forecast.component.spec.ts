import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRevenueForecastComponent } from './app-revenue-forecast.component';

describe('AppRevenueForecastComponent', () => {
  let component: AppRevenueForecastComponent;
  let fixture: ComponentFixture<AppRevenueForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRevenueForecastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppRevenueForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
