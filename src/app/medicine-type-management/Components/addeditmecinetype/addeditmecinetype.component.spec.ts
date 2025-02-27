import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditmecinetypeComponent } from './addeditmecinetype.component';

describe('AddeditmecinetypeComponent', () => {
  let component: AddeditmecinetypeComponent;
  let fixture: ComponentFixture<AddeditmecinetypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddeditmecinetypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeditmecinetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
