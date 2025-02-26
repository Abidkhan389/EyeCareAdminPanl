import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusRouteFormComponent } from './bus-route-form.component';

describe('BusRouteFormComponent', () => {
  let component: BusRouteFormComponent;
  let fixture: ComponentFixture<BusRouteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusRouteFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusRouteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
