export interface Grade {
  gradeId: number;
  studentId: number;
  examId: number;
  totalScore: number;
  gradedDate: Date;
  comments?: string;
}
