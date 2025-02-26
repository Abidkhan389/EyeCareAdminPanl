import { StudentDto } from './project';

export interface StudentParticipation {
  studentParticipationId: number;
  studentId: number;
  earnedPoints: number;
  maxScore: number;
  participationPeriod: string; // E.g., 'October', 'December'
  participationDate: Date;
  comments: string;
  isActive: boolean;
  subjectId: number;
  attendancePercentage: number;
}

export interface StudentParticipationDto extends StudentParticipation {
  studentDto: StudentDto;
}
