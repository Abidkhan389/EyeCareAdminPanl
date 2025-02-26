export interface StudentAssignment {
  assignmentId: number;
  title: string;
  description: string;
  dueDate: Date;
  createdDate: Date;
  isActive: boolean;
  maxScore: number;
  subjectId: number;
  createdByFacultyId: number;
  notes?: string;
  dueTime?: string;
  classId: number;
  isSubmitted: boolean;
  submissionId: number;
  studentId: number;
}
