import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusRouteViewComponent } from './bus-route-view.component';

describe('BusRouteViewComponent', () => {
  let component: BusRouteViewComponent;
  let fixture: ComponentFixture<BusRouteViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusRouteViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusRouteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
