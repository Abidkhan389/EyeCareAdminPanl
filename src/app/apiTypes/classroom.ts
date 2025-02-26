export interface ClassRoom {
  classRoomId: number;
  classroomName: string;
  classroomCapacity: number;
  classroomLevel: number;
  roomNumber: string;
  registeredStudentsCount?: number; // Optional, as it can be null
  createdOn?: Date;
  updatedOn?: Date; // Optional, as it can be null
  createdBy?: string;
  updatedBy?: string; // Optional, as it can be null
  }
  