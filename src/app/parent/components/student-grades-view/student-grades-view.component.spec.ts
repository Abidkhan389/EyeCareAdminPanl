import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGradesViewComponent } from './student-grades-view.component';

describe('StudentGradesViewComponent', () => {
  let component: StudentGradesViewComponent;
  let fixture: ComponentFixture<StudentGradesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentGradesViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentGradesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
