import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBehaviourViewComponent } from './student-behaviour-view.component';

describe('StudentBehaviourViewComponent', () => {
  let component: StudentBehaviourViewComponent;
  let fixture: ComponentFixture<StudentBehaviourViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentBehaviourViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentBehaviourViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
