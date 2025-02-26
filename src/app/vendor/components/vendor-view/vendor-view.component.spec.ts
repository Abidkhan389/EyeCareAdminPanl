import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorViewComponent } from './vendor-view.component';

describe('VendorViewComponent', () => {
  let component: VendorViewComponent;
  let fixture: ComponentFixture<VendorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
