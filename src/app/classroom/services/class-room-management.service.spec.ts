import { TestBed } from '@angular/core/testing';

import { ClassRoomManagementService } from './class-room-management.service';

describe('ClassRoomManagementService', () => {
  let service: ClassRoomManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassRoomManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
