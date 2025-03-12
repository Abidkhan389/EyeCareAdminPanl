import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpatientcheckupDescriptionComponent } from './viewpatientcheckup-description.component';

describe('ViewpatientcheckupDescriptionComponent', () => {
  let component: ViewpatientcheckupDescriptionComponent;
  let fixture: ComponentFixture<ViewpatientcheckupDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewpatientcheckupDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewpatientcheckupDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
