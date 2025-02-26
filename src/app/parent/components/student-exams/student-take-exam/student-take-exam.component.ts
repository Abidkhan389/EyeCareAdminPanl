import { Component, HostListener, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam } from 'src/app/apiTypes/exam';
import { ExamQuestion } from 'src/app/apiTypes/examQuestion';
import { LearningManagementService } from 'src/app/exam/services/learning-management.service';
import { StudentDashboardServiceService } from 'src/app/parent/student-dashboard/service/student-dashboard-service.service';
import { ALERT_TYPE } from 'src/app/shared/models/alert';
import { ConfirmDeleteResponseType } from 'src/app/shared/models/confirmDeleteResponseType';
import { AlertService } from 'src/app/shared/services/alert.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-student-take-exam',
  templateUrl: './student-take-exam.component.html',
  styleUrl: './student-take-exam.component.scss',
})
export class StudentTakeExamComponent {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  loading = true;
  currentIndex = 0;
  timeLimit = 3600; // Default to 1 hour in seconds
  timer: any;
  unansweredQuestions: Set<number> = new Set();
  studentId: any;
  classroomId: any;
  subjectId: any;

  constructor(
    private modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public data: Exam,
    private learningMgmt: LearningManagementService,
    private studentDashboard: StudentDashboardServiceService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {}

  examForm: FormGroup;
  exam: Exam;
  questions: ExamQuestion[] = [];

  ngOnInit(): void {
    this.studentId = this.route.snapshot.params['studentId'];
    this.classroomId = this.route.snapshot.params['classroomId'];
    this.subjectId = this.route.snapshot.params['subjectId'];
    this.learningMgmt.getExamDetails(this.data.examId).subscribe((x) => {
      if (x.success) {
        this.exam = x.data;
        this.questions = x.data.questions ?? [];
        this.loading = false;
        this.initializeForm();
      }
    });
  }

  initializeForm() {
    const group: { [key: string]: FormControl } = {};
    this.questions.forEach((question) => {
      group[`question${question.questionId}`] = new FormControl(
        '',
        Validators.required
      );
    });
    this.examForm = new FormGroup(group);
    this.questions.forEach((q) => this.unansweredQuestions.add(q.questionId));
  }

  submitExamToApi() {
    console.log('submitting exam to api');
    this.exam.questions = this.questions; // assign answered questions to exam object
    const stringExam = JSON.stringify(this.exam);
    this.studentDashboard
      .submitStudentExam({
        classroomId: this.classroomId,
        subjectId: this.subjectId,
        studentId: this.studentId,
        assessmentId: this.exam.examId,
        assessmentType: 0,
        stringifiedObject: stringExam,
      })
      .subscribe((x) => {
        if (x.success) {
          this.alertService.alert(
            'Exam was submitted successfully. Session will end now!',
            ALERT_TYPE.SUCCESS
          );
          this.modalService.close();
        } else {
          this.alertService.alert(
            'Exam submission failed! If issue persists, please contact admin immediately!',
            ALERT_TYPE.ERROR
          );
        }
      });
    console.log(this.exam);
  }

  startTimer() {
    this.timer = setTimeout(() => {
      this.submitExam();
    }, this.timeLimit * 1000);
  }

  moveToQuestion(index: number) {
    this.currentIndex = index;
  }

  onAnswerQuestion(questionId: number) {
    this.unansweredQuestions.delete(questionId);
  }

  submitExam() {
    if (this.unansweredQuestions.size > 0) {
      this.modalService
        .confirmAction(
          'Not all questions are answered. Are you sure you want to submit?'
        )
        .subscribe((x) =>
          x === ConfirmDeleteResponseType.CONFIRMED
            ? this.completeSubmission()
            : null
        );
    }
  }

  completeSubmission() {
    // Handle exam submission logic
    clearTimeout(this.timer);
    this.submitExamToApi();
    console.log('Exam submitted');
  }

  @HostListener('window:beforeunload', ['$event'])
  handleNavigationAttempt(event: any) {
    if (this.unansweredQuestions.size > 0) {
      event.returnValue =
        'You have unanswered questions. Are you sure you want to leave?';
    }
  }

  canDeactivate(): void {
    if (this.unansweredQuestions.size > 0) {
      this.modalService
        .confirmAction(
          'You have unanswered questions. Are you sure you want to leave?'
        )
        .subscribe((x) => {
          if (x === ConfirmDeleteResponseType.CONFIRMED) {
            clearTimeout(this.timer);
            this.submitExamToApi();
          }
        });
    }
  }

  parseChoice(choices: string | undefined | null) {
    return JSON.parse(choices || '[]');
  }
}
