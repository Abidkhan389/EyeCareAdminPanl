import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LearningManagementService } from '../services/learning-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentDto } from '../../apiTypes/project';
import { ExamQuestion } from '../../apiTypes/examQuestion';
import { AlertService } from '../../shared/services/alert.service';
import { ALERT_TYPE } from '../../shared/models/alert';
import { StudentDashboardServiceService } from 'src/app/parent/student-dashboard/service/student-dashboard-service.service';
import { Attachment, StudentSubmissionsDetailsDto } from 'src/app/apiTypes/studentAssignmentSubmissionDto';
import { StudentAssignment } from 'src/app/apiTypes/studentAssignment';
import { ModalService } from 'src/app/shared/services/modal.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface StudentGradeDto extends StudentDto {
  questions?: Question[];
  assessmentType?: string;
  score: number | undefined | null;
  feedback: string | undefined | null;
  hasSubmission: boolean;
  submissionId: number[];
}

export interface Question extends ExamQuestion {
  score: number;
}

interface Assessment {
  assessmentId: number;
  name: string;
  classroomId: number;
}

@Component({
  selector: 'app-gradebook',
  templateUrl: './gradebook.component.html',
  styleUrl: './gradebook.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', [animate('225ms cubic-bezier(0.4, 0, 0.2, 1)')]),
    ])
  ]
})

