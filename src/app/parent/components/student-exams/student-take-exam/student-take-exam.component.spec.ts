import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTakeExamComponent } from './student-take-exam.component';

describe('StudentTakeExamComponent', () => {
  let component: StudentTakeExamComponent;
  let fixture: ComponentFixture<StudentTakeExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentTakeExamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentTakeExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
