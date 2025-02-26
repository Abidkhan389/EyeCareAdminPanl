import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBehaviorComponent } from './student-behavior.component';

describe('StudentBehaviorComponent', () => {
  let component: StudentBehaviorComponent;
  let fixture: ComponentFixture<StudentBehaviorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentBehaviorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentBehaviorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
