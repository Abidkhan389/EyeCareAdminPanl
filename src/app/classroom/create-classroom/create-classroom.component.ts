import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from '../services/classroom.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-classroom',
  templateUrl: './create-classroom.component.html',
  styleUrl: './create-classroom.component.scss'
})
export class CreateClassroomComponent implements OnInit {
  classRoomForm: FormGroup;
  isEditMode: boolean = false;
  classroomId: number | null = null;
  isLoading = true;
  //@Output() formStatus = new EventEmitter<boolean>();
  constructor(
    private fb: FormBuilder,
    private classroomService: ClassroomService,
    private router: Router,
    private message: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.classRoomForm = this.fb.group({
      classRoomId: 0,
      classroomName: ['', [Validators.required, Validators.maxLength(100)]], // Required with max length validation
      classroomCapacity: [null, [Validators.required, Validators.min(1)]], // Required with minimum value
      classroomLevel: [null, Validators.required], // Required field
      roomNumber: ['', Validators.required], // Required field
      registeredStudentsCount: [0], // Optional, default to 0     
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.classroomId = +id;
        this.loadclassRoomDetails(this.classroomId);
      } else {
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.classRoomForm.valid) {
      if (this.isEditMode && this.classroomId) {
        // Update classroom
        this.classroomService
          .updateClassRoom(this.classroomId, this.classRoomForm.value)
          .subscribe({
            next: () => {
              this.showSuccessMessage('ClassRoom updated successfully!');
              this.router.navigate(['./'],{relativeTo:this.route.parent});
            },
            error: (err) => {
              this.showErrorMessage('Failed to update classroom: ' + err.message);
            },
          });
      } else {
        // Create new employee
        this.classroomService.createClassRoom(this.classRoomForm.value).subscribe({
          next: () => {
            this.showSuccessMessage('ClassRoom created successfully!');
            this.router.navigate(['./'],{relativeTo:this.route.parent});
          },
          error: (err) => {
            this.showErrorMessage('Failed to create ClassRoom: ' + err.message);
          },
        });
      }
    } else {
      this.showErrorMessage('Please fill in all required fields correctly.');
    }
  }
  isValid(): boolean {
    return this.classRoomForm.valid;
  }

  // Method to get form data
  getData(): any {
    return this.classRoomForm.value;
  }
  public markFormFieldsAsDirty(): void {
    if (this.classRoomForm) {
      Object.keys(this.classRoomForm.controls).forEach((key) => {
        const control = this.classRoomForm.get(key);
        if (control) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }
  }

  loadclassRoomDetails(id: number): void {
    this.classroomService.getClassRoomById(id).subscribe({
      next: (employeeData) => {
        this.classRoomForm.patchValue(employeeData.data);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.showErrorMessage('Failed to load employee data.');
      },
    });
  }
  showSuccessMessage(successMessage:string) {
    this.message.open(successMessage, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom', // or 'top'
      panelClass: ['success-snackbar'] // Optional: for custom styling
    });
  }

  showErrorMessage(failMessage:string) {
    this.message.open(failMessage, 'Retry', {
      duration: 5000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom', // or 'top'
      panelClass: ['error-snackbar'] // Optional: for custom styling
    });
  }
}
