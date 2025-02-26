import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentGradeViewComponent } from './assessment-grade-view.component';

describe('AssessmentGradeViewComponent', () => {
  let component: AssessmentGradeViewComponent;
  let fixture: ComponentFixture<AssessmentGradeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentGradeViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentGradeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
