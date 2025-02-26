export interface ExamQuestion {
  questionId: number;
  examId: number; // Foreign key to Exam
  questionText: string; // Text of the question
  questionType: string; // Type of question, e.g., 'multiple-choice', 'short-answer'
  choices?: string; // JSON string for choices if applicable (e.g., for multiple-choice)
  answer?: string; // Correct answer to the question
  points: number; // Points allocated for this question
  hint?: string; // Hint for the question, if applicable
}
