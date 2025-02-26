import { StudentDto } from './project';

export interface StudentAttendanceDto {
  attendanceId: number;
  studentId: number;
  classId: number;
  subjectId: number;
  attendanceStatus: AttendanceStatus; // Define AttendanceStatus as an enum if not already done
  comments: string;
  createdDate: Date;
  attendanceForDay: Date;
  studentDto: StudentDto;
}

export enum AttendanceStatus {
  Present = 0,
  Late = 1,
  Absent = 2,
}
