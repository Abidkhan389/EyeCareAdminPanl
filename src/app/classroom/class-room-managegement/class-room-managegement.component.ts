import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Messages } from '../../shared/Validators/validation-messages';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClassRoomManagementService } from '../services/class-room-management.service';
import { RepoResponse } from '../../apiTypes/RepoResponse';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClassroomService } from '../services/classroom.service';
import { ClassRoomManagement, FacultySubjectList } from '../../apiTypes/FacultySubjectList';

@Component({
  selector: 'app-class-room-managegement',
  templateUrl: './class-room-managegement.component.html',
  styleUrl: './class-room-managegement.component.scss'
})
export class ClassRoomManagegementComponent {
  ClassRoomManagementForm!: FormGroup;
  validationMessages = Messages.validation_messages;
  ClassRoomManagementList: any;
  isLoading = true;
  arrayDefine:boolean=false;
  facultyId: any;
  subjectId: any;
  classRoomId:any;
  inEditMode:boolean=false;
  facultyList:any[]=[];
  subjectList :any[]=[];

  constructor(private classRoomManagementService: ClassRoomManagementService, private fb: FormBuilder, protected router: Router, 
    private message: MatSnackBar,private route: ActivatedRoute,private classroomService: ClassRoomManagementService) { }
  ngOnInit(): void {
    this.validateform();
    this.route.params.subscribe((params) => {
       this.classRoomId = +params['id']; // Get ClassRoom ID from the route
    this.GetClassRoomManagement();

    });       
  }
  GetClassRoomManagement() {
    this.classroomService.getClassSubjectFacultyList(this.classRoomId).subscribe({
      next: (response) => {
        this.facultyList = response.data.facultyLists; // Assign the fetched employee data
        this.subjectList = response.data.subjectLists; // Assign the fetched employee data
      },
      error: (err) => {
        console.error('Error fetching classroom details:', err);
        this.isLoading = false;
      },
    });
    this.classRoomManagementService.getClassRoomManagementById(this.classRoomId).subscribe({
      next: (response: RepoResponse<ClassRoomManagement>) => { // Use ClassRoomManagement type here
        if (response.success) {
          this.ClassRoomManagementList = response.data;
          this.ClassRoomManagementList.facultySubjectIds.forEach((pair: FacultySubjectList) => {
            this.facultySubjectIds.push(this.fb.group({
              facultyId: new FormControl(pair.facultyId),
              subjectId: new FormControl(pair.subjectId),
            }));
          });
          this.ClassRoomManagementForm.patchValue(response.data);
          this.inEditMode = true;
          this.arrayDefine=true;
          this.isLoading=false;
        }
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }
  validateform() {
    this.ClassRoomManagementForm = this.fb.group({
      classRoomId: [null],
  facultySubjectIds: this.fb.array([]) 
    });
  }
  get facultySubjectIds(): FormArray {
    return this.ClassRoomManagementForm.get('facultySubjectIds') as FormArray;
  }

  addFacultySubjectPair(facultyId: number, subjectId: number) {
    const facultySubjectGroup = this.createFacultySubjectGroup(facultyId,subjectId);
    this.facultySubjectIds.push(facultySubjectGroup);
  }

  createFacultySubjectGroup(facultyId? : any, subjectId?:any ): FormGroup {
    return this.fb.group({
      classRoomFacultyId: [null],
      facultyId: [facultyId, Validators.required],
      subjectId: [subjectId, Validators.required],
    });
  }

  removeFacultySubjectPair(index: number) {
    this.facultySubjectIds.removeAt(index);
  }

  AddFacultySubjects() {
      this.addFacultySubjectPair(this.facultyId, this.subjectId);
      this.arrayDefine=true;
  }
  // Method to handle faculty selection change
  onFacultyChange(event: any) {
    this.facultyId = event.value;     
  }
  onSubjectChange(event: any)
  {
    this.subjectId = event.value;
  }

  onSubmit() {
    this.isLoading = true;
    let model = Object.assign({}, this.ClassRoomManagementForm.getRawValue());
    if (this.inEditMode) {
      this.classRoomManagementService
        .updateClassRoomManagement(this.classRoomId, this.ClassRoomManagementForm.value)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.showSuccessMessage('ClassRoomManagement updated successfully!');
            this.router.navigate(['./'],{relativeTo:this.route.parent});
            
          },
          error: (err) => {
            this.showErrorMessage('Failed to update ClassRoomManagement: ' + err.message);
          },
        });
    }
    else {
      model.classRoomId = this.classRoomId;
      this.classRoomManagementService.createClassRoomManagement(model).subscribe({
        next: () => {
          this.isLoading=false;
          this.showSuccessMessage('ClassRoomManagement created successfully!');
          this.router.navigate(['./'],{relativeTo:this.route.parent});
        },
        error: (err) => {
          this.showErrorMessage('Failed to create ClassRoomManagement: ' + err.message);
        },
      });

    }

  }
  showSuccessMessage(successMessage: string) {
    this.message.open(successMessage, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom', // or 'top'
      panelClass: ['success-snackbar'] // Optional: for custom styling
    });
  }

  showErrorMessage(failMessage: string) {
    this.message.open(failMessage, 'Retry', {
      duration: 5000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom', // or 'top'
      panelClass: ['error-snackbar'] // Optional: for custom styling
    });
  }
  getFacultyName(facultyId: any): string | undefined {
    var result=this.facultyList.find(f => f.facultyId === facultyId)?.facultyName;
    return result;
  }
  
  getSubjectName(subjectId: any): string | undefined {
    var result= this.subjectList.find(s => s.subjectId === subjectId)?.subjectName;
    
    return result;
  }
  
}
