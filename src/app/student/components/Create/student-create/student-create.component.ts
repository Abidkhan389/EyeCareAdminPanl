import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepoResponse } from '../../../../apiTypes/RepoResponse';
import { StudentService } from '../../../services/student.service';
import { ParentFormComponent } from '../parent-form/parent-form.component';
import { AccountformComponent } from '../accountform/accountform.component';
import { Student } from '../../../../apiTypes/student';
import { ParentPerson } from '../../../../apiTypes/parentperson';
import { StudentAccount } from '../../../../apiTypes/studentaccount';
import { StudentCreateFormComponent } from '../student-create-form/student-create-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentCreateDto } from '../../../../apiTypes/studentPostDto';
import { Messages } from '../../../../shared/Validators/validation-messages';
import Swal from 'sweetalert2';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper'; 

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrl: './student-create.component.scss',
})
export class StudentCreateComponent {
  hasAccount: boolean = false;
  hasParentAccount: boolean = false;
  isSubmitTrue: boolean = false;
  isParentAccountAttached: boolean = false;
  isLoading = true;
  isEditLoading = true;
  isAllValid = false;
  currentTabIndex = 0;
  isFirstTabValid = false;
  isSecondTabValid = false;
  nextButtonHide:boolean=false;    
  @ViewChild(StudentCreateFormComponent)
  studentComponent!: StudentCreateFormComponent;
  @ViewChild(ParentFormComponent) parentComponent!: ParentFormComponent;
  @ViewChild(AccountformComponent)
  studentAccountComponent!: AccountformComponent;
  studentData!: Student; // To hold initial student data
  parentData!: ParentPerson[]; // To hold initial parent data
  accountData!: StudentAccount; // To hold initial account data
  isEditMode: boolean = false;
  disableTab = true;
  validationMessages = Messages.validation_messages;
  studentFormInvalid: boolean = false;
  parentFormInvalid: boolean = false;
  accountFormInvalid: boolean = false;
  @ViewChild(MatStepper) stepper: MatStepper;
  accountFormValid: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router,
    private message: MatSnackBar
  ) {
  }
  ngOnInit(): void {
    this.checkModeAndLoadData();
  }
  ngAfterViewInit(): void {
    // Ensure the child component is fully initialized before calling methods on it
    if (this.studentComponent) {
    }
  }
  // Method to capture the toggle event
  onStudentToggle(hasAccount: boolean): void {
    this.hasAccount = hasAccount;
    if (hasAccount) {
      this.isSubmitTrue = true;
    } else {
      this.isSubmitTrue = false;
    }
  }
  // Method to capture the toggle event
  onParentAccountToggle(hasParentAccount: boolean): void {

    this.hasParentAccount = hasParentAccount;
    if (hasParentAccount) {
      this.isParentAccountAttached = true;
    } else {
      this.isParentAccountAttached = false;
    }
  }

  checkModeAndLoadData(): void {
    const studentId = this.route.snapshot.paramMap.get('id');
    if (studentId) {
      this.isEditMode = true;
      this.loadStudentData(+studentId);
    } else {
      this.isLoading = false;
      this.isEditLoading = false;
    }
  }
  moveNext() {
    if (this.currentTabIndex === 0) {
      if (this.studentComponent.studentForm.invalid) {
        this.studentComponent.markFormFieldsAsDirty();
        return;
      } else {
        this.stepper.next();  // Move to the next step
        return;
      }
    } else if (this.currentTabIndex === 1) {
      if (this.parentComponent.parentsForm.invalid) {
        this.parentComponent.markFormFieldsAsDirty();
        return;
      } else if (!this.isParentAccountAttached && !this.parentComponent.isAtLeastOneAccountConnected()) {
        this.parentComponent.markFormFieldsAsDirty();
        Swal.fire("Please select 'Primarily connect with account' for at least one parent.");
        return;
      } else {
        this.stepper.next();  // Move to the next step
        return;
      }
    }
  }
  
  moveBack() {
    if (this.stepper.selectedIndex > 0) {
      this.stepper.previous(); // Moves to the previous step
    }
  }
  isAllFormsValid(): boolean {
    return (
      this.studentComponent?.isValid() &&
      this.parentComponent?.isValid() &&
      this.studentAccountComponent?.isValid()
    );
  }
  saveAll(): void {
    // if (this.isAllFormsValid()) {
    // if (this.studentAccountComponent.studentAccountForm.invalid) {
    //   this.studentAccountComponent.markFormFieldsAsDirty();
    //   return;}
    const StudentInfo = this.studentComponent.getData();
    const ParentPersons = this.parentComponent.getData();
    const Account = this.studentAccountComponent.getData();

    StudentInfo.isActive = StudentInfo.isActive ? true : false;
    Account.isActive = Account.isActive ? true : false;

    const studentCreateDto: StudentCreateDto = {
      studentInfo: StudentInfo,
      parentPersons: ParentPersons,
      account: Account,
    };
    if (this.isEditMode) {
      const studentId = Number(this.route.snapshot.paramMap.get('id'));
      this.studentService.updateStudent(studentId, studentCreateDto).subscribe(
        (response) => {
          this.showSuccessMessage('Data saved successfully!');
          this.router.navigate(['/student']);
        },
        (error) => {
          this.showErrorMessage('Failed to save data. Please try again.');
        }
      );
    } else {
      const accountId = studentCreateDto.studentInfo.accountId;
      // Check if accountId is 0, and set hasAlreadyAccount accordingly
      if (accountId === 0) {
        studentCreateDto.studentInfo.hasAlreadyAccount = false;
      }
      this.studentService.createStudent(studentCreateDto).subscribe(
        (response) => {
          this.showSuccessMessage('Data saved successfully!');
          this.router.navigate(['/student']);
        },
        (error) => {
          this.showErrorMessage('Failed to save data. Please try again.');
        }
      );
    }
    // } else {
    //   this.showwarningMessage('Please fill in all required fields.');
    // }
  }

  save(): void {
    const StudentInfo = this.studentComponent.getData();

    const studentCreateDto: any = {
      studentInfo: StudentInfo,
    };
    if (this.isEditMode) {
      const studentId = Number(this.route.snapshot.paramMap.get('id'));
      this.studentService.updateStudent(studentId, studentCreateDto).subscribe(
        (response) => {
          this.showSuccessMessage('Data saved successfully!');
          this.router.navigate(['/main/student']);
        },
        (error) => {
          this.showErrorMessage('Failed to save data. Please try again.');
        }
      );
    } else {
      this.studentService
        .createStudentHaveAlreadyAccount(studentCreateDto)
        .subscribe(
          (response) => {
            this.showSuccessMessage('Data saved successfully!');
            this.router.navigate(['/main/student']);
          },
          (error) => {
            this.showErrorMessage('Failed to save data. Please try again.');
          }
        );
    }
  }
  loadStudentData(studentId: number): void {
    this.studentService.getStudentForEdit(studentId).subscribe({
      next: (response: RepoResponse<StudentCreateDto>) => {
        if (response.success) {
          this.studentData = response.data.studentInfo;
          this.parentData = response.data.parentPersons;
          this.accountData = response.data.account;
          this.isLoading = false;
          this.isEditLoading = false;
        }
      },
    });
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
  showwarningMessage(failMessage: string) {
    this.message.open(failMessage, 'Retry', {
      duration: 5000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom', // or 'top'
      panelClass: ['error-snackbar'], // Optional: for custom styling
    });
  } 
  onStepClick(event: StepperSelectionEvent): void {
   
     if (event.selectedIndex === 1) {
      if (this.studentComponent.studentForm.invalid) {
        this.studentFormInvalid=true;
        this.nextButtonHide=false;
      this.currentTabIndex=event.selectedIndex
      } else {
        this.studentFormInvalid=false;
        this.currentTabIndex=event.selectedIndex

      }
    } else if (event.selectedIndex === 2) {
      if (this.parentComponent.parentsForm.invalid) {
        this.parentFormInvalid=true;
        this.nextButtonHide=false;
        this.currentTabIndex=event.selectedIndex
      }  else {
        this.parentFormInvalid=false;
        this.nextButtonHide=true;
        this.currentTabIndex=event.selectedIndex

      }
    }
    else if(event.selectedIndex==0)
    {
      this.currentTabIndex=event.selectedIndex
      this.nextButtonHide=false;
      
    }
   
  }
  onAccountFormValidityChange(isValid: boolean): void {
    this.accountFormValid = isValid;
  }
}
