import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentDashboardServiceService } from '../../student-dashboard/service/student-dashboard-service.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { ALERT_TYPE } from 'src/app/shared/models/alert';
import { RepoResponse } from 'src/app/apiTypes/RepoResponse';
import { StudentAssignment } from 'src/app/apiTypes/studentAssignment';
import {
  AssessmentType,
  Attachment,
  StudentSubmissionsDetailsDto,
} from 'src/app/apiTypes/studentAssignmentSubmissionDto';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-student-assignments',
  templateUrl: './student-assignments.component.html',
  styleUrls: ['./student-assignments.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', [animate('225ms cubic-bezier(0.4, 0, 0.2, 1)')]),
    ])
  ]
})
export class StudentAssignmentsComponent implements OnInit {
  @ViewChild('submissionModal') submissionModal!: TemplateRef<any>;
  @ViewChild('viewAssignmentModal') viewAssignmentModal!: TemplateRef<any>;
  @ViewChild('viewSubmission') viewSubmissionModel!: TemplateRef<any>;

  studentId!: number;
  classroomId!: number;
  subjectId!: number;
  assignments: StudentAssignment[] = []; // Replace `any` with `StudentAssignment` type if available
  currentlySelectedAssignment: StudentAssignment;
  currentlySelectedStudentSubmissions: StudentSubmissionsDetailsDto;

  submissionForm: FormGroup = this.fb.group({
    comments: ['', [Validators.required, Validators.minLength(10)]],
    file: [null, Validators.required],
  });

  get fileControl(): FormControl {
    return this.submissionForm.get('file') as FormControl;
  }

  columnsToDisplay = [
    'comments',
    'grade',
    'gradedOn',
    'teacherComments',
    'gradeLetter',
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: StudentSubmissionsDetailsDto | null = null;

  constructor(
    private route: ActivatedRoute,
    private assignmentsService: StudentDashboardServiceService,
    private dialog: ModalService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private translateService: TranslateService,
    private studentDashboardService: StudentDashboardServiceService
  ) {}

  ngOnInit(): void {
    this.studentId = this.route.snapshot.params['studentId'];
    this.classroomId = this.route.snapshot.params['classroomId'];
    this.subjectId = this.route.snapshot.params['subjectId'];
    if (this.currentlySelectedStudentSubmissions) {
      this.expandedElement = this.currentlySelectedStudentSubmissions; // Set the default expanded row
    }
    this.loadStudentAssignments();
  }

  private loadStudentAssignments() {
    this.assignmentsService
      .getStudentAssignments(this.studentId, this.classroomId, this.subjectId)
      .subscribe((response) => {
        if (response.success) {
          this.assignments = response.data;
        } else {
          console.error('Error loading assignments:', response.errors);
        }
      });
  }

  isLate(dueDate: Date): boolean {
    return new Date(dueDate) < new Date();
  }

  openAssignmentDetails(assignment: any): void {
    this.currentlySelectedAssignment = assignment;
    this.dialog.open(
      this.viewAssignmentModal,
      {
        data: { assignment },
      },
      '90%',
      '50%'
    );
  }

  openSubmitAssignment(assignment: any): void {
    this.currentlySelectedAssignment = assignment;
    this.dialog.open(
      this.submissionModal,
      {
        data: { assignment },
      },
      '90%',
      '50%'
    );
  }

  openViewSubmission(assignment: any): void {
    this.currentlySelectedAssignment = assignment;
  
    this.studentDashboardService
      .getStudentSubmissionsDetails(
        this.currentlySelectedAssignment.submissionId
      )
      .subscribe((x) => {
        if (x.success) {
          this.currentlySelectedStudentSubmissions = x.data;
  
          // Set the expanded element directly
          this.expandedElement = this.currentlySelectedStudentSubmissions;
  
          // Open the dialog
          this.dialog.open(
            this.viewSubmissionModel,
            {
              data: { assignment },
            },
            '90%',
            '90%'
          );
        }
      });
  }

  closeModal(): void {
    this.dialog.close();
  }

  downloadAttachment(attachment: Attachment): void {
    this.studentDashboardService.downloadAttachment(attachment);
  }

  submitAssignment(): void {
    if (!this.submissionForm.valid) {
      this.alertService.alert(
        this.translateService.instant(
          'Please make sure to attach a file and add a comment for your teacher.'
        ),
        ALERT_TYPE.ERROR
      );
      return;
    }

    const { comments, file } = this.submissionForm.value;

    if (!file || !file._files || file._files.length === 0) {
      this.alertService.alert(
        this.translateService.instant(
          'Please make sure to attach a file and add a comment for your teacher.'
        ),
        ALERT_TYPE.ERROR
      );
      return;
    }

    // Create FormData and append fields
    const formData = this.assignmentsService.createSubmissionFormData(
      this.studentId,
      this.classroomId,
      this.subjectId,
      this.currentlySelectedAssignment.assignmentId,
      comments,
      AssessmentType.Assignment,
      file
    );

    // Submit FormData to the API
    this.assignmentsService.submitStudentAssignment(formData).subscribe(
      (x: RepoResponse<boolean>) => {
        if (x.success) {
          this.alertService.alert(
            this.translateService.instant(
              'Assignment submission was successful. Your teacher will get process your assignment accordingly!'
            ),
            ALERT_TYPE.SUCCESS
          );
          this.closeModal();
          this.loadStudentAssignments();
        } else {
          this.alertService.alert(
            this.translateService.instant(
              'Assignment submission failed. Please try again later.'
            ),
            ALERT_TYPE.ERROR
          );
        }
      },
      (error) => {
        console.error('Error submitting assignment:', error);
        this.alertService.alert(
          this.translateService.instant(
            'Assignment submission failed. Please try again later.'
          ),
          ALERT_TYPE.ERROR
        );
      }
    );
  }
  toggleRowExpansion(element: StudentSubmissionsDetailsDto): void {
    this.expandedElement = this.expandedElement === element ? null : element;
  }
}
