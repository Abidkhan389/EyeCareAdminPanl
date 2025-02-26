import { Component } from '@angular/core';
import { ClassRoomStudentManagementService } from '../services/class-room-student-management.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Messages } from '../../shared/Validators/validation-messages';
import { RepoResponse } from '../../apiTypes/RepoResponse';
import { studentList } from '../../apiTypes/IStudentList';

@Component({
  selector: 'app-class-room-student-management',
  templateUrl: './class-room-student-management.component.html',
  styleUrl: './class-room-student-management.component.scss',
})
export class ClassRoomStudentManagementComponent {
  ClassRoomStudentManagementForm!: FormGroup;
  validationMessages = Messages.validation_messages;
  ClassRoomStudentManagementList: any;
  studentIdsList: number[] = []; // Holds selected student IDs

  // Form control for mat-select
  studentControl = new FormControl([]);
  classRoomId: any;
  classRoomName: any;
  isLoading: boolean = true;
  arrayDefine: boolean = false;
  inEditMode: boolean = false;
  studentList: any[] = [];
  selectedStudents: any[] = [];
  constructor(
    private classRoomStudentManagementService: ClassRoomStudentManagementService,
    private fb: FormBuilder,
    protected router: Router,
    private message: MatSnackBar,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.validateform();
    this.route.params.subscribe((params) => {
      this.classRoomId = +params['id']; // Get ClassRoom ID from the route
      this.classRoomName = localStorage.getItem('classRoomName') || '';
      this.GetStudentListByClassRoomId();
    });
  }
  GetStudentListByClassRoomId() {
    this.classRoomStudentManagementService
      .GetStudentListByClassRoomId(this.classRoomId)
      .subscribe({
        next: (response) => {
          this.studentList = response.data; // Assign the fetched employee data
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching classroom details:', err);
          this.isLoading = false;
        },
      });
    this.classRoomStudentManagementService
      .getClassRoomStudentManagementById(this.classRoomId)
      .subscribe({
        next: (response: RepoResponse<any>) => {
          // Use ClassRoomManagement type here
          if (response.success) {
            this.ClassRoomStudentManagementList = response.data;
            if (this.ClassRoomStudentManagementList.studentIds != null) {
              this.ClassRoomStudentManagementList.studentIds.forEach(
                (pair: studentList) => {
                  this.studentIds.push(
                    this.fb.group({
                      studentId: new FormControl(pair.studentId),
                    })
                  );
                }
              );
              this.ClassRoomStudentManagementForm.patchValue(response.data);
              this.inEditMode = true;
            }        
            this.arrayDefine = true;
            this.isLoading = false;
          }
        },
        error: (err) => {
          this.isLoading = false;
        },
      });
  }
  validateform() {
    this.ClassRoomStudentManagementForm = this.fb.group({
      classRoomId: [null],
      studentIds: this.fb.array([]),
    });
  }
  get studentIds(): FormArray {
    return this.ClassRoomStudentManagementForm.get('studentIds') as FormArray;
  }
  addStudentPair(studentId: number) {
    const studentGroup = this.createStudentGroup(studentId);
    this.studentIds.push(studentGroup);
  }

  createStudentGroup(studentId?: any): FormGroup {
    return this.fb.group({
      Id: [null],
      classRoomLevel: [null],
      studentId: [studentId, Validators.required],
    });
  }
  removeFacultySubjectPair(index: number) {
    this.studentIds.removeAt(index);
  }

  // Handle selection change to update studentIdsList
  onStudentSelectionChange(event: any): void {
    // Loop through the selected student IDs
    event.value.forEach((studentId: number) => {
      // Check if the studentId is already in the studentIdsList
      if (!this.studentIdsList.includes(studentId)) {
        // If not, add it to the list
        this.studentIdsList.push(studentId);
      }
    });
  }

  // Method to add students to the studentIds form array
  AddStudents() {
    // this.studentIdsList.forEach(studentId => {

    //   const studentGroup = this.createStudentGroup(studentId);
    //   this.studentIds.push(studentGroup);
    // });
    this.studentIdsList.forEach((studentId) => {
      // Check if studentId already exists in studentIds
      const exists = this.studentIds.controls.some(
        (control) => control.value.studentId === studentId
      );

      if (!exists) {
        const studentGroup = this.createStudentGroup(studentId);
        this.studentIds.push(studentGroup);
      }
    });
    this.studentIdsList = []; // Clear the selection after adding
    this.studentControl.setValue([]); // Reset the selection in the form control
  }
  onSubmit() {
    this.isLoading = true;
    let model = Object.assign(
      {},
      this.ClassRoomStudentManagementForm.getRawValue()
    );
    if (this.inEditMode) {
      this.classRoomStudentManagementService
        .updateClassRoomStudentManagement(this.classRoomId, model)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.showSuccessMessage(
              'Class Room Student Management updated successfully!'
            );
            this.router.navigate(['./'], { relativeTo: this.route.parent });
          },
          error: (err) => {
            this.showErrorMessage(
              'Failed to update Class Room Student Management: ' + err.message
            );
          },
        });
    } else {
      model.classRoomId = this.classRoomId;
      this.classRoomStudentManagementService
        .createClassRoomStudentManagement(model)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.showSuccessMessage(
              'Class Room Student Management created successfully!'
            );
            this.router.navigate(['./'], { relativeTo: this.route.parent });
          },
          error: (err) => {
            this.showErrorMessage(
              'Failed to create Class Room Student Management: ' + err.message
            );
          },
        });
    }
  }
  showSuccessMessage(successMessage: string) {
    this.message.open(successMessage, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom', // or 'top'
      panelClass: ['success-snackbar'], // Optional: for custom styling
    });
  }

  showErrorMessage(failMessage: string) {
    this.message.open(failMessage, 'Retry', {
      duration: 5000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom', // or 'top'
      panelClass: ['error-snackbar'], // Optional: for custom styling
    });
  }
  getStudentName(studentId: any): string | undefined {
    var result = this.studentList.find(
      (f) => f.studentId === studentId
    )?.studentName;
    return result;
  }
}
