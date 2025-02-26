import { Component } from '@angular/core';
import { Question, StudentGradeDto } from '../gradebook.component';
import { ActivatedRoute } from '@angular/router';
import { LearningManagementService } from '../../services/learning-management.service';
import { AssessmentGeneric } from '../../../apiTypes/assessmentGeneric';

@Component({
  selector: 'app-assessment-grade-view',
  templateUrl: './assessment-grade-view.component.html',
  styleUrl: './assessment-grade-view.component.scss',
})
export class AssessmentGradeViewComponent {
  studentGrades: StudentGradeDto[] = [];
  questionColumns: string[] = ['points', 'score', 'feedback']; //'questionText',
  assessmentId!: number;
  selectedAssessmentType!: string;
  currentAssessment!: AssessmentGeneric;

  constructor(
    private route: ActivatedRoute,
    private learningMgmtService: LearningManagementService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.assessmentId = +params['assessmentId'];
      this.selectedAssessmentType = params['assessmenttype'];
      this.loadGrades();
    });
  }

  getAssessmentInfo() {
    this.learningMgmtService
      .getAssessmentInfo(this.assessmentId, this.selectedAssessmentType)
      .subscribe((x) => (this.currentAssessment = x));
  }

  loadGrades(): void {
    this.learningMgmtService
      .getAssessmentGrades(this.assessmentId, this.selectedAssessmentType)
      .subscribe((response) => {
        if (response.data) {
          this.studentGrades = response.data;
          this.getAssessmentInfo();
        }
      });
  }

  // getTotalPoints(questions: Question[]): number {
  //   return questions.length > 0
  //     ? questions.reduce((sum, question) => sum + question.points, 0)
  //     : this.currentAssessment.maxScore;
  // }
  getTotalPoints(questions: Question[]): number {
    return questions.length > 0
      ? questions.reduce((sum, question) => sum + question.points, 0)
      : this.currentAssessment?.maxScore ?? 0; // Use null-safe access and provide a fallback
  }
}
