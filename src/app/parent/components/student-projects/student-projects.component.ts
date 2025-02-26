import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentDashboardServiceService } from '../../student-dashboard/service/student-dashboard-service.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Project } from 'src/app/apiTypes/project';
import { TranslateService } from '@ngx-translate/core';
import { ALERT_TYPE } from 'src/app/shared/models/alert';
import { RepoResponse } from 'src/app/apiTypes/RepoResponse';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import {
  AssessmentType,
  Attachment,
  StudentSubmissionsDetailsDto,
} from 'src/app/apiTypes/studentAssignmentSubmissionDto';

@Component({
  selector: 'app-student-projects',
  templateUrl: './student-projects.component.html',
  styleUrl: './student-projects.component.scss',
})
export class StudentProjectsComponent implements OnInit {
  @ViewChild('viewProjectModal') viewProjectModal!: TemplateRef<any>;
  @ViewChild('viewSubmission') viewSubmissionModel!: TemplateRef<any>;

  studentId!: number;
  classroomId!: number;
  subjectId!: number;
  projects: Project[] = [];
  currentlySelectedProject!: Project;
  currentlySelectedStudentSubmissions: StudentSubmissionsDetailsDto;
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
    private projectService: StudentDashboardServiceService,
    private dialog: ModalService,
    private translateService: TranslateService,
    private alertService: AlertService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.studentId = this.route.snapshot.params['studentId'];
    this.classroomId = this.route.snapshot.params['classroomId'];
    this.subjectId = this.route.snapshot.params['subjectId'];

    this.loadStudentProjects();
  }

  @ViewChild('submissionModal') submissionModal!: TemplateRef<any>;

  submissionForm: FormGroup = this.fb.group({
    comments: ['', [Validators.required, Validators.minLength(10)]],
    file: [null, Validators.required],
  });

  get fileControl(): FormControl {
    return this.submissionForm.get('file') as FormControl;
  }

  openSubmitProject(project: Project): void {
    this.currentlySelectedProject = project;
    this.dialog.open(
      this.submissionModal,
      {
        data: { project },
      },
      '90%',
      '50%'
    );
  }

  submitProject(): void {
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

    const formData = this.projectService.createSubmissionFormData(
      this.studentId,
      this.classroomId,
      this.subjectId,
      this.currentlySelectedProject.projectId,
      comments,
      AssessmentType.Project,
      file
    );

    this.projectService.submitStudentProject(formData).subscribe(
      (x: RepoResponse<boolean>) => {
        if (x.success) {
          this.alertService.alert(
            this.translateService.instant(
              'Project submission was successful. Your teacher will review it shortly.'
            ),
            ALERT_TYPE.SUCCESS
          );
          this.dialog.close();
          this.loadStudentProjects();
        } else {
          this.alertService.alert(
            this.translateService.instant(
              'Project submission failed. Please try again later.'
            ),
            ALERT_TYPE.ERROR
          );
        }
      },
      (error) => {
        console.error('Error submitting project:', error);
        this.alertService.alert(
          this.translateService.instant(
            'Project submission failed. Please try again later.'
          ),
          ALERT_TYPE.ERROR
        );
      }
    );
  }

  private loadStudentProjects(): void {
    this.projectService
      .getStudentProjects(this.studentId, this.classroomId, this.subjectId)
      .subscribe((response) => {
        if (response.success) {
          this.projects = response.data;
        } else {
          console.error('Error loading projects:', response.errors);
        }
      });
  }

  isLate(dueDate: Date): boolean {
    return new Date(dueDate) < new Date();
  }

  openViewSubmission(project: Project): void {
    this.currentlySelectedProject = project;
    this.projectService
      .getStudentSubmissionsDetails(this.currentlySelectedProject?.submissionId)
      .subscribe((x) => {
        if (x.success) {
          this.currentlySelectedStudentSubmissions = x.data;
          this.currentlySelectedProject = project;
          this.dialog.open(
            this.viewSubmissionModel,
            {
              data: { project },
            },
            '90%',
            '90%'
          );
        }
      });
  }

  openProjectDetails(project: any): void {
    this.currentlySelectedProject = project;
    this.dialog.open(
      this.viewProjectModal,
      {
        data: { project },
      },
      '90%',
      '50%'
    );
  }

  downloadAttachment(attachment: Attachment): void {
    this.projectService.downloadAttachment(attachment);
  }
}
