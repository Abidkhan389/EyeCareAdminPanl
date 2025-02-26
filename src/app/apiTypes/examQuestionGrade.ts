export interface ExamQuestionGrade {
  examQuestionGradeId: number;
  gradeId: number;
  examQuestionId: number;
  score: number;
  feedback?: string;
}
