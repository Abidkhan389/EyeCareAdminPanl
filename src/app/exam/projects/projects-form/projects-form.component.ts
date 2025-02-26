import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LearningManagementService } from '../../services/learning-management.service';
import { RepoResponse } from '../../../apiTypes/RepoResponse';
import { Project, StudentDto } from '../../../apiTypes/project';
import { AuthService } from '../../../auth/services/auth.service';
import { AlertService } from '../../../shared/services/alert.service';
import { ALERT_TYPE } from '../../../shared/models/alert';

@Component({
  selector: 'app-projects-form',
  templateUrl: './projects-form.component.html',
  styleUrls: ['./projects-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;
  students: StudentDto[] = []; // Initialize with list of students to select for the project
  isEditMode: boolean;
  projectId?: number;
  classId: number;
  subjectId: number;
  refreshMethod: any;
  minDate: Date = new Date(); 
  constructor(
    private fb: FormBuilder,
    private learningMgmtService: LearningManagementService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<ProjectFormComponent>,
    private alertService: AlertService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      classId: number;
      subjectId: number;
      isEdit: boolean;
      projectId?: number;
      refreshMethod: any;
    }
  ) {
    this.isEditMode = data.isEdit;
    this.classId = data.classId;
    this.subjectId = data.subjectId;
    this.refreshMethod = data.refreshMethod;
    if (data.projectId) {
      this.projectId = data.projectId;
    }
  }

  ngOnInit(): void {
    this.initializeForm();
    if (this.isEditMode && this.projectId) {
      this.loadProjectDetails();
    }
    this.loadStudents(); // Load students for multi-select
  }

  initializeForm(): void {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: [null],
      maxScore: [null, [Validators.required, Validators.min(0)]],
      studentIds: [[]], // Multi-select for students
      createdDate: { value: new Date(), disabled: true },
      notes: [''],
    });
  }

  loadProjectDetails(): void {
    this.learningMgmtService.getProjectDetails(this.projectId!).subscribe(
      (project: RepoResponse<Project>) => {
        this.projectForm.patchValue({
          title: project.data.title,
          description: project.data.description,
          dueDate: project.data.dueDate,
          maxScore: project.data.maxScore,
          studentIds: project.data.students.map((x) => x.studentId) || [], // Set selected students
          createdDate: project.data.createdDate,
          notes: project.data.description,
        });
      },
      (error) => {
        console.error('Error loading project details:', error);
      }
    );
  }

  loadStudents(): void {
    this.learningMgmtService
      .getClassroomStudents(this.classId)
      .subscribe((response) => {
        this.students = response.data || [];
      });
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      return;
    }
    const selectedStudentIds = this.projectForm.value.studentIds;

    // Filter `this.students` to include only students whose `studentId` is in `selectedStudentIds`
    const filteredStudents = this.students.filter((student) =>
      selectedStudentIds.includes(student.studentId)
    );

    const projectData: Project = {
      ...this.projectForm.value,
      createdDate: this.projectForm.get('createdDate')?.value || new Date(),
      classId: this.classId,
      subjectId: this.subjectId,
      createdByFacultyId: 0,
      students: filteredStudents,
      projectId: this.isEditMode ? this.projectId : 0,
    };

    if (this.isEditMode) {
      this.learningMgmtService.updateProject(projectData).subscribe((res) => {
        if (res.success) {
          this.alertService.alert(
            'Project updated successfully!',
            ALERT_TYPE.SUCCESS
          );
          this.closeModalAndRefresh();
        } else {
          this.alertService.alert(
            'Error updating project: ' + res.errors[0],
            ALERT_TYPE.ERROR
          );
        }
      });
    } else {
      this.learningMgmtService.createProject(projectData).subscribe((res) => {
        if (res.success) {
          this.alertService.alert(
            'Project created successfully!',
            ALERT_TYPE.SUCCESS
          );
          this.closeModalAndRefresh();
        } else {
          this.alertService.alert(
            'Error creating project: ' + res.errors[0],
            ALERT_TYPE.ERROR
          );
        }
      });
    }
  }

  closeModalAndRefresh() {
    this.dialogRef.close();
    this.refreshMethod();
  }
   //Its Close The DialogRef Modal
   closeClick() {
    this.dialogRef.close();
  }
}
