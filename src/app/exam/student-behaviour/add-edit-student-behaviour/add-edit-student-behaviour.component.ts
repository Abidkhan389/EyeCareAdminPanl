import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Patterns } from 'src/app/shared/Validators/patterns';
import { NoWhitespaceValidator } from 'src/app/shared/Validators/validators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { AppResourceServiceService, ResourceTypes } from 'src/app/shared/services/app-resource-service.service';
import { RepoResponse } from 'src/app/apiTypes/RepoResponse';
import { AppResource } from 'src/app/apiTypes/appResource';
import { Messages } from 'src/app/shared/Validators/validation-messages';
import { StudentDto } from 'src/app/apiTypes/project';
import { LearningManagementService } from '../../services/learning-management.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentBehaviourService } from '../../services/student-behaviour.service';
import { ProfileSettingService } from 'src/app/Profile/Services/profile-setting.service';

@Component({
  selector: 'app-add-edit-student-behaviour',
  templateUrl: './add-edit-student-behaviour.component.html',
  styleUrl: './add-edit-student-behaviour.component.scss'
})
export class AddEditStudentBehaviourComponent implements OnInit {
  dynamicHeight: string = 'auto'; // Default to auto height
  reportLength: 5;
  studentBehaviourForm!: FormGroup;
  isLoading: boolean = true;
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly announcer = inject(LiveAnnouncer);
  appresourceRouteType!: AppResource[];
  validationMessages = Messages.validation_messages;
  maxDate: Date = new Date();
  students: StudentDto[] = []; // Initialize with list of students to select for the project
  studentBehaviourId: number;
 
  oldPicture:any;
  imageChange:boolean=false;
  existingFiles: string[] = []; // Files already attached (from the server during edit)
  selectedFiles: File[] = [];
  selectedFileCount: number = 0;
  studentBehaviourLoadData:any;
  constructor(private dialogRef: MatDialogRef<AddEditStudentBehaviourComponent>, private fb: FormBuilder, private learningMgmtService: LearningManagementService,
    @Inject(MAT_DIALOG_DATA) public data: any, private appResourceServiceService: AppResourceServiceService,
     private message: MatSnackBar, private studentBehaviourService: StudentBehaviourService, private profileSettingService : ProfileSettingService) {
    // Dynamically set the modal height based on the report length
    //this.dynamicHeight = `${Math.max(300, this.reportLength * 50)}px`; // Ensures a minimum height of 300px
  }
  ngOnInit(): void {
    
    if (this.data.studentBehaviourId) {
      this.studentBehaviourId= this.data.studentBehaviourId;
      this.GetStudentBehaviour()
    }

    this.getResourceType()
    this.loadStudents();
    this.validateform();
  }
  getResourceType() {
    this.appResourceServiceService.getResource(ResourceTypes.BehaviourType).subscribe({
      next: (response: RepoResponse<AppResource[]>) => {
        if (response.success) {
          this.appresourceRouteType = response.data;
        }
      },
    });
  }
  loadStudents(): void {
    this.learningMgmtService
      .getClassroomStudents(this.data.classId)
      .subscribe((response) => {
        this.students = response.data || [];
      });
      
    this.isLoading =false;
  }
  GetStudentBehaviour() {
    this.studentBehaviourService.GetBehaviorByIdAsync(this.data.studentBehaviourId).subscribe({
      next: (response: RepoResponse<any[]>) => {
        if (response.success) {
          this.studentBehaviourLoadData=response.data;
          this.existingFiles=this.studentBehaviourLoadData.attachments;
          this.selectedFileCount = this.existingFiles.length;
          this.studentBehaviourForm.patchValue(response.data);
          const witnessesArray = this.studentBehaviourForm.get('witnesses') as FormArray;
          witnessesArray.clear();

          // Populate witnesses array
          if (response.data && Array.isArray((response.data as any).witnesses)) {
            (response.data as any).witnesses.forEach((witness: any) => {
              witnessesArray.push(this.fb.control(witness, [Validators.required]));
            });
          }

          this.isLoading =false;
        }
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }
  validateform() {
    this.studentBehaviourForm = this.fb.group({
      behaviorId: [null],
      studentId: [null, Validators.required],
      subjectId: [null],
      classroomId: [null],
      dateOfIncident: [null, Validators.required],
      behaviorTypeId: [null, Validators.required],
      description: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(500),]),],
      actionTaken: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(100),]),],
      reportedBy: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(100),]),],
      category: ['', Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.titleRegex), Validators.maxLength(100),]),],
      location: ['', Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.titleRegex), Validators.maxLength(100),]),],
      witnesses: this.fb.array([]),
      FollowUpRequired: [false],
      followUpDetails: ['', Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.titleRegex), Validators.maxLength(150),]),],
      ParentNotified: [true],
      notificationDetails: ['', Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.titleRegex), Validators.maxLength(150),]),],
      resolutionStatus: ['', Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.titleRegex), Validators.maxLength(150),]),],
      pointsAffected: [null, Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.Num), Validators.maxLength(150),]),],
      attachments: this.fb.array([]) // Change to an array to handle multiple files
    });
  }
  // Getter for witnesses FormArray
  get witnesses(): FormArray {
    return this.studentBehaviourForm.get('witnesses') as FormArray;
  }
