import { ExamQuestion } from './examQuestion';

export interface Exam {
  examId: number;
  classId: number;
  subjectId: number;
  title: string;
  description?: string;
  dueDate: Date;
  maxScore: number;
  isInPerson: boolean;
  isActive: boolean;
  questions?: ExamQuestion[];
  createdDate: Date;
  duration?: number; //duration in minutes
}
