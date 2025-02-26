import { Student } from './student';

export interface Project {
  projectId: number;
  title: string;
  description?: string;
  dueDate: Date;
  createdDate: Date;
  isGroupProject: boolean;
  maxScore: number;
  subjectId: number;
  classId: number;
  createdByFacultyId: number;
  students: StudentDto[]; // Assuming Student is another defined interface
  isActive: boolean;
  isSubmitted?: boolean;
  submissionId: number;
}

export interface StudentDto {
  studentId: number;
  firstName: string;
  lastName: string;
  grade?: string;
  profileImageUrl?: string;
}
