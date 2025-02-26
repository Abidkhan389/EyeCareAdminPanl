import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourPerformanceComponent } from './your-performance.component';

describe('YourPerformanceComponent', () => {
  let component: YourPerformanceComponent;
  let fixture: ComponentFixture<YourPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourPerformanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
