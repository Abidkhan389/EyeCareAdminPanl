import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentParticipationComponent } from './student-participation.component';

describe('StudentParticipationComponent', () => {
  let component: StudentParticipationComponent;
  let fixture: ComponentFixture<StudentParticipationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentParticipationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentParticipationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
