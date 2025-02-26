import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBehaviourComponent } from './student-behaviour.component';

describe('StudentBehaviourComponent', () => {
  let component: StudentBehaviourComponent;
  let fixture: ComponentFixture<StudentBehaviourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentBehaviourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentBehaviourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