export class GradebookComponent implements OnInit {
  columnsToDisplay = [
    'comments',
    'grade',
    'gradedOn',
    'teacherComments',
    'gradeLetter',
  ];
  isLoading = false;
  assessmentTypes = ['Assignment', 'Project', 'Exam'];
  assessments: Assessment[] = [];
  students: StudentGradeDto[] = [];
  hasBeenGraded = false;
  assignments: StudentAssignment[] = []; // Replace `any` with `StudentAssignment` type if available
  currentlySelectedAssignment: StudentAssignment;
  currentlySelectedStudentSubmissions: StudentSubmissionsDetailsDto;
  @ViewChild('viewSubmission') viewSubmissionModel!: TemplateRef<any>;
  expandedElement: StudentSubmissionsDetailsDto | null = null;
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];

  selectedAssessmentType!: string;
  selectedAssessment: any;

  displayedColumns = ['studentName', 'score', 'feedback'];
  questionColumns = ['question', 'score'];

  @ViewChild('questionGradingModal') questionGradingModal: TemplateRef<any>;;
  classId!: number;
  subjectId!: number;
  student!: StudentGradeDto;

  constructor(
    private dialog: MatDialog,
    private learningMgmtService: LearningManagementService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private router: Router,
    private studentDashboardService: StudentDashboardServiceService,
    private dialogSer: ModalService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.classId = +params['classId'];
      this.subjectId = +params['subjectId'];
    });
  }

  updateDisplayedColumns(): void {
    // Add 'questionGrading' column if selected type is 'Exam'
    this.displayedColumns = ['studentName', 'score', 'feedback'];
    if (this.selectedAssessmentType === 'Exam') {
      this.displayedColumns.push('questionGrading');
    }
  }

  onAssessmentTypeChange(type: string): void {
    // Fetch assessments based on type
    this.selectedAssessmentType = type;
    this.students = []; //reset students
    this.updateDisplayedColumns();
    switch (type) {
      case 'Assignment':
        this.learningMgmtService
          .getAssignments(this.classId, this.subjectId)
          .subscribe(
            (x) =>
              (this.assessments = x.data.map((y) => {
                return {
                  assessmentId: y.assignmentId,
                  name: y.title,
                  classroomId: y.classId,
                };
              }))
          );
        break;
      case 'Project':
        this.learningMgmtService
          .getAllProjects(this.classId, this.subjectId)
          .subscribe(
            (x) =>
              (this.assessments = x.data.map((y) => {
                return {
                  assessmentId: y.projectId,
                  name: y.title,
                  classroomId: y.classId,
                };
              }))
          );
        break;
      case 'Exam':
        this.learningMgmtService
          .getExams(this.classId, this.subjectId)
          .subscribe(
            (x) =>
              (this.assessments = x.data.map((y) => {
                return {
                  assessmentId: y.examId,
                  name: y.title,
                  classroomId: y.classId,
                };
              }))
          );
        break;
    }
  }

  navigateToGradeView() {
    if (this.selectedAssessment && this.selectedAssessmentType) {
      this.router.navigate([
        `/learning/assessment/${this.selectedAssessment.assessmentId}/type/${this.selectedAssessmentType}/viewassessmentgrade`,
      ]);
    } else {
      this.alertService.alert(
        'Please select an assessment type and assessment.',
        ALERT_TYPE.WARNING
      );
    }
  }

  onAssessmentChange(assessment: Assessment): void {
    this.students = [];
    this.learningMgmtService
      .getAssessmentGrades(assessment.assessmentId, this.selectedAssessmentType)
      .subscribe((x) => {
        if (x.data) {
          this.hasBeenGraded = x.data.length > 0;
          const validStudentIds = x.data.map((data: StudentGradeDto) => data.studentId); // Explicit type for 'data'
        
          this.students = this.students.map((student) => {
            const matchingData = x.data.find((data: StudentGradeDto) => data.studentId === student.studentId); // Explicit type for 'data'
            if (matchingData) {
              return {
                ...student,
                score: matchingData.score || 0, // Replace score
                hasSubmission: matchingData.hasSubmission || false, // Replace hasSubmission
                submissionId: matchingData.submissionId || [] // Replace submissionId
              };
            }
            return student; // Keep the original student record if no match is found
          });
        }
      });
    switch (this.selectedAssessmentType) {
      case 'Assignment':
        this.learningMgmtService
          .getClassroomStudents(assessment.classroomId)
          .subscribe((x) => {
            this.students = x.data.map((y) => {
              return {
                ...y,
                score: 0,
                feedback: '',
                questions: [],
                hasSubmission: false,
                submissionId:[]
              };
            });
          });
        break;
      case 'Project':
        this.learningMgmtService
          .getProjectDetails(assessment.assessmentId)
          .subscribe((x) => {
            this.students = x.data.students.map((x) => {
              return {
                ...x,
                questions: [],
                score: 0,
                feedback: '',
                hasSubmission: false,
                submissionId:[]
              };
            });
          });
        break;
      case 'Exam':
        this.learningMgmtService
          .getExamDetails(assessment.assessmentId)
          .subscribe((exam) => {
            this.learningMgmtService
              .getClassroomStudents(assessment.classroomId)
              .subscribe((x) => {
                this.students = x.data.map((y) => {
                  return {
                    ...y,
                    score: 0,
                    feedback: '',                    
                    hasSubmission: false,
                    submissionId:[],
                    questions: exam.data.questions?.map((question) => {
                      return {
                        ...question,
                        score: 0
                      };
                    }),
                  };
                });
              });
          });
        break;
    }
  }

  openQuestionGradingModal(student: StudentGradeDto): void {
    this.student = student;
    const dialogRef = this.dialog.open(this.questionGradingModal, {
      width: '600px',
      data: student,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        student.questions = result.questions;
      }
    });
  }

  submitGrades() {
    // Logic to submit grades
    const res = this.students.map((x) => {
      return {
        ...x,
        assessmentType: this.selectedAssessmentType,
        assessmentId: this.selectedAssessment.assessmentId,
      };
    });
    this.learningMgmtService.postStudentsGrades(res).subscribe((x) => {
      if (x.success) {
        this.alertService.alert(
          'Grades posted successfully!',
          ALERT_TYPE.SUCCESS
        );
        this.dialog.closeAll();
      } else {
        const errors = x.data?.map((y: any) => {
          return y.toString() + '\n';
        });
        this.alertService.alert(
          errors ?? 'Something went wrong! please contact admin',
          ALERT_TYPE.ERROR
        );
      }
    });
  }

  saveQuestionGrades(student: StudentGradeDto): void {
    const studentIndex = this.students.findIndex(
      (x) => x.studentId === student.studentId
    );
    if (studentIndex !== -1) {
      this.students[studentIndex] = student;
    }
    this.dialog.closeAll();
  }

  viewSubmissions(submissionId:number[])
  {

    
    this.studentDashboardService
      .getStudentSubmissionsDetails(
        submissionId[0]
      )
      .subscribe((x) => {
        if (x.success) {
          this.currentlySelectedStudentSubmissions = x.data;
          this.expandedElement = this.currentlySelectedStudentSubmissions;
          this.dialogSer.open(
            this.viewSubmissionModel,
            {
              data: {  },
            },
            '90%',
            '90%'
          );
        }
      });
  }
   downloadAttachment(attachment: Attachment): void {
      this.studentDashboardService.downloadAttachment(attachment);
    }
    toggleRowExpansion(element: StudentSubmissionsDetailsDto): void {
      this.expandedElement = this.expandedElement === element ? null : element;
    }
}
