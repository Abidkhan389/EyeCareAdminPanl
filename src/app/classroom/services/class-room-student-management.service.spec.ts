import { TestBed } from '@angular/core/testing';

import { ClassRoomStudentManagementService } from './class-room-student-management.service';

describe('ClassRoomStudentManagementService', () => {
  let service: ClassRoomStudentManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassRoomStudentManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
