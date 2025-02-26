import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LearningManagementService } from '../../services/learning-management.service';
import { RepoResponse } from '../../../apiTypes/RepoResponse';
import { Assignment } from '../../../apiTypes/assignment';
import { AuthService } from '../../../auth/services/auth.service';
import { AlertService } from '../../../shared/services/alert.service';
import { ALERT_TYPE } from '../../../shared/models/alert';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.scss'],
})
export class AssignmentFormComponent implements OnInit {
  assignmentForm!: FormGroup;
  isEditMode: boolean;
  assignmentId?: number;
  classId: number;
  subjectId: number;
  //refreshMethod: any;
  minDate: Date = new Date();
  constructor(
    private fb: FormBuilder,
    private learningMgmtService: LearningManagementService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<AssignmentFormComponent>,
    private alertService: AlertService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      classId: number;
      subjectId: number;
      isEdit: boolean;
      assignmentId?: number;
      //refreshMethod: any;
    }
  ) {
    this.isEditMode = data.isEdit;
    this.classId = data.classId;
    this.subjectId = data.subjectId;
    //this.refreshMethod = data.refreshMethod;
    if (data.assignmentId) {
      this.assignmentId = data.assignmentId;
    }
  }

  ngOnInit(): void {
    this.initializeForm();
    if (this.isEditMode && this.assignmentId) {
      this.loadAssignmentDetails();
    }
  }

  initializeForm(): void {
    this.assignmentForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: [null, Validators.required],
      maxScore: [null, [Validators.required, Validators.min(0)]],
      createdDate: { value: new Date(), disabled: true },
      notes: [''],
    });
  }

  loadAssignmentDetails(): void {
    this.learningMgmtService
      .getAssignmentDetailsById(this.assignmentId!)
      .subscribe(
        (assignment: RepoResponse<Assignment>) => {
          this.assignmentForm.patchValue({
            title: assignment.data.title,
            description: assignment.data.description,
            dueDate: assignment.data.dueDate,
            maxScore: assignment.data.maxScore,
            createdDate: assignment.data.createdDate,
            notes: assignment.data.notes,
          });
        },
        (error) => {
          console.error('Error loading assignment details:', error);
        }
      );
  }

  onSubmit(): void {
    if (this.assignmentForm.invalid) {
      return;
    }

    const assignmentData: Assignment = {
      ...this.assignmentForm.value,
      createdDate: this.assignmentForm.get('createdDate')?.value || new Date(),
      classId: this.classId,
      subjectId: this.subjectId,
      createdByFacultyId: 0, //TODO: Implement logic to add faculty id if impersonated,
    };

    if (this.isEditMode) {
      this.learningMgmtService
        .updateAssignment(this.assignmentId!, assignmentData)
        .subscribe((res) => {
          if (res.success) {
            this.alertService.alert(
              'Assignment added successfully!',
              ALERT_TYPE.SUCCESS
            );
            this.closeModalAndRefresh();
          } else {
            this.alertService.alert(
              'Error updating assignment: ' + res.errors[0],
              ALERT_TYPE.ERROR
            );
          }
        });
    } else {
      this.learningMgmtService
        .createAssignment(assignmentData)
        .subscribe((res) => {
          if (res.success) {
            this.alertService.alert(
              'Assignment added successfully!',
              ALERT_TYPE.SUCCESS
            );
            this.dialogRef.close(true);
          } else {
            this.alertService.alert(
              'Error updating assignment: ' + res.errors[0],
              ALERT_TYPE.ERROR
            );
          }
        });
    }
  }
  closeModalAndRefresh() {
    this.dialogRef.close();
    //this.refreshMethod();
  }
  //Its Close The DialogRef Modal
  closeClick() {
    //this.refreshMethod();
    this.dialogRef.close();
   
  }
}
