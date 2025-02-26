export interface Assignment {
  assignmentId: number;
  title: string;
  description?: string;
  dueDate: Date;
  createdDate: Date;
  isActive: boolean;
  maxScore: number;
  subjectId: number;
  classId: number; // New property for ClassId
  createdByFacultyId: number;
  notes?: string;
  dueTime?: string;
}
