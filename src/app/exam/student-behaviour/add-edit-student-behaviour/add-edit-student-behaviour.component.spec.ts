import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditStudentBehaviourComponent } from './add-edit-student-behaviour.component';

describe('AddEditStudentBehaviourComponent', () => {
  let component: AddEditStudentBehaviourComponent;
  let fixture: ComponentFixture<AddEditStudentBehaviourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditStudentBehaviourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditStudentBehaviourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
