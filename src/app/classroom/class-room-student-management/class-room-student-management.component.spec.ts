import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassRoomStudentManagementComponent } from './class-room-student-management.component';

describe('ClassRoomStudentManagementComponent', () => {
  let component: ClassRoomStudentManagementComponent;
  let fixture: ComponentFixture<ClassRoomStudentManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassRoomStudentManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassRoomStudentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