// Getter for attachments FormArray
get attachments(): FormArray {
  return this.studentBehaviourForm.get('attachments') as FormArray;
}
  addWitness(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.witnesses.push(this.fb.control(value));
    }
    // Clear the input
    if (event.input) {
      event.input.value = '';
    }
  }

  removeWitness(index: number): void {
    this.witnesses.removeAt(index);
  }

  editWitness(index: number, event: any): void {
    const value = (event.value || '').trim();
    if (value) {
      this.witnesses.at(index).setValue(value);
    }
  }
  onSubmit() {
    let modelAttachments = new FormData();
    // if (this.selectedFiles && this.selectedFiles.length > 0) {
    //   this.selectedFiles.forEach((file: File, index: number) => {
    //     modelAttachments.append(`Files[${index}]`, file); // Appending each file
    //   });
    // }
    if(this.selectedFiles && this.selectedFiles.length > 0) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const file = this.selectedFiles[i];
        console.log(`Appending File: ${file.name}`);
    modelAttachments.append(`attachments`, file);
      }
    }
   
    let model = Object.assign({}, this.studentBehaviourForm.getRawValue());
    model.subjectId = this.data.subjectId;
    model.classroomId = this.data.classId;
    model.attachments = this.existingFiles;
    if (this.data.studentBehaviourId){
      model.behaviorId = this.data.studentBehaviourId
    }      
    this.studentBehaviourService.AddEditstudentBehaviourAsync(model).subscribe({
      next: (response: RepoResponse<any[]>) => {
        if (response.success) {
          if (response.data) {
            modelAttachments.append('behaviorId', response.data.toString());
            this.studentBehaviourService.AddEditstudentBehaviourAttachementsAsync(modelAttachments).subscribe({
              next: (response: RepoResponse<any[]>) => {
              if (response.success) {
                this.showSuccessMessage('Student Behaviour  attachement uploaded successfully!');
              }}
            });
            this.showSuccessMessage('Student Behaviour  updated successfully!');
            this.dialogRef.close(true);

          }
          else {
            this.showSuccessMessage('Student Behaviour  Created successfully!');
            this.dialogRef.close(true);


          }
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.showErrorMessage('Student Behaviour Can not be Updated  successfully');
        this.isLoading = false;
      },
    });


  }
  closeDialog(): void {
    this.dialogRef.close();
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


  onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;
  
    if (input.files && input.files.length > 0) {
     
  
      // Convert FileList to an array and assign to `this.selectedFiles`
      this.selectedFiles = Array.from(input.files); 
      this.selectedFileCount = this.existingFiles.length + this.selectedFiles.length;
  
      // Clear the current attachments in the FormArray
      this.attachments.clear();
  
    }
  }
  // Remove a file (from existing files)
  removeExistingFile(file: string): void {
    this.existingFiles = this.existingFiles.filter(f => f !== file);
    this.selectedFileCount = this.existingFiles.length + this.selectedFiles.length;
  }

  // Remove a newly selected file
  removeNewFile(file: File): void {
    this.selectedFiles = this.selectedFiles.filter(f => f !== file);
    this.selectedFileCount = this.existingFiles.length + this.selectedFiles.length;
  }

  extractFileName(attachment: string): string {
    // Split by backslash to get the filename (last part)
    const fileNameWithExtension = attachment.split('\\').pop() || '';

    // Split by dot to remove the extension (get the name before .jpg, .png, etc.)
    const fileName = fileNameWithExtension.split('.')[0];

    return fileName;
}
}
